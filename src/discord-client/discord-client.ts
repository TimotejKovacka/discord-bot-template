import {Client, ClientOptions, Collection, GatewayIntentBits} from 'discord.js';

import {Logger} from '../logger';
import {RedisManager} from '../redis';
import {CommandLoader, ICommand} from '../commands';
import {LoadError} from '../loader';
import {ClientEvent, EventLoader} from '../events';

export type CustomClientOptions = {
  botToken: string;
  logger?: Logger;
};

export type DiscordClientOptions = ClientOptions & CustomClientOptions;

export type DiscordClientInitOptions = {};

export class DiscordClient extends Client {
  readonly commands = new Collection<string, ICommand>();

  public readonly redisManager: RedisManager;
  public readonly logger?: Logger;

  constructor(private readonly config: DiscordClientOptions) {
    super({
      intents: config.intents
    });

    this.logger = config.logger;
    this.redisManager = new RedisManager();
  }

  /**
   * Loads stuff up
   */
  async init(options: DiscordClientInitOptions) {
    await this.registerCommands();
    await this.registerEventHandlers();
  }

  /**
   * Starts the Bot
   */
  async start() {
    await this.login(this.config.botToken);
  }

  private async registerCommands(): Promise<void> {
    const commands: ICommand[] = await CommandLoader.loadCommands(this.logger);
    if (!commands) {
      throw new LoadError('No commands found');
    }

    commands.forEach((command) => {
      this.commands.set(command.data.name, command);
    });

    this.logger?.info(`Registered ${commands.length} commands.`);
  }

  private async registerEventHandlers(): Promise<void> {
    const events: ClientEvent[] = await EventLoader.loadEvents(this.logger);
    if (!events) {
      throw new LoadError('No events found');
    }

    events.forEach((event) => {
      if (event.once) {
        this.once(event.name, (...args) => event.execute(...args));
      } else {
        this.on(event.name, (...args) => event.execute(...args));
      }
      this.logger?.info(`Registered handler for event "${event.name}"`);
    });
  }
}
