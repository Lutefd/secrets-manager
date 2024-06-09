import { type Config } from 'drizzle-kit';
import { env } from './src/lib/env.ts';

export default {
	schema: './src/lib/server/db/schema.ts',
	dialect: 'sqlite',
	driver: 'turso',
	dbCredentials: {
		// connectionString: env.DATABASE_URL,
		url: process.env.DB_URL!,
		authToken: process.env.DB_AUTH_TOKEN
		//#ts-ignore - ssl is not in the types
	},
	tablesFilter: ['dz_*'],
	out: './drizzle'
} satisfies Config;
