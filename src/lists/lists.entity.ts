import { Posting } from 'src/postings/postings.entity';
import { User } from 'src/users/user.entity';
import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('List')
export class List {
  @PrimaryColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.lists, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Posting, (posting) => posting.lists, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  posting: Posting;
}
