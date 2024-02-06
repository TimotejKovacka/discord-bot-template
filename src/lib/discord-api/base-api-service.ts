import { REST } from 'discord.js';

import { DeployOptions } from './interfaces';

import { Logger } from '../logging';

/**
 * Represents a base service for interacting with the Discord REST API.
 */
export class BaseApiService {
  protected discordRestClient: REST;

  constructor(token: string, protected logger: Logger = console) {
    this.discordRestClient = new REST().setToken(token);
  }

  protected async put({ route, body }: DeployOptions) {
    return this.discordRestClient.put(route, { body });
  }

  protected async delete({ route }: Pick<DeployOptions, 'route'>) {
    return this.discordRestClient.delete(route);
  }
}
