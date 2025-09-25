CREATE TABLE `contacts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`uuid` text,
	`name` text NOT NULL,
	`address` text,
	`created` text NOT NULL,
	`lastEdited` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `contacts_uuid_unique` ON `contacts` (`uuid`);--> statement-breakpoint
CREATE TABLE `notes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`contactId` integer NOT NULL,
	`content` text,
	`created` text NOT NULL,
	`lastEdited` text NOT NULL,
	FOREIGN KEY (`contactId`) REFERENCES `contacts`(`id`) ON UPDATE no action ON DELETE no action
);
