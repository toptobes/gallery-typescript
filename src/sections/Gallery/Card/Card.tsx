import s from './Card.module.scss';
import { Header } from '~/sections/Gallery/Card/Header.tsx';
import { CSSProperties } from 'react';
import { WithFilter } from '~/App.tsx';
import { CardInfo } from '~/lib/api/apps.ts';
import { Similar } from '~/sections/Gallery/Card/Similar.tsx';

export const Card = ({ id, title, url, tags, filter, setFilter, difficulty, time, yt, gh }: CardInfo & WithFilter) =>
  <article className={s.cardImg} style={{ '--bg-url': `url("${url}")` } as CSSProperties}>
    <div className={s.overlay}>
      <Header title={title} tags={tags} setFilter={setFilter} filter={filter}/>
    </div>
    <div className={s.buttons}>
      <button className={s.learnMore}>Learn More</button>
      <button className={s.tryItNow}>Try It Now</button>
    </div>
    <div className={s.stats}>
      <div>
        <div className={s.statDifficulty}>{difficulty}</div>
        <div className={s.statTime}>{time}</div>
      </div>
      <div>
        {yt && <div className={s.statViews}>{yt.views}</div>}
        {gh && <div className={s.statStars}>{gh.stars}</div>}
      </div>
      <div>
        {yt && <div className={s.statLikes}>{yt.likes}</div>}
        {gh && <div className={s.statForks}>{gh.forks}</div>}
      </div>
    </div>
    <Similar setFilter={setFilter} id={id} title={title}/>
  </article>
