import dynamic from 'next/dynamic';
import { getAllContents } from '@/api/ssr';
import { Typography } from '@/components';
import { t } from '@/translations';
import { transformContentsData } from '@/utils';

const EditContactForm = dynamic(() => import('./EditContactForm'), {
  ssr: true,
});

const EditFooter = async () => {
  const { data: contentData } = await getAllContents();
  const content = transformContentsData(contentData);

  return (
    <>
      <Typography variant='h2' className='mb-5'>
        {t.admin.edit.contact.title}
      </Typography>

      <EditContactForm contentData={content} />
    </>
  );
};

export default EditFooter;
