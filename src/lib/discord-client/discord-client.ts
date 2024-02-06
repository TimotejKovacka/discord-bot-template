import { BaseClient } from './base-client';
import { DiscordClientConfig } from './interfaces';

import { Logger } from '../logging';

export class DiscordClient {
  private readonly client: BaseClient;
  private readonly logger?: Logger;

  constructor(private readonly config: DiscordClientConfig) {
    this.client = new BaseClient({
      intents: config.botIntents,
      logger: config.logger,
    });
    this.logger = config.logger;
  }

  /**
   * Loads stuff up
   */
  async init() {
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
