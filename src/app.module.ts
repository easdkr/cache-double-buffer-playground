import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheModule } from './cache';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    CacheModule.forRoot({ host: 'localhost', port: 6379 }),
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
