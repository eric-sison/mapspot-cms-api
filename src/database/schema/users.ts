import { InferModel, sql } from 'drizzle-orm';
import { pgTable, timestamp, unique, uniqueIndex, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable(
  'users',
  {
    userId: varchar('user_id', { length: 24 })
      .default(sql`nanoid()`)
      .primaryKey(),
    firstName: varchar('first_name', { length: 50 }).notNull(),
    middleName: varchar('middle_name', { length: 50 }).notNull(),
    lastName: varchar('last_name', { length: 50 }).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (usersTable) => {
    return {
      unq: unique('USER_NAME_UNIQUE').on(usersTable.firstName, usersTable.middleName, usersTable.lastName),
    };
  },
);

export type User = InferModel<typeof users>;
