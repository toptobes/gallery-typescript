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

  const label =
    (filter.type === 'similar')
      ? 'Clear the similarity search to go back to all applications'
      : 'Clear all filters to go back to all applications'

  return <button
    className={s.btn}
    onClick={() => filterDispatch({ type: 'clear-filters' })}
    aria-label={label}
  >
    {text}
  </button>;
}
