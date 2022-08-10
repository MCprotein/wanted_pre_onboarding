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
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

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
      .getRawMany();
    return postings;
  }

  async getPosting(id: number): Promise<Posting[] | any[]> {
    // 회사가 올린 다른 채용 공고 id_list
    const postingIds = (
      await this.companyRepository
        .createQueryBuilder('company')
        .leftJoinAndSelect('company.postings', 'postings')
        .select(['postings.id'])
        .where('postings.company = :id', { id })
        .getRawMany()
    ).map((e) => e['postings_id']);

    // 채용공고 상세 내용
    const posting = await this.postingsRepository
      .createQueryBuilder('posting')
      .leftJoinAndSelect('posting.company', 'company')
      .leftJoinAndSelect('company.postings', 'postings1')
      .select([
        'posting.id AS 채용공고_id',
        'company.name AS 회사명',
        'company.nation AS 국가',
        'company.location AS 지역',
        'posting.position AS 채용포지션',
        'posting.reward AS 채용보상금',
        'posting.skill AS 사용기술',
        'posting.content AS 채용내용',
      ])
      .where('posting.id = :id', { id })
      .getRawOne();
    const result = { ...posting, 회사가올린다른채용공고: [...postingIds] };
    return result;
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
