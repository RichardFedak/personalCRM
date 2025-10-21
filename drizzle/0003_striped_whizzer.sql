PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_notes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`contactId` integer NOT NULL,
	`title` text,
	`content` text,
	`created` text NOT NULL,
	`lastEdited` text NOT NULL,
	FOREIGN KEY (`contactId`) REFERENCES `contacts`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_notes`("id", "contactId", "title", "content", "created", "lastEdited") SELECT "id", "contactId", "title", "content", "created", "lastEdited" FROM `notes`;--> statement-breakpoint
DROP TABLE `notes`;--> statement-breakpoint
ALTER TABLE `__new_notes` RENAME TO `notes`;--> statement-breakpoint
PRAGMA foreign_keys=ON;