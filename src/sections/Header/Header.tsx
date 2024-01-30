import s from './Header.module.scss';
import { Search } from '~/sections/Header/Search.tsx';

export const Header = () =>
  <header className={s.header}>
    <h1 className={s.h1}>Sample Apps</h1>
    <h4 className={s.h4}>Lenses are quite obviously just the coalgebra for the costate comonad...</h4>
    <Search/>
  </header>
