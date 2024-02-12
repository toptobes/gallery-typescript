import s from './Card.module.scss';
import { Header } from '~/sections/Gallery/Card/Header.tsx';
import { useEffect, useRef, useState } from 'react';
import { AppInfo } from '~/lib/api/apps.ts';
import { Similar } from '~/sections/Gallery/Card/Similar.tsx';
import clsx from 'clsx';
import { FoundIn } from '~/sections/Gallery/Card/FoundIn.tsx';
import { UseFilter } from '~/lib/filter.ts';
import p404 from '~/assets/images/404.webp';
import { Stats } from '~/sections/Gallery/Card/Stats.tsx';
import { LearnMoreBtn } from '~/sections/Gallery/LearnMore/LearnMoreBtn.tsx';
import { Consumer } from '~/lib/prelude.ts';
import { TryItBtn } from '~/sections/Gallery/TryItDropdown/TryItBtn.tsx';

interface Props extends AppInfo, UseFilter {
  showModal: Consumer<AppInfo>,
}

export const Card = ({ filter, filterDispatch, showModal, ...app }: Props) => {
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

  const src = (app.url && inView) ? app.url : p404

  return <article
    aria-label="App card"
    className={clsx(s.card, app.searchField && s.marginTop)}
    ref={ref}
  >
    <img src={src} alt="" className={s.background} rel={src === p404 ? 'preload' : undefined}/>
    <div className={s.overlay}>
      <Header app={app} inView={inView} filterDispatch={filterDispatch} filter={filter}/>
    </div>
    <div className={s.buttons}>
      <LearnMoreBtn showModal={showModal} app={app}/>
      <TryItBtn links={app.links}/>
    </div>
    {inView && <Stats difficulty={app.difficulty} time={app.time} yt={app.yt} gh={app.gh} lastModified={app.lastModified}/>}
    <Similar filterDispatch={filterDispatch} id={app.id} title={app.title}/>
    <FoundIn field={app.searchField}/>
  </article>;
}
