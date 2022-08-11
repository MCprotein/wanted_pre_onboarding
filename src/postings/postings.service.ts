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

  async getPosting(id: number): Promise<Posting> {
    // 채용공고를 올린 회사의 id와 같은 회사id를 가진 채용공고들

    // 채용공고 상세 내용
    const posting = await this.postingsRepository
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
        'posting.content AS 채용내용',
        'company.id AS 회사_id',
      ])
      .where('posting.id = :id', { id })
      .getRawOne();

    // 회사가 올린 다른 채용 공고 id_list
    const postingIds = (
      await this.companyRepository
        .createQueryBuilder('company')
        .leftJoinAndSelect('company.postings', 'postings')
        .select(['postings.id'])
        .where('postings.company = :id', { id: posting['회사_id'] })
        .getRawMany()
    ).map((e) => e['postings_id']);

    const result = { ...posting, 회사가올린다른채용공고: [...postingIds] };
    delete result['회사_id'];
    return result;
  }

  async searchPostings(searchOption: string): Promise<Posting[]> {
    const searchedPostings = this.postingsRepository
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
      .orWhere('company.name Like:name', {
        name: `%${searchOption}%`,
      })
      .orWhere('company.nation Like:nation', {
        nation: `%${searchOption}%`,
      })
      .orWhere('company.location Like:location', {
        location: `%${searchOption}%`,
      })
      .orWhere('posting.position Like:position', {
        position: `%${searchOption}%`,
      })
      .orWhere('posting.skill Like:skill', {
        skill: `%${searchOption}%`,
      })
      .getRawMany();
    return searchedPostings;
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
