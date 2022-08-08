import { PostingEntity } from 'src/postings/postings.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('Company')
export class CompanyEntity {
  @PrimaryColumn()
  id: string;

  @Column({ length: 30 })
  name: string;

  @Column({ length: 100 })
  nation: string;

  @Column({ length: 20 })
  location: string;

  @OneToMany(() => PostingEntity, (posting) => posting.company)
  postings: PostingEntity[];
}
