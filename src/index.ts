import {GatewayIntentBits} from 'discord.js';

import {DiscordClient} from './discord-client/discord-client';
import {BaseLogger} from './logger';
import {botConfig} from './utils/bot-config';

const config = botConfig();
const logger = new BaseLogger();
const client = new DiscordClient({
  botToken: config.token,
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions],
  logger
});

async function main() {
  try {
    await client.init({});
    await client.start();
  } catch (error) {
    console.error(error);
  }
}

main(); // eslint-disable-line @typescript-eslint/no-floating-promises
