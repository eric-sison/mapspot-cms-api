import { readFileSync } from 'fs';
import { join } from 'path';
import { getProjectRootDirectory } from 'src/utils/get-project-root-directory';

export const readPgSqlFile = (filePath: string) => readFileSync(join(getProjectRootDirectory(), filePath), 'utf-8');
