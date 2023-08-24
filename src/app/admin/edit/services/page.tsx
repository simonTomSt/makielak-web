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

const EditParagraphSection = dynamic(() => import('./EditParagraphSection'), {
  ssr: true,
});
const EditImagesSection = dynamic(() => import('./EditImagesSection'), {
  ssr: true,
});

const EditServices = async () => {
  const { data: contentData } = await getAllContents();
  const { data: contentImagesData } = await getAllContentImages();

  const content = transformContentsData(contentData);
  const contentImages = transformContentImagesData(contentImagesData);

  return (
    <>
      <Typography variant='h2' className='mb-5'>
        {t.admin.edit.services.title}
      </Typography>

      <EditParagraphSection
        title={t.admin.edit.services.paragraph_section_title1}
        contentKey={ContentKey.AboutUsSecond}
        initialContent={content[ContentKey.AboutUsSecond]}
      />

      <EditImagesSection
        title={t.admin.edit.services.section_images1}
        contentImages={contentImages}
        imagesKeys={[
          ContentImagesKey.Services1,
          ContentImagesKey.Services2,
          ContentImagesKey.Services3,
          ContentImagesKey.Services4,
        ]}
      />
    </>
  );
};

export default EditServices;
