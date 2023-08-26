'use client';
import { RowType } from '@/api';
import { saveContentImage } from '@/api/spa';
import { Card, ImageUpload, Typography, toast } from '@/components';
import { t } from '@/translations';
import { ContentImagesKey, useMutation } from '@/utils';

type EditImagesSectionProps = {
  title: string;
  contentImages: Record<ContentImagesKey, string>;
  imagesKeys: ContentImagesKey[];
};
const EditImagesSection = ({
  title,
  imagesKeys,
  contentImages,
}: EditImagesSectionProps) => {
  const { mutate: mutateImageUpload } = useMutation({
    onSuccess: () => toast.success(t.admin.edit.saved_successfully),
    onError: () => toast.error(t.admin.edit.could_not_save),
  });

  const handleImageUpload = (
    key: ContentImagesKey,
    uploadedImage: RowType<'images'>
  ) => {
    mutateImageUpload(() => saveContentImage(key, uploadedImage));
  };

  return (
    <Card className='p-5 mb-5'>
      <Typography color='blue' variant='h5' className='mb-2'>
        {title}
      </Typography>

      <div className='flex justify-between'>
        {imagesKeys.map((key, index) => (
          <ImageUpload
            key={key}
            label={`${t.admin.edit.about_us.edit_image} ${index + 1}`}
            initialImage={contentImages[key]}
            onFileSelect={(uploadedImage) =>
              handleImageUpload(key, uploadedImage)
            }
          />
        ))}
      </div>
    </Card>
  );
};

export default EditImagesSection;
