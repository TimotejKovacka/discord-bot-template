import { Events } from 'discord.js';

import { ClientEvent } from '.';

const EVENT_LOG_MESSAGE = 'Discord bot client is ready.';

const EVENT_NAME = Events.ClientReady;
const EVENT_ONCE = true;
const EVENT_EXECUTE = async () => {
  console.log(EVENT_LOG_MESSAGE);
};

const READY_EVENT: ClientEvent<Events.ClientReady> = {
  name: EVENT_NAME,
  once: EVENT_ONCE,
  execute: EVENT_EXECUTE,
};

export default READY_EVENT;
