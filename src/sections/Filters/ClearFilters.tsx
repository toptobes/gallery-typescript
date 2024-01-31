import s from './ClearFilters.module.scss';
import { UseFilter } from '~/lib/filter.ts';

export const ClearFilters = ({ filter, filterDispatch }: UseFilter) => {
  const text =
    (filter.type === 'similar')
      ? 'Clear similar' :
    (filter.tags.size > 0 || filter.query)
      ? 'Clear filters'
      : undefined

  if (!text) {
    return null;
  }

  return <button className={s.btn} onClick={() => filterDispatch({ type: 'clear-filters' })}>{text}</button>;
}
