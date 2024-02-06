import { ClientEvents } from 'discord.js';

import { BaseLoader } from '../../../lib/loader';
import { Logger } from '../../../lib/logging';

export type ClientEvent<EventName extends keyof ClientEvents = keyof ClientEvents> = {
  name: EventName;
  once?: boolean;
  execute: (...args: ClientEvents[EventName]) => Promise<void>;
};

export class EventLoader extends BaseLoader {
  static async loadEvents(logger?: Logger): Promise<ClientEvent[]> {
    return await this.loadDirectory<ClientEvent>(__dirname, __filename, logger);
  }

  protected static isValid<ClientEvent>(object: any): object is ClientEvent {
    return super.isValid(object) && 'name' in object;
  }
}
