export type PositionalParameters = unknown[];

export type NamedParameters = Record<string, unknown>;

export type CallbackFunction<
  P extends PositionalParameters = PositionalParameters,
  N extends NamedParameters = NamedParameters,
> = (positional: P, named: N) => void;
