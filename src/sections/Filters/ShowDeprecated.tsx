import s from './ShowDeprecated.module.scss';
import clsx from 'clsx';
import { UseFilter } from '~/lib/filter.ts';

export const ShowDeprecated = ({ filter, filterDispatch }: UseFilter) => {
  const shown = filter.showDeprecated;

  return <button
    className={clsx(s.btn, shown && s.btnActivated)}
    onClick={() => filterDispatch({ type: 'toggle-show-deprecated' })}
    aria-label={shown ? 'Hide deprecated applications' : 'Show deprecated applications'}
  >
    {shown ? 'Hide' : 'Show'} Deprecated
  </button>;
}
