import { Module, CacheModule as NestCacheModule } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { EbayStoreService } from './ebay-store/ebay-store.service';

@Module({
  imports: [
    NestCacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: '6400',
    }),
  ],
  providers: [EbayStoreService],
  exports: [EbayStoreService, NestCacheModule],
})
export class CacheModule {}
