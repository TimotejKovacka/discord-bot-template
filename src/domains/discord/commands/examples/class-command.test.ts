import {ChatInputCommandInteraction} from 'discord.js';
import testedCommand, {COMMAND_RESPONSE} from './class-command';

describe('Class Command', () => {
  const command = testedCommand;
  let interaction: ChatInputCommandInteraction;

  beforeEach(() => {
    interaction = {
      reply: jest.fn()
    } as unknown as ChatInputCommandInteraction;
  });

  it(`should reply with "${COMMAND_RESPONSE}" when executed`, async () => {
    await command.execute(interaction);

    expect(interaction.reply).toHaveBeenCalledWith(COMMAND_RESPONSE);
  });
});
