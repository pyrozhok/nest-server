import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  Index,
  RelationId,
} from 'typeorm';
import { Tag } from 'src/tags/entities/tag.entity';
import { Image } from 'src/images/entities/image.entity';
import { TouristArea } from 'src/tourist-areas/entities/tourist-area.entity';
import { District } from 'src/districts/entities/district.entity';
import { User } from 'src/users/entities/user.entity';

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

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

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

  @ManyToOne(() => TouristArea)
  @JoinColumn({
    name: 'tourist_area_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'tourist_area_id_fkey',
  })
  touristArea: TouristArea;

  @ManyToOne(() => District)
  @JoinColumn({
    name: 'district_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'places_district_id_fkey',
  })
  district: District;

  @Index('places_author_id_fkey')
  @ManyToOne(() => User, (author: User) => author.places)
  @JoinColumn({
    name: 'author_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'places_author_id_fkey',
  })
  public author: User;

  @RelationId((place: Place) => place.author)
  public authorId: number;
}
