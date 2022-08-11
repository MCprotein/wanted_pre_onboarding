import { Test, TestingModule } from '@nestjs/testing';
import { Posting } from './postings.entity';
import { Company } from 'src/companies/companies.entity';
import { PostingsService } from './postings.service';

describe('PostingsService', () => {
  let postingsService: PostingsService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostingsService],
    }).compile();

    postingsService = module.get<PostingsService>(PostingsService);
  });

  it('create', async () => {
    const companyMock: Company = {
      id: 1,
      name: '네이버',
      nation: '한국',
      location: '분당',
      postings: [],
    };
    console.log(companyMock);
    const posting = await postingsService.createPosting({
      companyId: companyMock,
      position: '카카오톡 주니어 개발자',
      reward: 1000000,
      content: '원티드랩에서 백엔드 주니어 개발자를 채용합니다. 자격요건은..',
      skill: 'Python',
    });
    const expected = new Posting();
    expected.company = companyMock;
    expected.position = '카카오톡 주니어 개발자';
    expected.reward = 1000000;
    expected.content =
      '원티드랩에서 백엔드 주니어 개발자를 채용합니다. 자격요건은..';
    expected.skill = 'Python';
    expect(expected).toEqual(posting);
  });
});
