import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import { NestJsEbayConfigModel } from './config/models/ebay-config.model';
import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { NESTJS_EBAY_CONFIG } from '../constants';
import { HttpModule } from '@nestjs/axios';
import { NestJsEbayAuthModule } from './auth/auth.module';
import { NestJsEbayIdentityModule } from './identity';
import { NestJsEbayTransactionModule } from './transcation';

export type NestJsEbayOptions = Partial<NestJsEbayConfigModel>;

export interface NestJsEbayOptionsFactory {
  createMassiveConnectOptions(): Promise<NestJsEbayOptions> | NestJsEbayOptions;
}

export interface NestJsEbayAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useClass?: Type<NestJsEbayOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<NestJsEbayOptions> | NestJsEbayOptions;
}

@Global()
@Module({})
export class NestJsEbayModule {
  public static forRootAsync(options: NestJsEbayAsyncOptions): DynamicModule {
    return {
      module: NestJsEbayModule,
      imports: [
        HttpModule,
        ...this.getSubModules(),
        ...(options.imports ?? []),
      ],
      providers: [this.createAsyncProviders(options)],
      exports: [NESTJS_EBAY_CONFIG, ...this.getSubModules()],
    };
  }

  private static createAsyncProviders(
    options: NestJsEbayAsyncOptions,
  ): Provider<any> {
    if (options.useFactory) {
      return {
        provide: NESTJS_EBAY_CONFIG,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    // For useClass and useExisting...
    return {
      provide: NESTJS_EBAY_CONFIG,
      useFactory: async (optionsFactory: NestJsEbayOptionsFactory) =>
        await optionsFactory.createMassiveConnectOptions(),
      inject: [options.useClass],
    };
  }

  private static getSubModules() {
    return [
      NestJsEbayAuthModule,
      NestJsEbayIdentityModule,
      NestJsEbayTransactionModule,
    ];
  }
}
