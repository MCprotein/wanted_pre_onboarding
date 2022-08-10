import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostingDto } from './dto/posting.dto';
import { Posting } from './postings.entity';

@Injectable()
export class PostingsService {
  constructor(
    @InjectRepository(Posting)
    private postingsRepository: Repository<Posting>,
  ) {}

  // async getPostings(): Promise<Posting[]> {
  async getPostings(): Promise<void> {
    // return await this.postingsRepository.createQueryBuilder('Posting').leftJoinAndSelect('Posting.List', '');
  }

  async getPosting(id: number): Promise<void> {
    // return await this.postingsRepository.createQueryBuilder('Posting').leftJoinAndSelect('Posting.List', '');
  }
  async createPosting(createPostingDto: PostingDto): Promise<Posting> {
    const createdPosting = this.postingsRepository.create(createPostingDto);
    await this.postingsRepository.save(createdPosting);
    return createdPosting;
  }
  async updatePosting(id: number, updatePostingDto: PostingDto): Promise<void> {
    // return await this.postingsRepository.createQueryBuilder('Posting').leftJoinAndSelect('Posting.List', '');
  }
  async deletePosting(id: number): Promise<void> {
    // return await this.postingsRepository.createQueryBuilder('Posting').leftJoinAndSelect('Posting.List', '');
  }
}
