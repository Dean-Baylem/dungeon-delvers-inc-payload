'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import PageTitle from '@/components/ui/typography/PageTitle';
import LoginForm from '@/components/ui/login/LoginForm';

export default function Header() {
  const hamburger = useRef<HTMLButtonElement>(null);
  const sideNav = useRef<HTMLElement>(null);
  const [navOpen, setNavOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setNavOpen(false);
  }, [pathname]);

  const headerGroup = [
    {
      name: 'Home',
      link: '/',
    },
    {
      name: 'Sessions',
      link: '/sessions',
    },
    {
      name: 'Lore',
      link: '/lore',
    },
    {
      name: 'NPCs',
      link: '/npcs',
    },
    {
      name: 'Locations',
      link: '/grand-gazetteer',
    },
  ];

  const handleHamburgerClick = () => {
    const hamburgerButton = hamburger.current;
    if (hamburgerButton) {
      hamburgerButton.setAttribute('aria-expanded', `${!navOpen}`);
      document.body.classList.toggle('overflow-hidden');
      setNavOpen(!navOpen);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full py-4 px-6 bg-[rgba(0,0,0,0.75)] z-50">
        <nav className="flex flex-wrap gap-4 max-w-360 mx-auto items-center justify-center">
          <Link href="/" className="mr-auto duration-150 hover:opacity-80">
            <Image
              src="/common/logo-white.webp"
              alt="Dungeon Delvers Inc. - Where Adventures Begin"
              width="200"
              height="75"
              loading="lazy"
              className="h-8 md:h-10 lg:h-14 w-auto"
            />
          </Link>
          <ul className="flex gap-4">
            {headerGroup.map((link, index) => (
              <li key={`header-link-${link.name}-${index}`} className="hidden md:block">
                <Link
                  href={link.link}
                  className={`font-heading font-medium text-lg text-white hover:text-heading hover:brightness-200 duration-150`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li className="hidden md:block relative">
              <button
                className={`font-heading font-medium text-lg text-white hover:text-heading hover:brightness-200 duration-150`}
                onClick={() => {
                  setLoginOpen(true);
                }}
              >
                Login
              </button>
            </li>
          </ul>
          <button
            className="relative md:hidden h-4 w-6"
            ref={hamburger}
            onClick={handleHamburgerClick}
            aria-expanded="false"
            aria-controls="side-nav"
          >
            <span
              className={`h-0.5 w-full bg-white duration-150 absolute top-0 left-0 origin-left ${navOpen ? 'rotate-35' : ''} ${navOpen ? 'translate-y-0.5' : ''}`}
            ></span>
            <span
              className={`h-0.5 w-full bg-white duration-150 absolute top-1/2 left-0 ${navOpen ? 'opacity-0' : ''}`}
            ></span>
            <span
              className={`h-0.5 w-full bg-white duration-150 absolute top-full left-0 origin-left ${navOpen ? '-rotate-35' : ''}`}
            ></span>
          </button>
        </nav>
      </header>
      <nav
        ref={sideNav}
        id={'side-nav'}
        className={`fixed h-full py-20 bg-[rgba(0,0,0,0.9)] top-0 left-0 w-full z-20 overflow-hidden duration-150 opacity-0 ${navOpen ? 'opacity-100' : ''} ${navOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        <ul className="h-full overflow-auto flex flex-col gap-6 items-center justify-center">
          {headerGroup.map((link, index) => (
            <li key={`header-link-${link.name}-${index}`}>
              <Link
                href={link.link}
                className={`md:hidden font-heading font-medium text-4xl text-white hover:text-heading hover:brightness-200 duration-150`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <LoginForm
        isOpen={loginOpen}
        onClose={() => {
          setLoginOpen(false);
        }}
      />
    </>
  );
}
