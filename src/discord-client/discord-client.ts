import { GatewayIntentBits } from 'discord.js';

import { BaseClient } from './base-client';

import { BaseLogger } from '../logger';

export type ClientConfig = {
  botToken: string;
  botIntents: Array<GatewayIntentBits>;
};

export type DiscordClientInitOptions = {};

export class DiscordClient {
  private readonly client: BaseClient;

  constructor(private readonly config: ClientConfig, private readonly logger?: BaseLogger) {
    this.client = new BaseClient({
      intents: config.botIntents,
      logger,
    });
  }

  /**
   * Loads stuff up
   */
  async init(options: DiscordClientInitOptions) {
    await this.client.registerCommands();
    await this.client.registerEventHandlers();
  }

  /**
   * Starts the Bot
   */
  async start() {
    await this.client.login(this.config.botToken);
  }
}
