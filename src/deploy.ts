import {createInterface} from 'readline';

import {DeploymentService} from './lib/discord-client';
import {BaseLogger} from './lib/logging/base-logger';
import {botConfig} from './lib/utils/bot-config';
import {askOptionalString, askRequiredString, askYesNoQuestion} from './lib/utils/command-line';
import {CommandLoader, ICommand} from './domains/discord/commands';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});
const logger = new BaseLogger();
const config = botConfig();
const deployService = new DeploymentService(config.botToken, logger);

async function main() {
  try {
    let guildId: string | undefined;
    const guildOrGlobal = await askYesNoQuestion('Deploy to a guild (y) or globally (n)? (y/n): ', rl);
    if (guildOrGlobal) {
      guildId = await askOptionalString('Enter the guild id to deploy to', rl);
    }
    const allCommands = await askYesNoQuestion('Deploy all commands? (y/n) ', rl);
    if (allCommands && guildOrGlobal) {
      const commands: ICommand[] = await CommandLoader.loadCommands(logger);

      return await deployService.deployCommandsToGuild({
        botApplicationId: config.botApplicationId,
        developmentGuildId: config.developmentGuildId,
        guildId,
        commands
      });
    }
    if (allCommands && !guildOrGlobal) {
      const commands: ICommand[] = await CommandLoader.loadCommands(logger);

      return await deployService.deployCommandsToAllGuilds({
        botApplicationId: config.botApplicationId,
        commands
      });
    }

    const commandName = await askRequiredString('Enter the command name: ', rl);
    if (guildOrGlobal) {
      const command = await CommandLoader.loadCommand(commandName, logger);

      return await deployService.deployCommandToGuild({
        botApplicationId: config.botApplicationId,
        developmentGuildId: config.developmentGuildId,
        guildId,
        command
      });
    }

    const command = await CommandLoader.loadCommand(commandName, logger);

    return await deployService.deployCommandToAllGuilds({
      botApplicationId: config.botApplicationId,
      command
    });
  } catch (error) {
    logger.error('An error occurred:', error);
  } finally {
    rl.close();
  }
}

main(); // eslint-disable-line @typescript-eslint/no-floating-promises
