import { ModuleMetadata, Type } from "@nestjs/common";

export interface IOptions {
	host?: string;
	port?: number;
	user?: string;
	password?: string;
	database?: string;
	charset?: string;
	timezone?: string;
	multipleStatements?: boolean;
	debug?: boolean;
	trace?: boolean;
	localAddress?: string;
	socketPath?: string;
	stringifyObjects?: boolean;
	insecureAuth?: boolean;
	typeCast?: boolean;
	queryFormat?: any;
	supportBigNumbers?: boolean;
	bigNumberStrings?: any;
	localInfile?: boolean;
	flags?: any;
	ssl?: any;
	waitForConnections?: boolean;
	queueLimit?: number;
	connectTimeout?: number;
	dateStrings?: boolean;
	decimalNumbers?: boolean;
	connectionLimit?: number;
}

export interface IMysqlOptions extends IOptions {
	tokenName?: string;
}

export interface IMysqlOptionsFactory {
	createMysqlOptions(): Promise<IOptions> | IOptions;
}

export interface IMysqlAsyncOptions extends ModuleMetadata {
	useExisting?: Type<IMysqlOptionsFactory>;
	useClass?: Type<IMysqlOptionsFactory>;
	useFactory?: (...args: any[]) => Promise<IOptions> | IOptions;
	inject?: any[];

	tokenName?: string;
}
