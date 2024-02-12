import s from './Stats.module.scss';
import { AppInfo } from '~/lib/api/apps.ts';

type Props = Pick<AppInfo, 'difficulty' | 'time' | 'yt' | 'gh' | 'lastModified'>

export const Stats = ({ difficulty, time, yt, gh, lastModified }: Props) =>
  <div className={s.stats}>
    <div>
      <div className={s.statDate}>{timeAgo(lastModified)}</div>
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

// https://stackoverflow.com/a/3177838
const timeAgo = (date: Date) => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  return (
    (seconds / 31536000 > 1)
      ? Math.floor(seconds / 31536000) + " years ago" :
    (seconds / 2592000 > 1)
      ? Math.floor(seconds / 2592000) + " months ago" :
    (seconds / 86400 > 1)
      ? Math.floor(seconds / 86400) + " days ago" :
    (seconds / 3600 > 1)
      ? Math.floor(seconds / 3600) + " hours ago" :
    (seconds / 60 > 1)
      ? Math.floor(seconds / 60) + " minutes ago" :
      Math.floor(seconds) + " seconds ago"
  );
}
