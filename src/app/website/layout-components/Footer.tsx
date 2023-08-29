import waveIcon from '@/assets/images/footer/footer-wave.svg';
import { Logo, Typography } from '@/components';
import { t } from '@/translations';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/solid';
import { ContentKey, Routes } from '@/utils';
import Link from 'next/link';

type FooterProps = {
  title: string;
  email: string;
  phone: string;
  address: string;
};

const Footer = ({ title, email, phone, address }: FooterProps) => {
  const contactItems = [
    {
      id: ContentKey.FooterEmail,
      content: email,
      Icon: EnvelopeIcon,
    },
    {
      id: ContentKey.FooterPhone,
      content: phone,
      Icon: PhoneIcon,
    },
    {
      id: ContentKey.FooterAddress,
      content: address,
      Icon: MapPinIcon,
    },
  ];

  return (
    <footer className='w-full bg-brand-purple-dark text-gray-400 relative'>
      <Image
        src={waveIcon}
        alt='Footer wave'
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          right: 0,
          width: '100%',
          height: 'auto',
          transform: 'translateY(-99%)',
        }}
      />

      <div className='pb-1.5 pt-12 container mx-auto'>
        <div className='flex flex-col items-center justify-center w-full max-w-[364px] sm:max-w-[100%] mx-auto text-center'>
          <Logo variant='pink' size='l' />
          <Typography variant='h4' className='pb-8'>
            <ReactMarkdown>{title}</ReactMarkdown>
          </Typography>
        </div>
        <div className='flex flex-col md:flex-row mx-auto justify-center items-center mt-[30px] mb-6'>
          {contactItems.map(({ id, content, Icon }) => (
            <article
              key={id}
              className='flex flex-col items-center justify-center text-center mx-4 w-[250px]'
            >
              <div className='w-[50px] h-[50px] rounded-full border border-[3px] border-brand-pink p-1 flex items-center justify-center mb-4'>
                <Icon width={24} height={24} className='text-brand-pink' />
              </div>
              <Typography as='span'>
                <ReactMarkdown>{content}</ReactMarkdown>
              </Typography>
            </article>
          ))}
        </div>

        <div className='pt-[50px] flex flex-wrap justify-center items-center text-left mb-4'>
          <Link href={Routes.About_Us}>
            <Typography
              variant='small'
              className='hover:text-gray-600 transition transition-colors-300 capitalize-first'
            >
              {t.routes.about_us}
            </Typography>
          </Link>
          <span className='invisible xs:visible mx-2'>•</span>
          <Link href={Routes.Offer}>
            <Typography
              variant='small'
              className='hover:text-gray-600 transition transition-colors-300 capitalize-first'
            >
              {t.routes.offer}
            </Typography>
          </Link>
          <span className='invisible xs:visible mx-2'>•</span>
          <Link href={Routes.Services}>
            <Typography
              variant='small'
              className='hover:text-gray-600 transition transition-colors-300 capitalize-first'
            >
              {t.routes.services}
            </Typography>
          </Link>
          <span className='invisible xs:visible mx-2'>•</span>
          <Link href={Routes.Certificates}>
            <Typography
              variant='small'
              className='hover:text-gray-600 transition transition-colors-300 capitalize-first'
            >
              {t.routes.certificates}
            </Typography>
          </Link>
          <span className='invisible xs:visible mx-2'>•</span>
          <Link href={Routes.Contact}>
            <Typography
              variant='small'
              className='hover:text-gray-600 transition transition-colors-300 capitalize-first'
            >
              {t.routes.contact}
            </Typography>
          </Link>
        </div>
      </div>

      <div className='bg-brand-purple py-[26px] mx-auto text-center border border-brand-purple-light bg-opacity-90'>
        <div className='container mx-auto text-center'>
          <Typography variant='small' className='text-xs'>
            {t.footer.copyright}
          </Typography>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
