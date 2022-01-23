import { Module } from '@nestjs/common';
import { NestJsEbayConfigService } from './services/ebay-config.service';

@Module({
  providers: [NestJsEbayConfigService],
  exports: [NestJsEbayConfigService],
})
export class ConfigModule {}
