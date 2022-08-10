import { Posting } from 'src/postings/postings.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Company')
export class Company {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 30 })
  name: string;

  @Column({ length: 100 })
  nation: string;

  @Column({ length: 20 })
  location: string;

  @OneToMany(() => Posting, (posting) => posting.company)
  postings: Posting[];
}
