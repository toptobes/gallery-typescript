import { Tags } from '~/lib/api/tags.ts';
import { OrderedSet } from 'immutable';
import { Dispatch } from 'react';

export interface UseFilter {
  filterDispatch: Dispatch<FilterAction>;
  filter: Filter;
}

export type Filter =
  | { type: 'normal', tags: Tags, query: string }
  | { type: 'similar', key: string, title: string }

export type FilterAction =
  | { type: 'set-query', query: string }
  | { type: 'toggle-tag', tag: string }
  | { type: 'clear-filters' }
  | { type: 'set-similar', key: string, title: string }

export const DEFAULT_FILTER: Filter = {
  type: 'normal',
  tags: OrderedSet(),
  query: ''
}

export const filterReducer = (state: Filter, action: FilterAction): Filter => {
  switch (action.type) {
    case 'set-query': {
      return (state.type === 'normal')
        ? { ...state, query: action.query }
        : { type: 'normal', tags: OrderedSet(), query: action.query };
    }
    case 'toggle-tag': {
      return (state.type === 'normal')
        ? { ...state, tags: state.tags.has(action.tag) ? state.tags.delete(action.tag) : state.tags.add(action.tag) }
        : { ...DEFAULT_FILTER, tags: OrderedSet([action.tag]) };
    }
    case 'clear-filters': {
      return DEFAULT_FILTER;
    }
    case 'set-similar': {
      return { type: 'similar', key: action.key, title: action.title };
    }
  }
}
