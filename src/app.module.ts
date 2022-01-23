import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  NestJsEbayModule,
  NestJsEbayModesEnum,
  NestJsEbayScopes,
  EbayTokensModel,
  NestJsEbayOptions,
} from 'lib';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { CacheModule } from './cache/cache.module';
import { EbayStoreService } from './cache/ebay-store/ebay-store.service';

@Module({
  imports: [
    CacheModule,
    ConfigModule.forRoot(),
    NestJsEbayModule.forRootAsync({
      imports: [CacheModule, ConfigModule],
      inject: [ConfigService, EbayStoreService],
      useFactory: (
        configService: ConfigService,
        tokenStore: EbayStoreService,
      ): NestJsEbayOptions => ({
        authRedirectUrl: configService.get<string>('EBAY_RUNAME'),
        clientId: configService.get<string>('EBAY_CLIENT_ID'),
        clientSecret: configService.get<string>('EBAY_CLIENT_SECRET'),
        mode: NestJsEbayModesEnum.Production,
        scopes: [NestJsEbayScopes.Identity, NestJsEbayScopes.SellFinances],
        store: {
          getToken: () => tokenStore.getToken(),
          setToken: (token: EbayTokensModel) => tokenStore.setToken(token),
          unsetToken: () => tokenStore.unsetToken(),
        },
      }),
    }),
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
