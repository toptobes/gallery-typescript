import s from './Header.module.scss';
import { Search } from '~/sections/Header/Search.tsx';
import { UseFilter } from '~/lib/filter.ts';

export const Header = (props: UseFilter) =>
  <header className={s.header}>
    <h1 className={s.h1}>Sample Apps</h1>
    <h4 className={s.h4}>Lenses are quite obviously just the coalgebra for the costate comonad...</h4>
    <Search {...props}/>
  </header>
