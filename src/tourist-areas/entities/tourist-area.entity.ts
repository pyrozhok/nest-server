import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tourist_area' })
export class TouristArea {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
