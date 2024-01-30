import s from './ClearFilters.module.scss';
import { OrderedSet } from 'immutable';
import { Consumer } from '~/lib/prelude.ts';

interface Props {
  setSelected: Consumer<OrderedSet<string>>
}

export const ClearFilters = ({ setSelected }: Props) =>
  <button className={s.btn} onClick={() => setSelected(OrderedSet())}>Clear Filters</button>
