import s from './Header.module.scss'
import { Set } from 'immutable'
import { Bubble } from '~/lib/components/Bubble';

interface Props {
  selected: Set<string>,
  numApps: number,
}

export const Header = ({ selected, numApps }: Props) =>
  <header className={s.header}>
    <h2 className={s.h1}>{
      selected.isEmpty()
        ? 'All applications'
        : `Apps with filter ${selected.join(', ')}`
    }</h2>
    <Bubble number={numApps}/>
  </header>
