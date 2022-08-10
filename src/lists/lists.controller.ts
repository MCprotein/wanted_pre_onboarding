import { Body, Controller, Post } from '@nestjs/common';
import { List } from 'src/lists/lists.entity';
import { ApplyDto } from './dto/apply.dto';
import { ListsService } from './lists.service';

@Controller('lists')
export class ListsController {
  constructor(private listService: ListsService) {}

  @Post('/')
  async applyPosting(@Body() applyDto: ApplyDto): Promise<List> {
    const list = await this.listService.createList(applyDto);
    return Object.assign({
      statusCode: 201,
      message: '채용공고 지원 성공',
      list,
    });
  }
}
