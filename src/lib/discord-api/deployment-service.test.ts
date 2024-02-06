import {Routes} from 'discord.js';
import {DeploymentService} from './deployment-service';
import {createCommandDeployOptions} from '../../lib/jest-utils/common';

const PUT_FN_NAME = 'put';
const TOKEN = 'test-bot-token';

describe('Deployment Service', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should deploy a command to a guild', async () => {
    // Given
    const {deploymentService, putMock} = setupDeploymentService();
    const {options} = createCommandDeployOptions({useSingleCommand: true, useGuildId: true});
    const guildId = options.guildId ?? options.developmentGuildId;

    // When
    await deploymentService.deployCommandToGuild(options);

    // Then
    expect(putMock).toHaveBeenCalledTimes(1);
    expect(putMock).toHaveBeenCalledWith({
      route: Routes.applicationGuildCommand(options.botApplicationId, guildId, options.command.data.name),
      body: options.command.data.toJSON()
    });
  });

  test('should deploy a command to all guilds', async () => {
    // Given
    const {deploymentService, putMock} = setupDeploymentService();
    const {options} = createCommandDeployOptions({useSingleCommand: true, useGuildId: false});

    // When
    await deploymentService.deployCommandToAllGuilds(options);

    // Then
    expect(putMock).toHaveBeenCalledTimes(1);
    expect(putMock).toHaveBeenCalledWith({
      route: Routes.applicationCommand(options.botApplicationId, options.command.data.name),
      body: options.command.data.toJSON()
    });
  });

  test('should deploy multiple commands to a guild', async () => {
    // Given
    const {deploymentService, putMock} = setupDeploymentService();
    const {options} = createCommandDeployOptions({useSingleCommand: false, useGuildId: true});

    // When
    await deploymentService.deployCommandsToGuild(options);

    // Then
    expect(putMock).toHaveBeenCalledTimes(1);
    expect(putMock).toHaveBeenCalledWith({
      route: Routes.applicationGuildCommands(options.botApplicationId, options.guildId ?? options.developmentGuildId),
      body: options.commands.map((command) => command.data.toJSON())
    });
  });

  test('should deploy multiple commands to all guilds', async () => {
    // Given
    const {deploymentService, putMock} = setupDeploymentService();
    const {options} = createCommandDeployOptions({useSingleCommand: false, useGuildId: false});

    // When
    await deploymentService.deployCommandsToAllGuilds(options);

    // Then
    expect(putMock).toHaveBeenCalledTimes(1);
    expect(putMock).toHaveBeenCalledWith({
      route: Routes.applicationCommands(options.botApplicationId),
      body: options.commands.map((command) => command.data.toJSON())
    });
  });
});

function setupDeploymentService(
  token: string = TOKEN,
  putMock: jest.Mock = jest.fn()
): {
  deploymentService: DeploymentService;
  putMock: jest.Mock;
} {
  const deploymentService = new DeploymentService(token);
  mockPutMethod(deploymentService, putMock);

  return {
    deploymentService,
    putMock
  };
}

/**
 * Mocks the put method on the deployment service.
 * @param deploymentService
 * @param put The mock function to use
 */
function mockPutMethod(deploymentService: DeploymentService, put: jest.Mock) {
  deploymentService[PUT_FN_NAME] = put;
}
