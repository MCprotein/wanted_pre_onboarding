import {
  Body,
  Controller,
  ParseIntPipe,
  Post,
  Put,
  Param,
  Delete,
  Get,
} from '@nestjs/common';
import { PostingDto } from './dto/posting.dto';
import { Posting } from './postings.entity';
import { PostingsService } from './postings.service';
@Controller('postings')
export class PostingsController {
  constructor(private postingsService: PostingsService) {}

  @Get('/')
  async getPostings(): Promise<Posting> {
    const postings = await this.postingsService.getPostings();
    return Object.assign({
      statusCode: 200,
      message: '채용공고 목록 조회 성공',
      postings,
    });
  }

  @Get('/detail/:id')
  async getPosting(@Param('id', ParseIntPipe) id: number): Promise<Posting> {
    const posting = await this.postingsService.getPosting(id);
    return Object.assign({
      statusCode: 200,
      message: '채용공고 상세 조회 성공',
      posting,
    });
  }

  @Post('/')
  async createPosting(@Body() createPostingDto: PostingDto): Promise<Posting> {
    const createdPosting = await this.postingsService.createPosting(
      createPostingDto,
    );
    return Object.assign({
      statusCode: 201,
      message: '채용공고 등록 성공',
      createdPosting,
    });
  }

  @Put('/:id')
  async updatePosting(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostingDto: PostingDto,
  ): Promise<Posting> {
    const updatedPosting = await this.postingsService.updatePosting(
      id,
      updatePostingDto,
    );
    return Object.assign({
      statusCode: 200,
      message: '채용공고 수정 성공',
      updatedPosting,
    });
  }

  @Delete('/:id')
  async deletePosting(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.postingsService.deletePosting(id);
    return Object.assign({
      statusCode: 200,
      message: '채용공고 삭제 성공',
    });
  }
}
