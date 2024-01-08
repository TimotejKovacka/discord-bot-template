import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

import { BaseLoader, Loadable } from '../loader';
import { Logger } from '../logger';

export interface ICommand extends Loadable {
  data: SlashCommandBuilder;
  execute(interaction: ChatInputCommandInteraction): Promise<void>;
}

export class CommandLoader extends BaseLoader {
  static async loadCommands(logger?: Logger): Promise<ICommand[]> {
    return await this.loadDirectory<ICommand>(__dirname, __filename, logger);
  }

  protected static isValid<ICommand>(object: any): object is ICommand {
    return super.isValid(object) && 'data' in object && object.data instanceof SlashCommandBuilder;
  }
}
