import { Test, TestingModule } from '@nestjs/testing';
import { Posting } from './postings.entity';
import { Company } from 'src/companies/companies.entity';
import { PostingsService } from './postings.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

const companyMock: Company = {
  id: 1,
  name: '네이버',
  nation: '한국',
  location: '분당',
  postings: [],
};

const mockPostingsRepository = () => ({
  save: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  createQueryBuilder: jest.fn().mockReturnValue({
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    getRawOne: jest.fn().mockReturnThis(),
    getRawMany: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    orWhere: jest.fn().mockReturnThis(),
  }),
  findOne: jest.fn(),
});

const mockCompanyRepository = () => ({
  createQueryBuilder: jest.fn().mockReturnValue({
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    getRawMany: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
  }),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('PostingsService', () => {
  let service: PostingsService;
  let postingsRepository: MockRepository<Posting>;
  let companyRepository: MockRepository<Company>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostingsService,
        {
          provide: getRepositoryToken(Posting),
          useValue: mockPostingsRepository(),
        },
        {
          provide: getRepositoryToken(Company),
          useValue: mockCompanyRepository(),
        },
      ],
    }).compile();

    service = module.get<PostingsService>(PostingsService);
    postingsRepository = module.get<MockRepository<Posting>>(
      getRepositoryToken(Posting),
    );
    companyRepository = module.get<MockRepository<Company>>(
      getRepositoryToken(Company),
    );
  });

  describe('채용공고 조회', () => {
    it('채용공고 목록 조회', async () => {
      postingsRepository.createQueryBuilder().getRawMany.mockResolvedValue([]);
      const result = await service.getPostings();

      expect(postingsRepository.createQueryBuilder).toHaveBeenCalledTimes(2);
      expect(
        postingsRepository.createQueryBuilder().leftJoinAndSelect,
      ).toHaveBeenCalledTimes(1);
      expect(
        postingsRepository.createQueryBuilder().select,
      ).toHaveBeenCalledTimes(1);
      expect(
        postingsRepository.createQueryBuilder().getRawMany,
      ).toHaveBeenCalledTimes(1);

      expect(result).toEqual([]);
    });

    it('채용공고 상세 조회', async () => {
      const posting = {
        채용공고_id: 1,
        회사명: 'Naver',
        국가: '한국',
        지역: '판교',
        채용포지션: '백엔드',
        채용보상금: 10000,
        사용기술: 'Node.js',
        채용내용: 'Node.js 백엔드 개발자 구인',
        회사가올린다른채용공고: [1, 2],
      };
      const mainData = {
        채용공고_id: 1,
        회사명: 'Naver',
        국가: '한국',
        지역: '판교',
        채용포지션: '백엔드',
        채용보상금: 10000,
        사용기술: 'Node.js',
        채용내용: 'Node.js 백엔드 개발자 구인',
        회사_id: 1,
      };

      const idList = [{ postings_id: 1 }, { postings_id: 2 }];
      postingsRepository
        .createQueryBuilder()
        .getRawOne.mockResolvedValue(mainData);

      companyRepository
        .createQueryBuilder()
        .getRawMany.mockResolvedValue(idList);

      const result = await service.getPosting(1);

      expect(postingsRepository.createQueryBuilder).toHaveBeenCalledTimes(2);
      expect(
        postingsRepository.createQueryBuilder().leftJoinAndSelect,
      ).toHaveBeenCalledTimes(1);
      expect(
        postingsRepository.createQueryBuilder().select,
      ).toHaveBeenCalledTimes(1);
      expect(
        postingsRepository.createQueryBuilder().where,
      ).toHaveBeenCalledTimes(1);
      expect(
        postingsRepository.createQueryBuilder().getRawOne,
      ).toHaveBeenCalledTimes(1);

      expect(companyRepository.createQueryBuilder).toHaveBeenCalledTimes(2);
      expect(
        companyRepository.createQueryBuilder().leftJoinAndSelect,
      ).toHaveBeenCalledTimes(1);
      expect(
        companyRepository.createQueryBuilder().select,
      ).toHaveBeenCalledTimes(1);
      expect(
        companyRepository.createQueryBuilder().where,
      ).toHaveBeenCalledTimes(1);
      expect(
        companyRepository.createQueryBuilder().getRawMany,
      ).toHaveBeenCalledTimes(1);

      expect(result).toEqual(posting);
    });
  });
  describe('채용공고 작성', () => {
    const postingResult = {
      company: 1,
      position: '주니어 개발자',
      reward: 10000,
      content: '구합니다',
      skill: 'Node.js',
    };
    const postingDto = {
      companyId: companyMock,
      position: '주니어 개발자',
      reward: 10000,
      content: '구합니다',
      skill: 'Node.js',
    };
    it('채용공고 작성 성공', async () => {
      postingsRepository.create.mockResolvedValue(postingResult);
      const result = await service.createPosting(postingDto);

      expect(postingsRepository.create).toHaveBeenCalledTimes(1);
      expect(postingsRepository.create).toHaveBeenCalledWith(postingDto);
      expect(result).toEqual(postingResult);
    });
  });
  describe('채용공고 수정', () => {
    const updateResult = {
      company: 1,
      position: '시니어 개발자',
      reward: 20000,
      content: '구합니다',
      skill: 'Node.js',
    };

    const updateDto = {
      companyId: companyMock,
      position: '시니어 개발자',
      reward: 20000,
      content: '구합니다',
      skill: 'Node.js',
    };
    it('채용공고 수정 성공', async () => {
      postingsRepository.update.mockResolvedValue(updateResult);
      postingsRepository.findOne.mockResolvedValue(updateResult);
      const result = await service.updatePosting(1, updateDto);

      expect(postingsRepository.update).toHaveBeenCalledTimes(1);
      expect(postingsRepository.update).toHaveBeenCalledWith(1, updateDto);
      expect(result).toEqual(updateResult);
    });
    it('채용공고 수정 실패', async () => {
      try {
        postingsRepository.update.mockResolvedValue({
          ...updateDto,
          affected: 0,
        });
        await service.updatePosting(1, updateDto);
      } catch (error) {
        expect(postingsRepository.update).toHaveBeenCalledTimes(1);
        expect(postingsRepository.update).toHaveBeenCalledWith(1, updateDto);
        expect(error).toEqual(
          new NotFoundException(
            '해당 채용공고 id(1)가 없습니다. 다시 한 번 확인해 주세요.',
          ),
        );
      }
    });
  });
  describe('채용공고 삭제', () => {
    it('채용공고 삭제 성공', async () => {
      postingsRepository.delete.mockResolvedValue({ affected: 1 });
      const result = await service.deletePosting(1);

      expect(postingsRepository.delete).toHaveBeenCalledTimes(1);
      expect(postingsRepository.delete).toHaveBeenCalledWith(1);
      expect(result).toBeUndefined();
    });
    it('채용공고 삭제 실패', async () => {
      try {
        postingsRepository.delete.mockResolvedValue({ affected: 0 });
        await service.deletePosting(1);
      } catch (error) {
        expect(postingsRepository.delete).toHaveBeenCalledTimes(1);
        expect(postingsRepository.delete).toHaveBeenCalledWith(1);
        expect(error).toEqual(
          new NotFoundException(
            '해당 채용공고 id(1)가 없습니다. 다시 한 번 확인해 주세요.',
          ),
        );
      }
    });
  });
  describe('채용공고 검색', () => {
    it('채용공고 검색 성공', async () => {
      const posting = [
        {
          채용공고_id: 1,
          회사명: 'Naver',
          국가: '한국',
          지역: '판교',
          채용포지션: '백엔드',
          채용보상금: 10000,
          사용기술: 'Node.js',
          채용내용: 'Node.js 백엔드 개발자 구인',
        },
        {
          채용공고_id: 2,
          회사명: 'Kakao',
          국가: '한국',
          지역: '판교',
          채용포지션: '프론트엔드',
          채용보상금: 10000,
          사용기술: 'React',
          채용내용: 'React 프론트 개발자 구인',
        },
      ];
      postingsRepository
        .createQueryBuilder()
        .getRawMany.mockResolvedValue(posting);
      const searchOption = '판교';
      const result = await service.searchPostings(searchOption);

      expect(postingsRepository.createQueryBuilder).toHaveBeenCalledTimes(2);
      expect(
        postingsRepository.createQueryBuilder().leftJoinAndSelect,
      ).toHaveBeenCalledTimes(1);
      expect(
        postingsRepository.createQueryBuilder().select,
      ).toHaveBeenCalledTimes(1);
      expect(
        postingsRepository.createQueryBuilder().orWhere,
      ).toHaveBeenCalledTimes(5);
      expect(
        postingsRepository.createQueryBuilder().getRawMany,
      ).toHaveBeenCalledTimes(1);
      expect(result).toEqual(posting);
    });
  });
});
