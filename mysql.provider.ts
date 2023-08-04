import { Injectable, OnApplicationShutdown } from "@nestjs/common";
import { Pool, PoolConnection, createPool } from "mysql2/promise";
import { Transaction } from "./mysql.transaction";
import { IOptions, ITransaction } from "./interfaces";

@Injectable()
export class MysqlProvider implements OnApplicationShutdown {
	private pool: Pool;

	constructor(private readonly options: IOptions) {
		this.pool = createPool(options);
	}

	async getTransaction(): Promise<ITransaction> {
		const conn: PoolConnection = await this.pool.getConnection();

		const tx = new Transaction(conn);
		await tx.beginTransaction();

		return tx;
	}

	async query(sql: string, value?: any) {
		const [result] = await this.pool.query(sql, value);

		return result;
	}

	async execute(sql: string, value?: any) {
		const [result] = await this.pool.execute(sql, value);

		return result;
	}

	onApplicationShutdown(signal?: string) {
		if (this.pool) {
			this.pool.end();
		}
	}
}
