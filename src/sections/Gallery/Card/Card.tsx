import s from './Card.module.scss';
import { Header } from '~/sections/Gallery/Card/Header.tsx';
import { CSSProperties, useEffect, useRef, useState } from 'react';
import { AppInfo } from '~/lib/api/apps.ts';
import { Similar } from '~/sections/Gallery/Card/Similar.tsx';
import clsx from 'clsx';
import { FoundIn } from '~/sections/Gallery/Card/FoundIn.tsx';
import { UseFilter } from '~/lib/filter.ts';
import p404 from '~/assets/images/404.webp';

export const Card = ({ id, title, url, tags, difficulty, time, yt, gh, searchField, filter, filterDispatch }: AppInfo & UseFilter) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        observer.unobserve(ref.current!);
        setInView(true);
      }
    });

    observer.observe(ref.current!);

    return () => observer.disconnect();
  }, []);

  const src = (url && inView) ? url : p404

  return <article
    aria-label="App card"
    className={clsx(s.card, searchField && s.marginTop)}
    ref={ref}
  >
    <img src={src} alt="" className={s.background} rel={src === p404 ? 'preload' : undefined}/>
    <div className={s.overlay}>
      <Header title={title} tags={tags} filterDispatch={filterDispatch} filter={filter}/>
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
    <Similar filterDispatch={filterDispatch} id={id} title={title}/>
    <FoundIn field={searchField}/>
  </article>;
}
