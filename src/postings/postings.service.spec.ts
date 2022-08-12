import { Test, TestingModule } from '@nestjs/testing';
import { Posting } from './postings.entity';
import { Company } from 'src/companies/companies.entity';
import { PostingsService } from './postings.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
  getPostings: jest.fn(),
  getPosting: jest.fn(),
  searchPosting: jest.fn(),
});

const mockCompanyRepository = () => ({
  getPostingIds: jest.fn(),
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
      console.log('result', result);

      expect(postingsRepository.create).toHaveBeenCalledTimes(1);
      expect(postingsRepository.create).toHaveBeenCalledWith(postingDto);
      expect(result).toEqual(postingResult);
    });
  });
});
