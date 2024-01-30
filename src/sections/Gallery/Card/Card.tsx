import s from './Card.module.scss';
import { Header } from '~/sections/Gallery/Card/Header.tsx';
import { CSSProperties, useEffect, useRef, useState } from 'react';
import { WithFilter } from '~/App.tsx';
import { CardInfo } from '~/lib/api/apps.ts';
import { Similar } from '~/sections/Gallery/Card/Similar.tsx';

export const Card = ({ id, title, url, tags, filter, setFilter, difficulty, time, yt, gh }: CardInfo & WithFilter) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        observer.unobserve(ref.current!);
        console.log('loading ', title);
        setInView(true);
      }
    });
    observer.observe(ref.current!);

    return () => observer.disconnect();
  }, []);

  return <article className={inView ? s.cardImg : s.cardImgLazy} style={{ '--bg-url': `url("${url}")` } as CSSProperties} ref={ref}>
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
  </article>;
}
