import {Routes} from 'discord.js';

import {BaseApiService} from './base-api-service';
import {
  GuildCommandDeployOptions,
  GuildCommandsDeployOptions,
  GlobalCommandDeployOptions,
  GlobalCommandsDeployOptions
} from './interfaces';

import {Logger} from '../logging';

/**
 * Represents a service for deploying commands to Discord guilds.
 */
export class DeploymentService extends BaseApiService {
  /**
   * Creates an instance of DeploymentService.
   * @param botToken - The token of the Discord bot.
   * @param logger - (Optional) The logger to use for logging messages. If not provided, the default console logger will be used.
   */
  constructor(botToken: string, logger?: Logger) {
    super(botToken, logger);
  }

  /**
   * Deploys a command to a specific guild in Discord.
   * Refreshes the command if it already exists.
   * @param options - The options for deploying the command.
   * @returns A promise that resolves when the command is deployed successfully.
   */
  async deployCommandToGuild(options: GuildCommandDeployOptions): Promise<void> {
    const guildId = options.guildId ?? options.developmentGuildId;
    const commandName = options.command.data.name;
    const route = Routes.applicationGuildCommand(options.botApplicationId, guildId, commandName);
    const commandData = options.command.data.toJSON();

    this.logger.info(`Deploying (/) command "${commandName}" to guild "${guildId}"`);
    await this.put({route, body: commandData});
  }

  /**
   * Deploys a command to all guilds in Discord.
   * Refreshes the command if it already exists.
   * @param options - The options for deploying the command.
   * @returns A promise that resolves when the command is deployed successfully.
   */
  async deployCommandToAllGuilds(options: GlobalCommandDeployOptions): Promise<void> {
    const commandName = options.command.data.name;
    const route = Routes.applicationCommand(options.botApplicationId, commandName);
    const commandData = options.command.data.toJSON();

    this.logger.info(`Deploying (/) command "${commandName}" to all guilds`);
    await this.put({route, body: commandData});
  }

  /**
   * Deploys multiple commands to a specific guild in Discord.
   * Refreshes all commands in the guild.
   * @param options - The options for deploying the commands.
   * @returns A promise that resolves when the commands are deployed successfully.
   */
  async deployCommandsToGuild(options: GuildCommandsDeployOptions): Promise<void> {
    const guildId = options.guildId ?? options.developmentGuildId;
    const route = Routes.applicationGuildCommands(options.botApplicationId, guildId);

    const commandsData = options.commands.map((command) => command.data.toJSON());

    this.logger.info(`Deploying ${commandsData.length} (/) commands to guild "${guildId}"`);
    await this.put({route, body: commandsData});
  }

  /**
   * Deploys multiple commands to all guilds in Discord.
   * Refreshes all commands in all guilds.
   * @param options - The options for deploying the commands.
   * @returns A promise that resolves when the commands are deployed successfully.
   */
  async deployCommandsToAllGuilds(options: GlobalCommandsDeployOptions): Promise<void> {
    const route = Routes.applicationCommands(options.botApplicationId);

    const commandsData = options.commands.map((command) => command.data.toJSON());

    this.logger.info(`Deploying ${commandsData.length} (/) commands to all guilds`);
    await this.put({route, body: commandsData});
  }
}
