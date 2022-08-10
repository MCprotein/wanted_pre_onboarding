import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UpdateDto {
  @IsNotEmpty()
  @IsString()
  position: string;

  @IsNotEmpty()
  @IsInt()
  reward: number;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  skill: string;
}
