import { Module } from '@nestjs/common';
import { NestJsEbayAuthService } from './services/auth.service';
import { ConfigModule } from '../config/config.module';
import { HttpModule } from '@nestjs/axios';
import { EbayAuthController } from './controllers/auth.controller';

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [NestJsEbayAuthService],
  exports: [NestJsEbayAuthService],
  controllers: [EbayAuthController],
})
export class NestJsEbayAuthModule {}
