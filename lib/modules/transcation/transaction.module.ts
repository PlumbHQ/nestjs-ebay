import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { NestJsEbayAuthModule } from '../auth/auth.module';
import { NestJsEbayTransactionService } from './services/transaction.service';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [NestJsEbayAuthModule, ConfigModule, HttpModule],
  providers: [NestJsEbayTransactionService],
  exports: [NestJsEbayTransactionService],
})
export class NestJsEbayTransactionModule {}
