import { Tags } from '~/lib/api/tags.ts';
import { OrderedSet } from 'immutable';
import { Dispatch } from 'react';

export interface UseFilter {
  filterDispatch: Dispatch<FilterAction>;
  filter: Filter;
}

// Might make showDeprecated a shared prop in the future, but it's fine for a small app
export type Filter =
  | { type: 'normal', tags: Tags, query: string, showDeprecated: boolean }
  | { type: 'similar', key: string, title: string, showDeprecated: boolean }

export type FilterAction =
  | { type: 'set-query', query: string }
  | { type: 'toggle-tag', tag: string }
  | { type: 'clear-filters' }
  | { type: 'set-similar', key: string, title: string }
  | { type: 'toggle-show-deprecated' }

export const DEFAULT_FILTER: Filter = {
  type: 'normal',
  tags: OrderedSet(),
  query: '',
  showDeprecated: false,
}

export const filterReducer = (state: Filter, action: FilterAction): Filter => {
  switch (action.type) {
    case 'set-query': {
      return (state.type === 'normal')
        ? { ...state, query: action.query }
        : { type: 'normal', tags: OrderedSet(), query: action.query, showDeprecated: state.showDeprecated };
    }
    case 'toggle-tag': {
      return (state.type === 'normal')
        ? { ...state, tags: state.tags.has(action.tag) ? state.tags.delete(action.tag) : state.tags.add(action.tag) }
        : { ...DEFAULT_FILTER, tags: OrderedSet([action.tag]), showDeprecated: state.showDeprecated };
    }
    case 'clear-filters': {
      return { ...DEFAULT_FILTER, showDeprecated: state.showDeprecated };
    }
    case 'set-similar': {
      return { type: 'similar', key: action.key, title: action.title, showDeprecated: state.showDeprecated  };
    }
    case 'toggle-show-deprecated': {
      return { ...state, showDeprecated: !state.showDeprecated };
    }
  }
}
