import s from './Bubble.module.scss'

interface Props {
  number: number,
  scale?: number,
  label?: string,
}

export const Bubble = ({ number, scale, label }: Props) =>
  <em className={s.bubble} style={{ transform: `scale(${scale})` }} aria-label={label}>
    {number}
  </em>
