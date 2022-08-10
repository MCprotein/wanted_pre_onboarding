import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Company } from '../../companies/companies.entity';

export class PostingDto {
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

  @IsNotEmpty()
  @IsInt()
  companyId: Company;
}
