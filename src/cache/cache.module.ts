import { DynamicModule, Global, Module } from '@nestjs/common';
import { CACHE_CONFIG } from './cache.constant';
import { CacheService } from './cache.service';

interface CacheModuleOptions {
  host: string;
  port: number;
}

@Global()
@Module({})
export class CacheModule {
  public static forRoot(options: CacheModuleOptions): DynamicModule {
    return {
      module: CacheModule,
      providers: [
        {
          provide: CACHE_CONFIG,
          useValue: options,
        },
        CacheService,
      ],
      exports: [CacheService],
    };
  }
}
