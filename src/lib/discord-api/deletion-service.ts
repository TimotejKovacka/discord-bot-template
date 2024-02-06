import {Routes} from 'discord.js';

import {BaseApiService} from './base-api-service';
import {
  GlobalCommandDeleteOptions,
  GlobalCommandsDeleteOptions,
  GuildCommandDeleteOptions,
  GuildCommandsDeleteOptions
} from './interfaces';

import {Logger} from '../logging';

/**
 * Represents a service for deleting commands from Discord guilds.
 */
export class DeletionService extends BaseApiService {
  /**
   * Creates an instance of DeleteService.
   * @param botToken - The token of the Discord bot.
   * @param logger - (Optional) The logger to use for logging messages. If not provided, the default console logger will be used.
   */
  constructor(botToken: string, logger?: Logger) {
    super(botToken, logger);
  }

  /**
   * Deletes a command from a specific guild in Discord.
   * @param options - The options for deleting the command.
   * @returns A promise that resolves when the command is deleted successfully.
   */
  async deleteCommandFromGuild(options: GuildCommandDeleteOptions) {
    const guildId = options.guildId ?? options.developmentGuildId;
    const route = Routes.applicationGuildCommand(options.botApplicationId, guildId, options.commandName);

    this.logger.info(`Deleting (/) command "${options.commandName}" from guild "${guildId}"`);
    await this.delete({route});
  }

  /**
   * Deletes a command from all guilds in Discord.
   * @param options - The options for deleting the command.
   * @returns A promise that resolves when the command is deleted successfully.
   */
  async deleteCommandFromAllGuilds(options: GlobalCommandDeleteOptions) {
    const route = Routes.applicationCommand(options.botApplicationId, options.commandName);

    this.logger.info(`Deleting (/) command "${options.commandName}" from all guilds`);
    await this.delete({route});
  }

  /**
   * Deletes all commands from a specific guild in Discord.
   * @param options - The options for deleting the commands.
   * @returns A promise that resolves when the commands are deleted successfully.
   */
  async deleteCommandsFromGuild(options: GuildCommandsDeleteOptions) {
    const guildId = options.guildId ?? options.developmentGuildId;
    const route = Routes.applicationGuildCommands(options.botApplicationId, guildId);

    this.logger.info(`Deleting (/) commands from guild "${options.guildId}"`);
    await this.delete({route});
  }

  /**
   * Deletes all commands from all guilds in Discord.
   * @param options - The options for deleting the commands.
   * @returns A promise that resolves when the commands are deleted successfully.
   */
  async deleteCommandsFromAllGuilds(options: GlobalCommandsDeleteOptions) {
    const route = Routes.applicationCommands(options.botApplicationId);

    this.logger.info(`Deleting (/) commands from all guilds`);
    await this.delete({route});
  }
}
