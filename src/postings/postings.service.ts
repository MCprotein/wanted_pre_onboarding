import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostingDto, UpdateDto } from './dto';
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
  async updatePosting(
    id: number,
    updatePostingDto: UpdateDto,
  ): Promise<Posting> {
    const updatedPosting = await this.postingsRepository.update(
      id,
      updatePostingDto,
    );
    if (updatedPosting.affected === 0) {
      throw new NotFoundException(
        `해당 채용공고 id(${id})가 없습니다. 다시 한 번 확인해 주세요.`,
      );
    }

    return await this.postingsRepository.findOne(id);
  }
  async deletePosting(id: number): Promise<void> {
    const result = await this.postingsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(
        `해당 채용공고 id(${id})가 없습니다. 다시 한 번 확인해 주세요.`,
      );
    }
  }
}
