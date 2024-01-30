import s from './Header.module.scss'
import { Set } from 'immutable'
import { Bubble } from '~/lib/components/Bubble';
import { WithFilter } from '~/App.tsx';

interface Props extends Pick<WithFilter, 'filter'> {
  numApps: number,
}

export const Header = ({ filter, numApps }: Props) =>
  <header className={s.header}>
    <h2 className={s.h2}>{
      (filter.type === 'similar')
        ? `Similar to '${filter.title}'` :
      (filter.tags.isEmpty())
        ? 'All applications'
        : `Apps with filter ${filter.tags.join(', ')}`
    }</h2>
    <Bubble number={numApps}/>
  </header>
