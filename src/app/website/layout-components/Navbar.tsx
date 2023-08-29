'use client';
import React, { Fragment } from 'react';
import {
  Navbar as MUINavbar,
  Collapse,
  Typography,
  IconButton,
} from '@/components';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Routes } from '@/utils';
import { t } from '@/translations';
import Link from 'next/link';

const navItems = [
  {
    href: Routes.About_Us,
    name: t.routes.about_us,
  },
];

const NavList = () => {
  return (
    <ul className='my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6'>
      {navItems.map(({ href, name }) => (
        <Fragment key={href}>
          <Link href={href}>
            <Typography
              as='li'
              variant='small'
              color='blue-gray'
              className='p-1 font-medium'
            >
              {name}
            </Typography>
          </Link>
        </Fragment>
      ))}
    </ul>
  );
};

const Navbar = () => {
  const [openNav, setOpenNav] = React.useState(false);

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  React.useEffect(() => {
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <MUINavbar className='mx-auto max-w-screen-xl px-6 py-3'>
      <div className='flex items-center justify-between text-blue-gray-900'>
        <Typography
          as='a'
          href='#'
          variant='h6'
          className='mr-4 cursor-pointer py-1.5'
        >
          Material Tailwind
        </Typography>
        <div className='hidden lg:block'>
          <NavList />
        </div>
        <IconButton
          variant='text'
          className='ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden'
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className='h-6 w-6' strokeWidth={2} />
          ) : (
            <Bars3Icon className='h-6 w-6' strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
      </Collapse>
    </MUINavbar>
  );
};

export default Navbar;
