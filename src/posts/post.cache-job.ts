import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PostCacheRepository } from './post.cache-repository';

@Injectable()
export class PostCacheJob {
  public constructor(private readonly postCache: PostCacheRepository) {}
  @Cron(CronExpression.EVERY_MINUTE)
  handle() {}
}
