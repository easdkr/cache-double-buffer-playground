import { Injectable } from '@nestjs/common';
import { delay } from 'src/utils';

@Injectable()
export class PostRepository {
  public async findIds(length: number, _delay = 100): Promise<number[]> {
    await delay(_delay);
    return Array.from({ length }, (_, i) => i + 1);
  }
}
