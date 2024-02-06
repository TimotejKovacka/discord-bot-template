import fs from 'fs';
import path from 'path';

import {Loadable} from './interfaces';

import {Logger} from '../logging';

export class BaseLoader {
  protected static async loadDirectory<T extends Loadable>(
    dir: string,
    fileName: string,
    defaultLogger?: Logger
  ): Promise<T[]> {
    const files = fs.readdirSync(dir, {withFileTypes: true});
    const logger = defaultLogger ?? console;
    let loadables: T[] = [];

    for (const file of files) {
      const res = path.resolve(dir, file.name);
      if (file.isDirectory()) {
        loadables = [...loadables, ...(await this.loadDirectory<T>(res, fileName, logger))];
      } else if (
        (file.name.endsWith('.js') || (file.name.endsWith('.ts') && !file.name.includes('.test'))) &&
        res !== fileName
      ) {
        const loadable = await this.load<T>(res, logger);
        if (loadable) {
          loadables.push(loadable);
        }
      }
    }

    return loadables;
  }

  protected static async load<T extends Loadable>(filePath: string, logger: Logger): Promise<T | undefined> {
    const module = await import(filePath);
    const loadable = module.default;
    if (!loadable) {
      const message = `File ${filePath} does not export a default object`;
      logger.warn(message);
      return undefined;
    }

    if (!this.isValid<T>(loadable)) {
      const message = `Object in file ${filePath} does not conform to the Loadable interface`;
      logger.warn(message);
      return undefined;
    }

    return loadable;
  }

  protected static isValid<T extends Loadable>(object: any): object is T {
    return 'execute' in object && typeof object.execute === 'function';
  }
}
