import { Company } from 'src/companies/companies.entity';
import { List } from 'src/lists/lists.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('Posting')
export class Posting {
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

  @ManyToOne(() => Company, (company) => company.postings, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  company: Company;

  @OneToMany(() => List, (list) => list.posting)
  lists: List[];
}
