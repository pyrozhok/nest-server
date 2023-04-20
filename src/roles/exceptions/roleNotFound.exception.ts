import { NotFoundException } from '@nestjs/common';

class RoleNotFoundException extends NotFoundException {
  constructor(roleId: number) {
    super(`Role with id ${roleId} not found`);
  }
}

export default RoleNotFoundException;
