import s from './Stats.module.scss';
import { AppInfo } from '~/lib/api/apps.ts';

type Props = Pick<AppInfo, 'difficulty' | 'time' | 'yt' | 'gh'>

export const Stats = ({ difficulty, time, yt, gh }: Props) =>
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
