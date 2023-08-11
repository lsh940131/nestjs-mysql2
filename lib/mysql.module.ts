import { Global, Module, DynamicModule, Provider, Type } from '@nestjs/common';

import { MYSQL_MODULE_OPTIONS } from './common/mysql.constants';
import { IOptions, IMysqlOptions, IMysqlAsyncOptions, IMysqlOptionsFactory } from './interface/config.interface';
import { MysqlProvider } from './mysql.provider';
import { getToken } from './common/mysql.util';

@Global()
@Module({})
export class MysqlModule {
	constructor() {}

	static forRoot(options: IMysqlOptions): DynamicModule {
		const optionProvider: Provider = {
			provide: MYSQL_MODULE_OPTIONS,
			useValue: options,
		};

		const provider: Provider = {
			inject: [MYSQL_MODULE_OPTIONS],
			provide: getToken(options.tokenName),
			useFactory: async (options: IOptions) => new MysqlProvider(options),
		};

		return {
			module: MysqlModule,
			providers: [optionProvider, provider],
			exports: [provider],
		};
	}

	static forRootAsync(options: IMysqlAsyncOptions): DynamicModule {
		const provider: Provider = {
			inject: [MYSQL_MODULE_OPTIONS],
			provide: getToken(options.tokenName),
			useFactory: async (options: IOptions) => new MysqlProvider(options),
		};

		return {
			module: MysqlModule,
			imports: options.imports,
			providers: [...this.createAsyncProviders(options), provider],
			exports: [provider],
		};
	}

	private static createAsyncProviders(options: IMysqlAsyncOptions): Provider[] {
		if (options.useExisting || options.useFactory) {
			return [this.createAsyncOptionsProvider(options)];
		}

		const useClass = options.useClass as Type<IMysqlOptionsFactory>;

		return [
			this.createAsyncOptionsProvider(options),
			{
				provide: useClass,
				useClass,
			},
		];
	}

	private static createAsyncOptionsProvider(options: IMysqlAsyncOptions): Provider {
		if (options.useFactory) {
			return {
				provide: MYSQL_MODULE_OPTIONS,
				useFactory: options.useFactory,
				inject: options.inject || [],
			};
		}

		const inject = [(options.useClass || options.useExisting) as Type<IMysqlOptionsFactory>];

		return {
			provide: MYSQL_MODULE_OPTIONS,
			useFactory: async (optionsFactory: IMysqlOptionsFactory) => await optionsFactory.createMysqlOptions(),
			inject,
		};
	}
}
