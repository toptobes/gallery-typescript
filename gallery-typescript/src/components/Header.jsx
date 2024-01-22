import { Link } from "react-router-dom";
import * as React from "react";
const navigation = [
  { name: "Home", href: "/" },
  { name: "Workshops", href: "/workshops" },
  { name: "Starter Apps", href: "/starters" },
  { name: "Data Tools", href: "/datatools" },
];

const Header = () => {
  return (
    <header className="z-50 pb-11 lg:pt-11">
      <div className="flex flex-wrap pl-10 items-center sm:justify-between lg:flex-nowrap">
        <div className="hidden space-x-8 lg:block">
          {navigation.map((link) => (
            <Link key={link.href} to={link.href}>
              <button className="inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-sm font-heavy text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                {link.name}
              </button>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
