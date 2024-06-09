import { Lucia } from 'lucia';
import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle';
import { dev } from '$app/environment';
import { sessionTable, users, type DatabaseUser } from './db/schema';

import { db } from './db/db';

const adapter = new DrizzleSQLiteAdapter(db, sessionTable, users);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: !dev
		}
	},
	getUserAttributes: (attributes) => {
		return {
			name: attributes.name,
			email: attributes.email,
			id: attributes.id,
			'2fa': attributes.two_factor_method
		};
	}
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: Omit<DatabaseUser, 'password'>;
	}
}
