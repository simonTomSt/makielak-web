'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ChevronDownIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import { PowerIcon } from '@heroicons/react/24/solid';

import { signOut } from '@/api/spa';
import { t } from '@/translations';
import { Routes, useMutation } from '@/utils';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from '@/components';

import { menuItems } from './sidebar-menu-items';

export default function DashboardSidebar() {
  const [open, setOpen] = useState('');
  const router = useRouter();

  const { mutate } = useMutation({
    onSuccess: () => router.push(Routes.Login),
  });

  const handleLogout = () => {
    mutate(() => signOut());
  };

  const handleOpen = (value: any) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <Card className='fixed h-screen w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5'>
      <div className='mb-2 p-4'>
        <Typography variant='h5' color='blue-gray'>
          {t.dashboard.welcome}
        </Typography>
      </div>
      <List>
        {menuItems.map(({ name, pages, Icon }) => (
          <Accordion
            key={name}
            open={open === name}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${
                  open === name ? 'rotate-180' : ''
                }`}
              />
            }
          >
            <ListItem className='p-0' selected={open === name}>
              <AccordionHeader
                onClick={() => handleOpen(name)}
                className='border-b-0 p-3'
              >
                <ListItemPrefix>
                  <Icon className='h-5 w-5' />
                </ListItemPrefix>
                <Typography color='blue-gray' className='mr-auto font-normal'>
                  {name}
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className='py-1'>
              <List className='p-0'>
                {pages.map(({ name, link }) => (
                  <Link key={name} href={link}>
                    <ListItem>{name}</ListItem>
                  </Link>
                ))}
              </List>
            </AccordionBody>
          </Accordion>
        ))}

        <hr className='my-2 border-blue-gray-50' />
        <Link href={Routes.DashboardHelp}>
          <ListItem onClick={handleLogout}>
            <ListItemPrefix>
              <InformationCircleIcon className='h-5 w-5' />
            </ListItemPrefix>
            {t.dashboard.help}
          </ListItem>
        </Link>
        <ListItem onClick={handleLogout}>
          <ListItemPrefix>
            <PowerIcon className='h-5 w-5' />
          </ListItemPrefix>
          {t.dashboard.log_out}
        </ListItem>
      </List>
    </Card>
  );
}
