// src/env.mjs
import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
	server: {
		DB_URL: z.string().url(),
		DB_AUTH_TOKEN: z.string()
	},
	client: {},
	clientPrefix: 'SVELTE_PUBLIC',
	runtimeEnv: {
		DB_URL: process.env.DB_URL,
		DB_AUTH_TOKEN: process.env.DB_AUTH_TOKEN
	}
});
