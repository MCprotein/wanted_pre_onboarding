import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApplyDto } from './dto/apply.dto';
import { List } from './lists.entity';

@Injectable()
export class ListsService {
  constructor(
    @InjectRepository(List)
    private listRepository: Repository<List>,
  ) {}

  async createList(applyDto: ApplyDto): Promise<List> {
    const createdList = await this.listRepository.create(applyDto);
    return createdList;
  }
}
