import mysql from 'mysql2/promise';

let pool: mysql.Pool | undefined;

export function getDbPool(): mysql.Pool {
	if (!pool) {
		const host = process.env.DB_HOST || 'localhost';
		const user = process.env.DB_USER || 'root';
		const password = process.env.DB_PASSWORD || '';
		const database = process.env.DB_DATABASE || 'schooldb';
		const port = Number(process.env.DB_PORT || 3306);

		pool = mysql.createPool({
			host,
			user,
			password,
			database,
			port,
			connectionLimit: 10,
		});
	}
	return pool;
}


