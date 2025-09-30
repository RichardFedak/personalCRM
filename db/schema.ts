import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const contacts = sqliteTable('contacts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  uuid: text('uuid').unique(),
  name: text('name').notNull(),
  address: text('address'),
  phone: text("phone"),
  created: text('created').notNull(),
  lastEdited: text('lastEdited').notNull(),
});

export const notes = sqliteTable('notes', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  contactId: integer('contactId').notNull().references(() => contacts.id),
  content: text('content'),
  created: text('created').notNull(),
  lastEdited: text('lastEdited').notNull(),
});

export type Contact = typeof contacts.$inferSelect;
export type Note = typeof notes.$inferSelect;
