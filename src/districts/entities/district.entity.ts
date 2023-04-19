import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'districts' })
export class District {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
