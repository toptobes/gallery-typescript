import { OrderedSet } from 'immutable';

export type Categories = Record<string, Tags>;
export type Tags = OrderedSet<string>;
