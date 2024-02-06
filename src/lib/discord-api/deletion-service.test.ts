import {createCommandDeleteOptions} from '../jest-utils';
import {DeletionService} from './deletion-service';
import {Routes} from 'discord.js';

const TOKEN = 'test-bot-token';
const DELETE_FN_NAME = 'delete';

describe('Deletion Service', () => {
  test('should delete a command from a guild', async () => {
    // Given
    const {deletionService, deleteMock} = setupDeletionService();
    const {options} = createCommandDeleteOptions({useSingleCommand: true, useGuildId: true});
    const guildId = options.guildId ?? options.developmentGuildId;

    // When
    await deletionService.deleteCommandFromGuild(options);

    // Then
    expect(deleteMock).toHaveBeenCalledTimes(1);
    expect(deleteMock).toHaveBeenCalledWith({
      route: Routes.applicationGuildCommand(options.botApplicationId, guildId, options.commandName)
    });
  });

  test('should delete a command from all guilds', async () => {
    // Given
    const {deletionService, deleteMock} = setupDeletionService();
    const {options} = createCommandDeleteOptions({useSingleCommand: true, useGuildId: false});

    // When
    await deletionService.deleteCommandFromAllGuilds(options);

    // Then
    expect(deleteMock).toHaveBeenCalledTimes(1);
    expect(deleteMock).toHaveBeenCalledWith({
      route: Routes.applicationCommand(options.botApplicationId, options.commandName)
    });
  });

  test('should delete multiple commands from a guild', async () => {
    // Given
    const {deletionService, deleteMock} = setupDeletionService();
    const {options} = createCommandDeleteOptions({useSingleCommand: false, useGuildId: true});
    const guildId = options.guildId ?? options.developmentGuildId;

    // When
    await deletionService.deleteCommandsFromGuild(options);

    // Then
    expect(deleteMock).toHaveBeenCalledTimes(1);
    expect(deleteMock).toHaveBeenCalledWith({
      route: Routes.applicationGuildCommands(options.botApplicationId, guildId)
    });
  });

  test('should delete multiple commands from all guilds', async () => {
    // Given
    const {deletionService, deleteMock} = setupDeletionService();
    const {options} = createCommandDeleteOptions({useSingleCommand: false, useGuildId: false});

    // When
    await deletionService.deleteCommandsFromAllGuilds(options);

    // Then
    expect(deleteMock).toHaveBeenCalledTimes(1);
    expect(deleteMock).toHaveBeenCalledWith({
      route: Routes.applicationCommands(options.botApplicationId)
    });
  });
});

function setupDeletionService(
  token: string = TOKEN,
  deleteMock: jest.Mock = jest.fn()
): {
  deletionService: DeletionService;
  deleteMock: jest.Mock;
} {
  const deletionService = new DeletionService(token);
  mockDeleteMethod(deletionService, deleteMock);

  return {
    deletionService,
    deleteMock
  };
}

function mockDeleteMethod(deletionService: DeletionService, deleteMock: jest.Mock) {
  deletionService[DELETE_FN_NAME] = deleteMock;
}
