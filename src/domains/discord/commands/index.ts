import {ChatInputCommandInteraction, SlashCommandBuilder} from 'discord.js';

import {BaseLoader, Loadable, LoadableNotFoundError} from '../../../lib/loader';
import {Logger} from '../../../lib/logging';

export interface ICommand extends Loadable {
  data: SlashCommandBuilder;
  execute(interaction: ChatInputCommandInteraction): Promise<void>;
}

export class CommandLoader extends BaseLoader {
  /**
   *
   * @param commandName
   * @param logger
   * @returns
   */
  static async loadCommand(commandName: string, logger?: Logger): Promise<ICommand> {
    const commands = await this.loadCommands(logger);
    const command = commands.find((command) => command.data.name === commandName);
    if (!command) {
      throw new LoadableNotFoundError(`Command "${commandName}" not found`);
    }
    return command;
  }

  /**
   *
   * @param logger
   * @returns
   */
  static async loadCommands(logger?: Logger): Promise<ICommand[]> {
    const commands: ICommand[] = await this.loadDirectory<ICommand>(__dirname, __filename, logger);
    if (commands.length === 0) {
      throw new LoadableNotFoundError('No commands found');
    }
    return commands;
  }

  /**
   *
   * @param object
   * @returns
   */
  protected static isValid<ICommand>(object: any): object is ICommand {
    return super.isValid(object) && 'data' in object && object.data instanceof SlashCommandBuilder;
  }
}
