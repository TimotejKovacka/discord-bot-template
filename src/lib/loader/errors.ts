export class LoadError extends Error {
  name = 'LoadError';

  constructor(message?: string) {
    super(message ?? 'Failed to load object');
  }
}

export class LoadableNotFoundError extends LoadError {
  name = 'LoadableNotFoundError';

  constructor(message?: string) {
    super(message ?? 'Loadable not found');
  }
}
