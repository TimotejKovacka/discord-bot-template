import { Logger } from './interfaces';

export class BaseLogger implements Logger {
  log(m: string) {
    console.log(m);
  }

  warn(m: string) {
    console.log(`[WARNING] ${m}`);
  }

  error(m?: string, ...args: any[]) {
    console.error(`[ERROR] ${m}`, args);
  }

  info(m: string) {
    console.log(`[INFO] ${m}`);
  }
}
