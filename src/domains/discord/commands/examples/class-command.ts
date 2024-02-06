import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

import { ICommand } from '..';

export const COMMAND_RESPONSE = 'Class command response';

/**
 * This is an example of a command written as a class.
 */
class Command implements ICommand {
  data = new SlashCommandBuilder().setName('class-command-name').setDescription('Command description');

  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.reply(COMMAND_RESPONSE);
  }
}

export default new Command();
