import { Injectable } from '@nestjs/common';
import { CacheService } from 'src/cache';

@Injectable()
export class PostCacheRepository {
  public readonly POST_SORTED_IDS_KEY = 'posts:sorted-ids';
  public constructor(private readonly cache: CacheService) {}

  public async saveSortedIds(idsWithScore: Map<number, number>): Promise<void> {
    await this.cache.zadd(
      this.POST_SORTED_IDS_KEY,
      ...Array.from(idsWithScore).flat(),
    );
  }
}
