import { Injectable } from "@nestjs/common";
import { PoolConnection } from "mysql2/promise";

@Injectable({ scope: 2 })
export class Transaction {
	private conn: PoolConnection;

	constructor(conn: PoolConnection) {
		this.conn = conn;
	}

	async beginTransaction(): Promise<any> {
		await this.conn.beginTransaction();
	}

	async query(sql: string, value?: any) {
		const [result] = await this.conn.query(sql, value);

		return result;
	}

	commit(): Promise<any> {
		return this.conn.commit();
	}

	rollback(): Promise<any> {
		return this.conn.rollback();
	}

	release(): void {
		return this.conn.release();
	}
}
