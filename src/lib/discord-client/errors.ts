export class MissingGuildIdError extends Error {
  constructor() {
    super('No guildId provided');
  }
}
