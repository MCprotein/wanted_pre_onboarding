import { ForbiddenException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Company } from 'src/companies/companies.entity';
import { Repository } from 'typeorm';
import { List } from './lists.entity';
import { ListsService } from './lists.service';

const companyMock: Company = {
  id: 1,
  name: '네이버',
  nation: '한국',
  location: '분당',
  postings: [],
};

const mockListsRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  createQueryBuilder: jest.fn().mockReturnValue({
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    getRawOne: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
  }),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('ListsService', () => {
  let service: ListsService;
  let listsRepository: MockRepository<List>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListsService,
        {
          provide: getRepositoryToken(List),
          useValue: mockListsRepository(),
        },
      ],
    }).compile();

    service = module.get<ListsService>(ListsService);
    listsRepository = module.get<MockRepository<List>>(
      getRepositoryToken(List),
    );
  });

  describe('채용공고 지원', () => {
    const user = {
      id: 1,
      name: '철수',
      email: 'test@test.com',
      lists: [],
    };
    const posting = {
      id: 1,
      company: companyMock,
      nation: '한국',
      location: '판교',
      position: '백엔드',
      reward: 10000,
      skill: 'Node.js',
      content: 'Node.js 백엔드 개발자 구인',
      lists: [],
    };
    const listDto = { user, posting };
    const list = { user, posting, id: 1 };

    it('채용공고 지원 성공', async () => {
      listsRepository
        .createQueryBuilder()
        .getRawOne.mockResolvedValue(undefined);
      listsRepository.create.mockResolvedValue(list);
      const result = await service.createList(listDto);

      expect(listsRepository.create).toHaveBeenCalledTimes(1);
      expect(listsRepository.create).toHaveBeenCalledWith(listDto);
      expect(listsRepository.save).toHaveBeenCalledTimes(1);
      expect(listsRepository.createQueryBuilder).toHaveBeenCalledTimes(2);
      expect(
        listsRepository.createQueryBuilder().leftJoinAndSelect,
      ).toHaveBeenCalledTimes(1);
      expect(listsRepository.createQueryBuilder().where).toHaveBeenCalledTimes(
        1,
      );
      expect(
        listsRepository.createQueryBuilder().getRawOne,
      ).toHaveBeenCalledTimes(1);
      expect(result).toEqual(list);
    });
    it('채용공고 지원 실패', async () => {
      try {
        listsRepository.createQueryBuilder().getRawOne.mockResolvedValue(list);
        await service.createList(listDto);
      } catch (error) {
        expect(listsRepository.create).toHaveBeenCalledTimes(0);
        expect(listsRepository.save).toHaveBeenCalledTimes(0);
        expect(listsRepository.createQueryBuilder).toHaveBeenCalledTimes(2);
        expect(
          listsRepository.createQueryBuilder().leftJoinAndSelect,
        ).toHaveBeenCalledTimes(1);
        expect(
          listsRepository.createQueryBuilder().where,
        ).toHaveBeenCalledTimes(1);
        expect(
          listsRepository.createQueryBuilder().getRawOne,
        ).toHaveBeenCalledTimes(1);

        expect(error).toEqual(
          new ForbiddenException(
            '이미 채용공고에 지원하여 더이상 지원하실 수 없습니다.',
          ),
        );
      }
    });
  });
});
