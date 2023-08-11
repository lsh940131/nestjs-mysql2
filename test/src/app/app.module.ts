import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MysqlModule } from '../../../lib';
// import { UsersModule } from './users/users.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
		MysqlModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (config: ConfigService) => ({
				host: config.get<string>('MYSQL_HOST'),
				port: config.get<number>('MYSQL_PORT'),
				user: config.get<string>('MYSQL_USER'),
				password: config.get<string>('MYSQL_PASSWORD'),
				database: config.get<string>('MYSQL_DATABASE'),
			}),
		}),
	],
})
export class AppModule {}
