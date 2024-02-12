import s from './TryItBtn.module.scss';
import { AppLinks } from '~/lib/api/apps.ts';
import { TryItDropdown } from '~/sections/Gallery/TryItDropdown/TryItDropdown.tsx';
import { useEffect, useRef, useState } from 'react';

interface Props {
  links: AppLinks
}

export const TryItBtn = ({ links }: Props) => {
  const btnRef = useRef<HTMLButtonElement>(null);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const openDropdown = () => setDropdownOpen(true);

  useEffect(() => {
    const closeDropdown = (e: MouseEvent) => {
      if (btnRef.current && !btnRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }

    document.body.addEventListener('click', closeDropdown);
    return () => document.body.removeEventListener('click', closeDropdown);
  }, []);

  return <button className={s.tryItNow} onClick={openDropdown} ref={btnRef}>
    {dropdownOpen && <TryItDropdown links={links}/>}
    <span>Try It Now</span>
  </button>;
}
