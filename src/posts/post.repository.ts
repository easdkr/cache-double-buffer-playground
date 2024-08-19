import { Injectable } from '@nestjs/common';

@Injectable()
export class PostRepository {
  public async findIds(length: number, delay = 100): Promise<number[]> {
    await this.delay(delay);
    return Array.from({ length }, (_, i) => i + 1);
  }

  private delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
}
