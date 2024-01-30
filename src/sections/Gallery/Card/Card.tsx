import s from './Card.module.scss';
import { CardInfo } from '~/sections/Gallery';
import { Header } from '~/sections/Gallery/Card/Header.tsx';
import { CSSProperties } from 'react';
import { WithSelected } from '~/App.tsx';

export const Card = ({ title, url, tags, selected, setSelected, difficulty, time, yt, gh }: CardInfo & WithSelected) =>
  <article className={s.cardImg} style={{ '--bg-url': `url("${url}")` } as CSSProperties}>
    <div className={s.overlay}>
      <Header title={title} tags={tags} setSelected={setSelected} selected={selected}/>
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
    <button className={s.similar}/>
  </article>
