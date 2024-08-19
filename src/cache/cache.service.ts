import { Inject, Injectable } from '@nestjs/common';
import { CACHE_CONFIG } from './cache.constant';
import { CacheConfig } from './cache.config';
import Redis from 'ioredis';
@Injectable()
export class CacheService extends Redis {
  public constructor(@Inject(CACHE_CONFIG) config: CacheConfig) {
    super(config.port, config.host);
  }
}
