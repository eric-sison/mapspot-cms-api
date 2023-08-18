import { Client, Pool } from 'pg';
import { readPgSqlFile } from 'src/utils/read-pgsql-file';

export const initializeSql = async (client: Pool | Client) => {
  /**
   * Initialize sql that creates a `nanoid()` function for generating nanoId for primary keys.
   */
  await client.query(readPgSqlFile('/src/database/functions/nanoid.pgsql'));
};
