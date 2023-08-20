import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Logger } from '@nestjs/common';

async function runMigration() {
  // Initialize client object
  const client = new Client({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  });

  // Establish connection
  await client.connect();

  // Initialize database object
  const db = drizzle(client);

  // Execute drizzle's migration command
  await migrate(db, { migrationsFolder: './src/helpers/migrations' });

  // close the connection
  client.end();

  // Log the success message
  Logger.log('Migration successful', 'DrizzleMigration');
}

runMigration();
