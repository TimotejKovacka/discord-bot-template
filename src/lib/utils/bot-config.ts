import dotenv from 'dotenv';

export interface BotConfig {
  botApplicationId: string;
  botToken: string;
  debug: boolean;
  developmentGuildId: string;
}

export function botConfig(): BotConfig {
  dotenv.config();

  const botToken = process.env.BOT_TOKEN;
  if (!botToken) {
    throw new MissingEnvironmentVariableError('BOT_TOKEN');
  }

  const botApplicationId = process.env.BOT_APPLICATION_ID;
  if (!botApplicationId) {
    throw new MissingEnvironmentVariableError('BOT_APPLICATION_ID');
  }

  const developmentGuildId = process.env.DEVELOPMENT_GUILD_ID;
  if (!developmentGuildId) {
    throw new MissingEnvironmentVariableError('DEVELOPMENT_GUILD_ID');
  }

  const debug = process.env.DEBUG === 'true';

  return {botApplicationId, botToken, debug, developmentGuildId};
}

export class MissingEnvironmentVariableError extends Error {
  readonly name = 'MissingEnvironmentVariableError';

  constructor(variableName: string) {
    super(`Environment variable ${variableName} is not set`);
  }
}
