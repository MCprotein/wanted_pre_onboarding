import { Test, TestingModule } from '@nestjs/testing';
import { Posting } from './postings.entity';
import { Company } from 'src/companies/companies.entity';
import { PostingsService } from './postings.service';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { PostingDto } from './dto';
import { Repository } from 'typeorm';

// const companyMock: Company = {
//   id: 1,
//   name: '네이버',
//   nation: '한국',
//   location: '분당',
//   postings: [],
// };

const mockPostingsRepository = () => ({
  createPosting: jest.fn(),
  updatePosting: jest.fn(),
  deletePosting: jest.fn(),
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

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
