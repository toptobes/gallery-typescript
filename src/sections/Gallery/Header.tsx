import s from './Header.module.scss'
import { Set } from 'immutable'

interface Props {
  selected: Set<string>,
  numApps: number,
}

export const Header = ({ selected, numApps }: Props) =>
  <header className={s.header}>
    <h1 className={s.h1}>{
      selected.isEmpty()
        ? 'All applications'
        : `Apps with filter ${selected.join(', ')}`
    }</h1>
    <span className={s.numApps}>{numApps}</span>
  </header>
