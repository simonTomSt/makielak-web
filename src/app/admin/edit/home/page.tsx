import { getAllContentImages, getAllContents } from '@/api/ssr';
import { Typography } from '@/components';
import { t } from '@/translations';
import {
  ContentImagesKey,
  ContentKey,
  transformContentImagesData,
  transformContentsData,
} from '@/utils';
import dynamic from 'next/dynamic';

const EditAboutUsSection = dynamic(() => import('./EditAboutUsSection'), {
  ssr: true,
});
const EditWelcomeSection = dynamic(() => import('./EditWelcomeSection'), {
  ssr: true,
});
const EditServicesSection = dynamic(() => import('./EditServicesSection'), {
  ssr: true,
});

const EditHome = async () => {
  const { data: contentData } = await getAllContents();
  const { data: contentImagesData } = await getAllContentImages();

  const content = transformContentsData(contentData);
  const contentImages = transformContentImagesData(contentImagesData);

  const servicesContent = [
    {
      title: {
        key: ContentKey.HomeService1Title,
        content: content[ContentKey.HomeService1Title],
      },
      desc: {
        key: ContentKey.HomeService1,
        content: content[ContentKey.HomeService1],
      },
      image: {
        key: ContentImagesKey.HomeService1,
        url: contentImages?.[ContentImagesKey.HomeService1],
      },
    },
    {
      title: {
        key: ContentKey.HomeService2Title,
        content: content[ContentKey.HomeService2Title],
      },
      desc: {
        key: ContentKey.HomeService2,
        content: content?.[ContentKey.HomeService2],
      },
      image: {
        key: ContentImagesKey.HomeService2,
        url: contentImages?.[ContentImagesKey.HomeService2],
      },
    },
    {
      title: {
        key: ContentKey.HomeService3Title,
        content: content?.[ContentKey.HomeService3Title],
      },
      desc: {
        key: ContentKey.HomeService3,
        content: content[ContentKey.HomeService3],
      },
      image: {
        key: ContentImagesKey.HomeService3,
        url: contentImages?.[ContentImagesKey.HomeService3],
      },
    },
  ];

  return (
    <>
      <Typography variant='h2' className='mb-5'>
        {t.admin.edit.home.title}
      </Typography>
      <EditWelcomeSection initialContent={content[ContentKey.HomeWelcome]} />
      <EditAboutUsSection initialContent={content[ContentKey.HomeAboutUs]} />
      <EditServicesSection contentData={servicesContent} />
    </>
  );
};

export default EditHome;
