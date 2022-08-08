import { Posting } from 'src/postings/postings.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('Company')
export class Company {
  @PrimaryColumn()
  id: string;

  @Column({ length: 30 })
  name: string;

  @Column({ length: 100 })
  nation: string;

  @Column({ length: 20 })
  location: string;

  @OneToMany(() => Posting, (posting) => posting.company)
  postings: Posting[];
}
