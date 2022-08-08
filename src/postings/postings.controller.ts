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
import { List } from 'src/lists/lists.entity';
import { Posting } from './postings.entity';

@Controller('postings')
export class PostingsController {
  constructor(private postingService: PostingService) {}

  @Get('/')
  async getAllPostings(): Promise<Posting> {
    const postings = await this.postingService.getPostings();
    return Object.assign({
      statusCode: 200,
      message: '채용공고 목록 조회 성공',
      postings,
    });
  }

  @Get('/detail/:id')
  async getPosting(@Param('id', ParseIntPipe) id: number): Promise<Posting> {
    const posting = await this.postingService.getPosting(id);
    return Object.assign({
      statusCode: 200,
      message: '채용공고 상세 조회 성공',
      posting,
    });
  }

  @Post('/')
  async createPosting(@Body() createPostingDto: PostingDto): Promise<Posting> {
    const createdPosting = await this.postingService.createPosting(
      createPostingDto,
    );
    return Object.assign({
      statusCode: 201,
      message: '채용공고 등록 성공',
      createdPosting,
    });
  }

  @Post('/:id')
  async applyPosting(
    @Param('id') id: number,
    @Body() applyDto: ApplyDto,
  ): Promise<List> {
    const list = await this.listService.createList(id, applyDto);
    return Object.assign({
      statusCode: 201,
      message: '채용공고 지원 성공',
      list,
    });
  }

  @Put('/:id')
  async updatePosting(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostingDto: PostingDto,
  ): Promise<Posting> {
    const updatedPosting = await this.postingService.updatePosting(
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
    await this.postingService.deletePosting(id);
    return Object.assign({
      statusCode: 200,
      message: '채용공고 삭제 성공',
    });
  }
}
