import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from 'src/companies/companies.entity';
import { PostingsController } from './postings.controller';
import { Posting } from './postings.entity';
import { PostingsService } from './postings.service';

@Module({
  imports: [TypeOrmModule.forFeature([Posting, Company])],
  controllers: [PostingsController],
  providers: [PostingsService],
})
export class PostingsModule {}
