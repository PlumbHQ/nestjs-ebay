import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  NestJsQuickBooksModule,
  NestJsQuickBooksOptions,
  NestJsQuickBooksScopes,
} from 'lib';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersController } from './customers/customers.controller';
import { AuthController } from './auth/auth.controller';
import { ItemsController } from './items/items.controller';
import { CacheModule } from './cache/cache.module';
import { QbStoreService } from './cache/qb-store/qb-store.service';
import { NestJsQuickBooksStore } from 'lib/modules/store';

@Module({
  imports: [
    CacheModule,
    ConfigModule.forRoot(),
    NestJsQuickBooksModule.forRootAsync(
      {
        imports: [CacheModule, ConfigModule],
        inject: [ConfigService],
        useFactory: (
          configService: ConfigService,
        ): NestJsQuickBooksOptions => ({
          authRedirectUrl: 'http://localhost:3000/auth/callback',
          clientId: configService.get<string>('QB_CLIENT_ID'),
          clientSecret: configService.get<string>('QB_CLIENT_SECRET'),
          mode: 'sandbox',
          serverUrl: 'http://localhost:3000',
          scopes: [NestJsQuickBooksScopes.Accounting],
        }),
      },
      {
        provide: NestJsQuickBooksStore,
        useClass: QbStoreService,
      },
    ),
  ],
  controllers: [
    AppController,
    CustomersController,
    AuthController,
    ItemsController,
  ],
  providers: [AppService],
})
export class AppModule {}
