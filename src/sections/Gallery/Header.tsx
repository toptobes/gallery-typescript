import s from './Header.module.scss'
import { Bubble } from '~/lib/components/Bubble';
import { UseFilter } from '~/lib/filter.ts';

interface Props extends Pick<UseFilter, 'filter'> {
  numApps: number,
}

export const Header = ({ filter, numApps }: Props) =>
  <header className={s.header}>
    <h2 className={s.h2}>{
      (filter.type === 'similar')
        ? `Similar to '${filter.title}'` :
      (filter.tags.isEmpty())
        ? ('All applications' + matchStr(filter.query))
        : `Apps${matchStr(filter.query)} with tag${filter.tags.size > 1 ? 's' : ''} ${filter.tags.map(tag => `'${tag}'`).join(', ').replace(/, ([^,]*)$/, ' or $1')}`
    }</h2>
    <Bubble number={numApps}/>
  </header>

const matchStr = (query: string) => (query ? ` matching '${query}'` : '')
