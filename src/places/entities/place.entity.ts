import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Tag } from 'src/tags/entities/tag.entity';
import { Image } from 'src/images/entities/image.entity';
import { TouristArea } from 'src/tourist-areas/entities/tourist-area.entity';

@Entity({ name: 'places' })
export class Place {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ name: 'main_image' })
  mainImage: string;

  @Column({ name: 'short_descr' })
  shortDescription: string;

  @Column()
  description: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  elevation: number;

  @Column({ name: 'how_to_get_by_car' })
  howToGetByCar: string;

  @Column({ name: 'how_to_get_by_public_transport' })
  howToGetByPublicTransport: string;

  @Column({ name: 'how_to_get_by_transfer' })
  howToGetByTransfer: string;

  @Column()
  keywords: string;

  @ManyToMany(() => Tag)
  @JoinTable({
    name: 'tags_places_relations',
    joinColumn: {
      name: 'place_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'tag_id',
      referencedColumnName: 'id',
    },
  })
  tags: Tag[];

  @ManyToMany(() => Image)
  @JoinTable({
    name: 'images_places_relations',
    joinColumn: {
      name: 'place_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'image_id',
      referencedColumnName: 'id',
    },
  })
  images: Image[];

  @ManyToOne((type) => TouristArea)
  @JoinColumn({
    name: 'tourist_area_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'tourist_area_id_fkey',
  })
  touristArea: TouristArea;
}
