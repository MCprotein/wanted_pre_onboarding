import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Company } from '../../companies/companies.entity';

export class PostingDto {
  @IsNotEmpty()
  @IsString()
  position: string;

  @IsNotEmpty()
  @IsString()
  reward: string;

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
