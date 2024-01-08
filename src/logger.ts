export type Logger = {
  log(m: string);
  info(m: string);
  warn(m: string);
  error(m?: string, ...args: any[]);
};

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
