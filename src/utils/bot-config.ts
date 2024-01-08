import dotenv from 'dotenv';

export interface BotConfig {
  token: string;
  debug: boolean;
}

export function botConfig(): BotConfig {
  dotenv.config();

  const token = process.env.BOT_TOKEN;
  if (!token) {
    throw new MissingEnvironmentVariableError('BOT_TOKEN');
  }

  const debug = process.env.DEBUG === 'true';

  return { token, debug };
}

export class MissingEnvironmentVariableError extends Error {
  readonly name = 'MissingEnvironmentVariableError';

  constructor(variableName: string) {
    super(`Environment variable ${variableName} is not set`);
  }
}
