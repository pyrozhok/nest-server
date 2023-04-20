import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import RoleNotFoundException from './exceptions/roleNotFound.exception';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async create(role: CreateRoleDto) {
    const newRole = await this.roleRepository.create(role);
    await this.roleRepository.save(newRole);
    return newRole;
  }

  findAll() {
    return this.roleRepository.find();
  }

  async findOne(id: number) {
    const role = await this.roleRepository.findOne({ where: { id } });
    if (role) {
      return role;
    }
    throw new RoleNotFoundException(id);
  }

  async update(id: number, role: UpdateRoleDto) {
    await this.roleRepository.update(id, role);
    const updatedRole = await this.roleRepository.findOne({ where: { id } });
    if (updatedRole) {
      return updatedRole;
    }
    throw new RoleNotFoundException(id);
  }

  async remove(id: number) {
    const deleteResponse = await this.roleRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new RoleNotFoundException(id);
    }
  }
}
