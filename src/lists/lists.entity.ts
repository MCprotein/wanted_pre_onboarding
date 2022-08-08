import { Posting } from 'src/postings/postings.entity';
import { User } from 'src/users/user.entity';
import { Entity, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';

@Entity('List')
export class List {
  @PrimaryColumn()
  id: string;

  @OneToOne(() => User, (user) => user.list)
  user: User;

  @ManyToOne(() => Posting, (posting) => posting.lists, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  posting: Posting;
}
