import { PostingEntity } from 'src/postings/postings.entity';
import { UserEntity } from 'src/users/user.entity';
import { Entity, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';

@Entity('List')
export class ListEntity {
  @PrimaryColumn()
  id: string;

  @OneToOne(() => UserEntity, (user) => user.list)
  user: UserEntity;

  @ManyToOne(() => PostingEntity, (posting) => posting.lists, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  posting: PostingEntity;
}
