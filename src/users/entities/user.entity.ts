import { Exclude } from 'class-transformer';
import { LocalFile } from 'src/local-files/entities/local-file.entity';
import { Place } from 'src/places/entities/place.entity';
import { Role } from 'src/roles/entities/role.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  public email: string;

  @Column({ nullable: true, name: 'current_hashed_refresh_token' })
  @Exclude()
  public currentHashedRefreshToken?: string;

  @Column()
  public name: string;

  @Column({ nullable: true })
  @Exclude()
  public password?: string;

  @Column({ default: false, name: 'is_registered_with_google' })
  public isRegisteredWithGoogle: boolean;

  @Column({ name: 'first_name' })
  public firstName: string;

  @Column({ name: 'last_name' })
  public lastName: string;

  @Column({ name: 'phone_number' })
  public phoneNumber: string;

  @Column({ default: false, name: 'is_email_confirmed' })
  public isEmailConfirmed: boolean;

  @Column({ default: false, name: 'is_phone_number_confirmed' })
  public isPhoneNumberConfirmed: boolean;

  @JoinColumn({ name: 'avatar_id' })
  @OneToOne(() => LocalFile, {
    nullable: true,
  })
  public avatar?: LocalFile;

  @Column({ nullable: true, name: 'avatar_id' })
  public avatarId?: number;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => Place, (place: Place) => place.author)
  public places?: Place[];

  @ManyToOne(() => Role)
  @JoinColumn({
    name: 'role_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'users_roles_fkey',
  })
  public role: Role;
}
