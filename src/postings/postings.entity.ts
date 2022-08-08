import { CompanyEntity } from 'src/companies/companies.entity';
import { ListEntity } from 'src/lists/lists.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('Posting')
export class PostingEntity {
  @PrimaryColumn()
  id: string;

  @Column({ length: 30 })
  position: string;

  @Column({ length: 100 })
  reward: string;

  @Column({ length: 8000 })
  content: string;

  @Column({ length: 20 })
  skill: string;

  @ManyToOne(() => CompanyEntity, (company) => company.postings, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  company: CompanyEntity;

  @OneToMany(() => ListEntity, (list) => list.posting)
  lists: ListEntity[];
}
