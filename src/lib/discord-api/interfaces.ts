import {RouteLike} from 'discord.js';
import {ICommand} from '../../domains/discord/commands';

export type DeployOptions = {
  route: RouteLike;
  body: unknown;
};

export type BotApplicationId = {
  botApplicationId: string;
};

export type CommandName = {
  commandName: string;
};

export type OptionalGuildId = {
  guildId?: string;
};

export type DevelopmentGuildId = {
  developmentGuildId: string;
};

export type SingleCommand = {
  command: ICommand;
};

export type MultipleCommands = {
  commands: ICommand[];
};

export type GuildIdWithFallback = OptionalGuildId & DevelopmentGuildId;

/**
 * Options for deploying a command to a specific guild in Discord.
 */
export type GuildCommandDeployOptions = BotApplicationId & GuildIdWithFallback & SingleCommand;

/**
 * Options for deploying multiple commands to a specific guild in Discord.
 */
export type GuildCommandsDeployOptions = BotApplicationId & GuildIdWithFallback & MultipleCommands;

/**
 * Options for deploying a command to all guilds in Discord.
 */
export type GlobalCommandDeployOptions = BotApplicationId & SingleCommand;

/**
 * Options for deploying multiple commands to all guilds in Discord.
 */
export type GlobalCommandsDeployOptions = BotApplicationId & MultipleCommands;

/**
 * Options for deleting a command from a specific guild in Discord.
 */
export type GuildCommandDeleteOptions = BotApplicationId & GuildIdWithFallback & CommandName;

/**
 * Options for deleting a command from all guilds in Discord.
 */
export type GlobalCommandDeleteOptions = BotApplicationId & CommandName;

/**
 * Options for deleting multiple commands from a specific guild in Discord.
 */
export type GuildCommandsDeleteOptions = BotApplicationId & GuildIdWithFallback;

/**
 * Options for deleting multiple commands from all guilds in Discord.
 */
export type GlobalCommandsDeleteOptions = BotApplicationId;

/**
 *
 */
export type TestCommandOptions =
  | {useSingleCommand: true; useGuildId: true}
  | {useSingleCommand: true; useGuildId: false}
  | {useSingleCommand: false; useGuildId: true}
  | {useSingleCommand: false; useGuildId: false};

export type DeployOptionsType<T extends TestCommandOptions> = T extends {useSingleCommand: true; useGuildId: true}
  ? GuildCommandDeployOptions
  : T extends {useSingleCommand: true; useGuildId: false}
    ? GlobalCommandDeployOptions
    : T extends {useSingleCommand: false; useGuildId: true}
      ? GuildCommandsDeployOptions
      : GlobalCommandsDeployOptions;

export type DeleteOptionsType<T extends TestCommandOptions> = T extends {useSingleCommand: true; useGuildId: true}
  ? GuildCommandDeleteOptions
  : T extends {useSingleCommand: true; useGuildId: false}
    ? GlobalCommandDeleteOptions
    : T extends {useSingleCommand: false; useGuildId: true}
      ? GuildCommandsDeleteOptions
      : GlobalCommandsDeleteOptions;
