import { ListEntity } from 'src/lists/lists.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

@Entity('User')
export class UserEntity {
  @PrimaryColumn()
  id: string;

  @Column({ length: 30 })
  name: string;

  @Column({ length: 100 })
  email: string;

  @OneToOne(() => ListEntity, (list) => list.user, {
    nullable: false,
  })
  @JoinColumn()
  list: ListEntity;
}
