import s from './Bubble.module.scss'

interface Props {
  number: number,
  scale?: number
}

export const Bubble = ({ number, scale }: Props) =>
  <em className={s.bubble} style={{ transform: `scale(${scale})` }}>
    {number}
  </em>
