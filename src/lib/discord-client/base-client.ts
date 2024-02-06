import { Client, ClientOptions, Collection } from 'discord.js';

import { CommandLoader, ICommand } from '../../domains/discord/commands';
import { ClientEvent, EventLoader } from '../../domains/discord/events';
import { LoadError } from '../loader';
import { Logger } from '../logging';

export type BaseClientOptions = ClientOptions & {
  logger?: Logger;
};

export class BaseClient extends Client {
  private readonly logger?: Logger;

  readonly commands = new Collection<string, ICommand>();

  constructor(options: BaseClientOptions) {
    super(options);
    this.logger = options.logger;
  }

  async registerCommands(): Promise<void> {
    const commands: ICommand[] = await CommandLoader.loadCommands(this.logger);
    if (!commands) {
      throw new LoadError('No commands found');
    }

    commands.forEach((command) => {
      this.commands.set(command.data.name, command);
    });

    this.logger?.info(`Registered ${commands.length} commands.`);
  }

  async registerEventHandlers(): Promise<void> {
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
