import s from './Search.module.scss';

export const Search = () =>
  <search>
    <form className={s.form}>
      <div className={s.searchContainer}>
        <i className={s.searchIcon}/>
        <input id={s.searchInput} type="text" placeholder="Search Sample Apps"/>
      </div>
      <button className={s.button}>Search</button>
    </form>
  </search>
