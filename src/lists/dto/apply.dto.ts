import { IsInt, IsNotEmpty } from 'class-validator';
import { Posting } from 'src/postings/postings.entity';
import { User } from 'src/users/user.entity';

export class ApplyDto {
  @IsNotEmpty()
  @IsInt()
  user: User;

  @IsNotEmpty()
  @IsInt()
  posting: Posting;
}
