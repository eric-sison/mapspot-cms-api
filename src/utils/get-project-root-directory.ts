import * as fs from 'fs';
import * as path from 'path';

export const getProjectRootDirectory = () => {
  let currDir = __dirname;
  while (!fs.existsSync(path.join(currDir, 'package.json'))) {
    currDir = path.join(currDir, '..');
  }
  return currDir;
};
