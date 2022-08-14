import { ForbiddenException, Injectable } from '@nestjs/common';
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

  // 채용공고 지원
  async createList(applyDto: ApplyDto): Promise<List> {
    const { user } = applyDto;

    // 채용공고 지원 이력 확인
    const exitedList = await this.listRepository
      .createQueryBuilder('list')
      .leftJoinAndSelect('list.user', 'user')
      .where('user.id = :id', { id: user })
      .getRawOne();

    if (exitedList) {
      throw new ForbiddenException(
        '이미 채용공고에 지원하여 더이상 지원하실 수 없습니다.',
      );
    }

    // 채용공고 지원
    const createdList = this.listRepository.create(applyDto);
    await this.listRepository.save(createdList);
    return createdList;
  }
}
