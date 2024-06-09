import { integer, primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createId } from '@paralleldrive/cuid2';
import { relations } from 'drizzle-orm';

export const users = sqliteTable('users', {
	id: text('id').$defaultFn(createId).primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull(),
	password: text('password'),
	two_factor_method: text('two_factor_method', {
		enum: ['NONE', 'EMAIL', 'AUTHENTICATOR']
	}).$default(() => 'NONE'),
	two_factor_secret: text('two_factor_secret'),
	last_login: integer('last_login', { mode: 'timestamp' }).$defaultFn(() => new Date())
});
export const usersRelations = relations(users, ({ many }) => ({
	session: many(sessionTable),
	customers: many(developersToCustomers)
}));
export const sessionTable = sqliteTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	expiresAt: integer('expires_at').notNull()
});
export const sessionRelations = relations(sessionTable, ({ one }) => ({
	user: one(users, {
		fields: [sessionTable.userId],
		references: [users.id]
	})
}));
export const oauthAccounts = sqliteTable('oauth_account', {
	id: text('id')
		.$defaultFn(() => createId())
		.notNull()
		.primaryKey(),
	provider_id: text('provider_id').notNull(),
	provider_user_id: text('provider_user_id').notNull().unique(),
	user_id: text('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' })
});
export const verificationToken = sqliteTable('verificationToken', {
	id: text('id')
		.$defaultFn(() => createId())
		.notNull(),
	email: text('email').notNull().unique(),
	token: text('token').notNull().unique(),
	expires: integer('expires', { mode: 'timestamp' }).notNull()
});

export const passwordResetToken = sqliteTable('passwordResetToken', {
	id: text('id')
		.$defaultFn(() => createId())
		.notNull(),
	email: text('email').notNull().unique(),
	token: text('token').notNull().unique(),
	expires: integer('expires', { mode: 'timestamp' }).notNull()
});

export const emailTwoFactorVerificationToken = sqliteTable('emailTwoFactorVerificationToken', {
	id: text('id')
		.$defaultFn(() => createId())
		.notNull(),
	email: text('email').notNull().unique(),
	token: text('token').notNull().unique(),
	expires: integer('expires', { mode: 'timestamp' }).notNull()
});

export const emailTwoFactorConfirmation = sqliteTable('emailTwoFactorConfirmation', {
	id: text('id')
		.$defaultFn(() => createId())
		.notNull(),
	userId: text('userId')
		.notNull()
		.references(() => users.id, {
			onDelete: 'cascade'
		})
		.unique()
});

export const customers = sqliteTable('customers', {
	id: text('id')
		.$defaultFn(() => createId())
		.notNull()
		.primaryKey(),
	name: text('name').notNull()
});

export const products = sqliteTable('products', {
	id: text('id')
		.$defaultFn(() => createId())
		.notNull()
		.primaryKey(),
	name: text('name').notNull(),
	description: text('description'),
	url: text('url').notNull(),
	type: text('type', {
		enum: ['CUSTOM', 'EXTERNAL', 'PORTAL']
	}).notNull(),
	customerId: text('customer_id')
		.notNull()
		.references(() => customers.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade'
		}),
	secrets: text('secrets', { mode: 'json' }).notNull(),
	image: text('image').notNull(),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull()
});

export const productsRelations = relations(products, ({ one }) => ({
	customer: one(customers, {
		fields: [products.customerId],
		references: [customers.id]
	})
}));

export const customersRelations = relations(customers, ({ many }) => ({
	products: many(products),
	developers: many(developersToCustomers)
}));

export const developersToCustomers = sqliteTable(
	'developers_to_customers',
	{
		developerId: text('developer_id')
			.notNull()
			.references(() => users.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade'
			}),
		customerId: text('customer_id')
			.notNull()
			.references(() => customers.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade'
			})
	},
	(t) => ({
		pk: primaryKey({ columns: [t.developerId, t.customerId] })
	})
);

export const developersToCustomersRelations = relations(developersToCustomers, ({ one }) => ({
	customer: one(customers, {
		fields: [developersToCustomers.customerId],
		references: [customers.id]
	}),
	developer: one(users, {
		fields: [developersToCustomers.developerId],
		references: [users.id]
	})
}));
