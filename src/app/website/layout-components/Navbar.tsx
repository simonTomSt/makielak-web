'use client';
import React, { Fragment, useState } from 'react';
import { Typography, IconButton, Logo } from '@/components';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Routes } from '@/utils';
import { t } from '@/translations';
import Link from 'next/link';
import { motion } from 'framer-motion';

const navItems = [
  {
    href: Routes.About_Us,
    name: t.routes.about_us,
  },
  {
    href: Routes.Offer,
    name: t.routes.offer,
  },
  {
    href: Routes.Services,
    name: t.routes.services,
  },
  {
    href: Routes.Certificates,
    name: t.routes.certificates,
  },
  {
    href: Routes.Contact,
    name: t.routes.contact,
  },
];

const NavList = () => {
  return (
    <ul className='h-full my-2 flex flex-col justify-evenly md:justify-end items-center gap-2 md:mb-0 md:mt-0 md:flex-row md:items-center md:gap-6'>
      {navItems.map(({ href, name }) => (
        <Fragment key={href}>
          <Link href={href}>
            <Typography
              as='li'
              variant='lead'
              color='black'
              className='p-1 text-2xl md:text-xl capitalize-first font-medium'
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
  const [isNavOpen, setIsNavOpen] = useState(false);
  const conditionalNavbarStyles = isNavOpen
    ? 'fixed bg-white'
    : 'bg-transparent static';

  return (
    <>
      <nav
        className={`container mx-auto max-w-screen-xl shadow-none h-[100px] flex items-center justify-between w-full z-50 ${conditionalNavbarStyles}`}
      >
        <div className='flex items-center justify-between w-full'>
          <Logo />
          <div className='hidden md:block'>
            <NavList />
          </div>
          <IconButton
            size='lg'
            variant='text'
            color='gray'
            className='rounded-full md:hidden mt-5 p-8'
            aria-label='menu'
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            {isNavOpen ? (
              <XMarkIcon width={40} height={40} color='black' />
            ) : (
              <Bars3Icon width={40} height={40} color='black' />
            )}
          </IconButton>

          <motion.div
            animate={{ left: isNavOpen ? 0 : '-100%' }}
            className={`fixed -left-full right-0 bottom-0 top-[100px] w-full bg-white z-50 transition transition-all-400 ${
              !isNavOpen && 'hidden left-0'
            }`}
          >
            <NavList />
          </motion.div>
        </div>
      </nav>

      {isNavOpen && <div className='w-full h-[100px]' />}
    </>
  );
};

export default Navbar;
