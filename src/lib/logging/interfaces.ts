export type Logger = {
  log(m: string);
  info(m: string);
  warn(m: string);
  error(m?: string, ...args: any[]);
};
