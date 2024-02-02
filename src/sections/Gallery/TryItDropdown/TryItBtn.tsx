import s from './TryItBtn.module.scss';
import { AppLinks } from '~/lib/api/apps.ts';
import { TryItDropdown } from '~/sections/Gallery/TryItDropdown/TryItDropdown.tsx';
import { useState } from 'react';

interface Props {
  links: AppLinks
}

export const TryItBtn = ({ links }: Props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return <button className={s.tryItNow} onFocus={() => setDropdownOpen(true)} onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setDropdownOpen(false)}>
    {dropdownOpen && <TryItDropdown links={links}/>}
    Try It Now
  </button>;
}
