import { type Config } from 'drizzle-kit';
import { env } from './src/lib/env.js';

export default {
	schema: './server/db/schema.ts',
	dialect: 'sqlite',
	driver: 'turso',
	dbCredentials: {
		// connectionString: env.DATABASE_URL,
		url: env.DB_URL,
		authToken: env.DB_AUTH_TOKEN
		//#ts-ignore - ssl is not in the types
	},
	tablesFilter: ['dz_*'],
	out: './drizzle'
} satisfies Config;
