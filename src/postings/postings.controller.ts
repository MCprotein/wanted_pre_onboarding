import {
  Body,
  Controller,
  ParseIntPipe,
  Post,
  Put,
  Param,
  Delete,
  Get,
  Query,
} from '@nestjs/common';
import { PostingDto } from './dto/posting.dto';
import { Posting } from './postings.entity';
import { PostingsService } from './postings.service';
@Controller('postings')
export class PostingsController {
  constructor(private postingsService: PostingsService) {}

  // 채용공고 목록 조회
  @Get('/')
  async getPostings(): Promise<Posting[]> {
    const postings = await this.postingsService.getPostings();
    return postings;
  }

  // 채용공고 상세 페이지 조회
  @Get('/detail/:id')
  async getPosting(@Param('id', ParseIntPipe) id: number): Promise<Posting> {
    const posting = await this.postingsService.getPosting(id);
    return posting;
  }

  // 채용공고 검색
  @Get('/explore')
  async searchPosting(
    @Query('search') searchOption: string,
  ): Promise<Posting[]> {
    const searchedPostings = await this.postingsService.searchPostings(
      searchOption,
    );
    return searchedPostings;
  }

  // 채용공고 등록
  @Post('/')
  async createPosting(@Body() createPostingDto: PostingDto): Promise<Posting> {
    const createdPosting = await this.postingsService.createPosting(
      createPostingDto,
    );
    return createdPosting;
  }

  // 채용공고 수정
  @Put('/:id')
  async updatePosting(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostingDto: PostingDto,
  ): Promise<Posting> {
    const updatedPosting = await this.postingsService.updatePosting(
      id,
      updatePostingDto,
    );
    return updatedPosting;
  }

  // 채용공고 삭제
  @Delete('/:id')
  async deletePosting(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.postingsService.deletePosting(id);
    return Object.assign({
      statusCode: 200,
      message: '채용공고 삭제 성공',
    });
  }
}
