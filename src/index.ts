import { GatewayIntentBits } from 'discord.js';

import { DiscordClient } from './lib/discord-client';
import { BaseLogger } from './lib/logging';
import { botConfig } from './lib/utils/bot-config';

const config = botConfig();
const logger = new BaseLogger();
const client = new DiscordClient({
  ...config,
  botIntents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions],
  logger,
});

async function main() {
  try {
    await client.init();
    await client.start();
  } catch (error) {
    console.error(error);
  }
}

main(); // eslint-disable-line @typescript-eslint/no-floating-promises
