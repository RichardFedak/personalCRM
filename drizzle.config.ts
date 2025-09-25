import type { Config } from 'drizzle-kit';

export default {
  schema: './db/schema.ts', // path to schema
  out: './drizzle',         // where migrations will be generated
  dialect: 'sqlite',
  driver: 'expo',
} satisfies Config;
