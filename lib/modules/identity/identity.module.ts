import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { NestJsEbayAuthModule } from '../auth/auth.module';
import { NestJsEbayIdentityService } from './services/identity.service';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [NestJsEbayAuthModule, ConfigModule, HttpModule],
  providers: [NestJsEbayIdentityService],
  exports: [NestJsEbayIdentityService],
})
export class NestJsEbayCompanyInfoModule {}
