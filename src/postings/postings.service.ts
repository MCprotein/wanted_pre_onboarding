import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from 'src/companies/companies.entity';
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
  async getPostings(): Promise<Posting[]> {
    const postings = await this.postingsRepository
      .createQueryBuilder('posting')
      .leftJoinAndSelect('posting.company', 'company')
      .select([
        'posting.id AS 채용공고_id',
        'company.name AS 회사명',
        'company.nation AS 국가',
        'company.location AS 지역',
        'posting.position AS 채용포지션',
        'posting.reward AS 채용보상금',
        'posting.skill AS 사용기술',
      ])
      // .innerJoinAndSelect('posting.company', 'company')
      .getRawMany();
    return postings;
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
