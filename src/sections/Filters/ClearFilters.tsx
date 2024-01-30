import s from './ClearFilters.module.scss';
import { OrderedSet } from 'immutable';
import { Consumer } from '~/lib/prelude.ts';
import { WithFilter } from '~/App.tsx';

export const ClearFilters = ({ filter, setFilter }: WithFilter) => {
  const text =
    (filter.type === 'similar')
      ? 'Clear similar' :
    (filter.type === 'tags' && filter.tags.size > 0)
      ? 'Clear filters'
      : undefined

  if (!text) {
    return null;
  }

  return <button className={s.btn} onClick={() => setFilter({ type: 'tags', tags: OrderedSet() })}>{text}</button>;
}
