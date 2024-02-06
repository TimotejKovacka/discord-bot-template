import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

import { ICommand } from '..';

const COMMAND_NAME = 'object-command-name';
const COMMAND_DESCRIPTION = 'Command description';
export const COMMAND_RESPONSE = 'Object command response';

const commandBuilder = new SlashCommandBuilder().setName(COMMAND_NAME).setDescription(COMMAND_DESCRIPTION);

/**
 * This is an example of a command written as an object.
 */
const command: ICommand = {
  data: commandBuilder,
  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.reply(COMMAND_RESPONSE);
  },
};

export default command;
