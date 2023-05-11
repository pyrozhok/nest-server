import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'districts' })
export class District {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;
}
