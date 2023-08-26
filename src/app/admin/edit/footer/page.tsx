import dynamic from 'next/dynamic';
import { getAllContents } from '@/api/ssr';
import { Typography } from '@/components';
import { t } from '@/translations';
import { transformContentsData } from '@/utils';

const EditFooterForm = dynamic(() => import('./EditFooterForm'), {
  ssr: true,
});

const EditFooter = async () => {
  const { data: contentData } = await getAllContents();
  const content = transformContentsData(contentData);

  return (
    <>
      <Typography variant='h2' className='mb-5'>
        {t.admin.edit.footer.title}
      </Typography>

      <EditFooterForm contentData={content} />
    </>
  );
};

export default EditFooter;
