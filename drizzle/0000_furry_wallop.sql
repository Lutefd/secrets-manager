CREATE TABLE `customers` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `developers_to_customers` (
	`id` text NOT NULL,
	`developer_id` text NOT NULL,
	`customer_id` text NOT NULL,
	PRIMARY KEY(`customer_id`, `developer_id`),
	FOREIGN KEY (`developer_id`) REFERENCES `users`(`id`) ON UPDATE cascade ON DELETE cascade,
	FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `emailTwoFactorConfirmation` (
	`id` text NOT NULL,
	`userId` text NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `emailTwoFactorVerificationToken` (
	`id` text NOT NULL,
	`email` text NOT NULL,
	`token` text NOT NULL,
	`expires` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oauth_account` (
	`id` text PRIMARY KEY NOT NULL,
	`provider_id` text NOT NULL,
	`provider_user_id` text NOT NULL,
	`user_id` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `passwordResetToken` (
	`id` text NOT NULL,
	`email` text NOT NULL,
	`token` text NOT NULL,
	`expires` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`url` text NOT NULL,
	`type` text NOT NULL,
	`customer_id` text NOT NULL,
	`secrets` text NOT NULL,
	`image` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`password` text,
	`two_factor_method` text,
	`two_factor_secret` text,
	`last_login` integer
);
--> statement-breakpoint
CREATE TABLE `verificationToken` (
	`id` text NOT NULL,
	`email` text NOT NULL,
	`token` text NOT NULL,
	`expires` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `emailTwoFactorConfirmation_userId_unique` ON `emailTwoFactorConfirmation` (`userId`);--> statement-breakpoint
CREATE UNIQUE INDEX `emailTwoFactorVerificationToken_email_unique` ON `emailTwoFactorVerificationToken` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `emailTwoFactorVerificationToken_token_unique` ON `emailTwoFactorVerificationToken` (`token`);--> statement-breakpoint
CREATE UNIQUE INDEX `oauth_account_provider_user_id_unique` ON `oauth_account` (`provider_user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `passwordResetToken_email_unique` ON `passwordResetToken` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `passwordResetToken_token_unique` ON `passwordResetToken` (`token`);--> statement-breakpoint
CREATE UNIQUE INDEX `verificationToken_email_unique` ON `verificationToken` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `verificationToken_token_unique` ON `verificationToken` (`token`);