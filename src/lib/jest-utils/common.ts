import {SlashCommandBuilder} from 'discord.js';
import {ICommand} from '../../domains/discord/commands';
import type {DeleteOptionsType, DeployOptionsType, TestCommandOptions} from '../discord-api';

const GUILD_ID = 'test-guild-id';
const APPLICATION_ID = 'test-application-id';

/**
 * Creates a mock command.
 */
export function createMockCommand(
  commandName: string = 'test-command',
  commandDescription: string = 'Test command description'
): ICommand {
  return {
    data: new SlashCommandBuilder().setName(commandName).setDescription(commandDescription),
    execute: jest.fn()
  };
}

type CommandDefaults = {
  guildId: string;
  applicationId: string;
};

export function createCommandDeployOptions<T extends TestCommandOptions>(
  options: T,
  defaults: CommandDefaults = {
    guildId: GUILD_ID,
    applicationId: APPLICATION_ID
  }
): {
  command: ICommand;
  options: DeployOptionsType<T>;
} {
  const command = createMockCommand();
  return {
    command,
    options: {
      botApplicationId: defaults.applicationId,
      ...(options.useGuildId ? {developmentGuildId: defaults.guildId} : {}),
      ...(options.useSingleCommand ? {command} : {commands: [command]})
    } as DeployOptionsType<T>
  };
}

export function createCommandDeleteOptions<T extends TestCommandOptions>(
  options: T,
  defaults: CommandDefaults = {
    guildId: GUILD_ID,
    applicationId: APPLICATION_ID
  }
): {
  command: ICommand;
  options: DeleteOptionsType<T>;
} {
  const command = createMockCommand();
  return {
    command,
    options: {
      botApplicationId: APPLICATION_ID,
      ...(options.useGuildId ? {developmentGuildId: GUILD_ID} : {}),
      ...(options.useSingleCommand ? {command} : {})
    } as DeleteOptionsType<T>
  };
}
