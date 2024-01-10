import {ChatInputCommandInteraction, SlashCommandBuilder} from 'discord.js';

import {ICommand} from '..';
import {DiscordClient} from '../../discord-client/discord-client';
import {QueueNames} from '../../redis';

const COMMAND_NAME = 'redis';
const COMMAND_DESCRIPTION = 'redis example';
export const COMMAND_RESPONSE = 'Redis example';

const commandBuilder = new SlashCommandBuilder().setName(COMMAND_NAME).setDescription(COMMAND_DESCRIPTION);

/**
 * This is an example of a filter for a collector.
 * It collects reactions that are 👍
 */
const reactionFilter = (reaction, user) => {
  return reaction.emoji.name === '👍';
};

const reactionCollectListener = (reaction, user) => {
  console.log('reactionCollectListener', reaction, user);
};

/**
 * This is an example of a command written as an object.
 */
const command: ICommand = {
  data: commandBuilder,
  async execute(interaction: ChatInputCommandInteraction) {
    // Add a job to the interaction queue
    const client = interaction.client as DiscordClient;
    const reddisManager = client.redisManager;

    // reddisManager.addJob(QueueNames.Interaction, 'redis', interaction);

    const message = await interaction.reply({content: COMMAND_RESPONSE, fetchReply: true});

    // Collect reactions
    const reactionCollector = message.createReactionCollector({filter: reactionFilter});

    // Handle collected reactions
    reactionCollector.on('collect', reactionCollectListener);
  }
};

export default command;
