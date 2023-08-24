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

const EditAboutUs = async () => {
  const { data: contentData } = await getAllContents();
  const { data: contentImagesData } = await getAllContentImages();

  const content = transformContentsData(contentData);
  const contentImages = transformContentImagesData(contentImagesData);

  return (
    <>
      <Typography variant='h2' className='mb-5'>
        {t.admin.edit.about_us.title}
      </Typography>

      <EditParagraphSection
        title={t.admin.edit.about_us.paragraph_section_title1}
        contentKey={ContentKey.AboutUsFirst}
        initialContent={content[ContentKey.AboutUsFirst]}
      />
      <EditImagesSection
        title={t.admin.edit.about_us.section_images1}
        imagesKeys={[ContentImagesKey.AboutUs1, ContentImagesKey.AboutUs2]}
        contentImages={contentImages}
      />

      <EditParagraphSection
        title={t.admin.edit.about_us.paragraph_section_title2}
        contentKey={ContentKey.AboutUsSecond}
        initialContent={content[ContentKey.AboutUsSecond]}
      />
      <EditImagesSection
        title={t.admin.edit.about_us.section_images2}
        imagesKeys={[ContentImagesKey.AboutUs3, ContentImagesKey.AboutUs4]}
        contentImages={contentImages}
      />
    </>
  );
};

export default EditAboutUs;
