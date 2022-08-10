import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostingsController } from './postings.controller';
import { Posting } from './postings.entity';
import { PostingsService } from './postings.service';

@Module({
  imports: [TypeOrmModule.forFeature([Posting])],
  controllers: [PostingsController],
  providers: [PostingsService],
})
export class PostingsModule {}
