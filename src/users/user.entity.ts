import { List } from 'src/lists/lists.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({ length: 30 })
  name: string;

  @Column({ length: 100 })
  email: string;

  @OneToMany(() => List, (list) => list.user)
  lists: List[];
}
