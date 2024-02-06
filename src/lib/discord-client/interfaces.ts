import { GatewayIntentBits } from 'discord.js';

import { Logger } from '../logging';

export type BotConfig = {
  botIntents: Array<GatewayIntentBits>;
  botToken: string;
  developmentGuildId: string;
  botApplicationId: string;
};

export type DiscordClientConfig = {
  logger?: Logger;
} & BotConfig;
