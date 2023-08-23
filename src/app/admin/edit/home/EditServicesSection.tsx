'use client';
import { t } from '@/translations';
import { ContentImagesKey, ContentKey } from '@/utils';
import EditServiceItemForm from './EditServiceItemForm';
import { Card } from '@material-tailwind/react';
import { Typography } from '@/components';

type EditServicesSectionProps = {
  contentData: {
    title: { key: ContentKey; content: string };
    desc: { key: ContentKey; content: string };
    image: { key: ContentImagesKey; url: string };
  }[];
};

const EditServicesSection = ({ contentData }: EditServicesSectionProps) => {
  return (
    <Card className='p-5 mb-5'>
      <Typography color='blue' variant='h5' className='mb-2'>
        {t.admin.edit.home.services.title}
      </Typography>

      {contentData.map(({ title, desc, image }, index) => (
        <EditServiceItemForm
          key={title.key}
          index={index}
          title={title}
          desc={desc}
          image={image}
        />
      ))}
    </Card>
  );
};

export default EditServicesSection;
