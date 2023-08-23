'use client';
import {
  ContentEditor,
  Form,
  Button,
  Input,
  FileUpload,
  Typography,
  toast,
  Spinner,
} from '@/components';
import { ContentImagesKey, ContentKey, useMutation } from '@/utils';
import { t } from '@/translations';
import { saveContent, saveContentImage } from '@/api/spa';
import { RowType } from '@/api';

type EditServiceItemFormProps = {
  index: number;
  title: { key: ContentKey; content: string };
  desc: { key: ContentKey; content: string };
  image: { key: ContentImagesKey; url: string };
};

type FormValues = {
  title: string;
  content: string;
};

const EditServiceItemForm = ({
  title,
  desc,
  image,
  index,
}: EditServiceItemFormProps) => {
  const { mutate, loading } = useMutation({
    onSuccess: () => toast.success(t.admin.edit.saved_successfully),
    onError: () => toast.error(t.admin.edit.could_not_save),
  });

  const { mutate: mutateImageUpload } = useMutation({
    onSuccess: () => toast.success(t.admin.edit.saved_successfully),
    onError: () => toast.error(t.admin.edit.could_not_save),
  });

  const handleSave = ({ title: titleContent, content }: FormValues) => {
    mutate(() =>
      Promise.all([
        saveContent(title.key, titleContent),
        saveContent(desc.key, content),
      ])
    );
  };

  const handleImageUpload = (uploadedImage: RowType<'images'>) => {
    mutateImageUpload(() => saveContentImage(image.key, uploadedImage));
  };

  return (
    <div className='mb-10'>
      <hr className='my-2 border-blue-gray-50' />

      <Typography variant='h5' className='mb-1.5'>
        {t.admin.edit.home.services.item_header.replace(
          '{index}',
          (index + 1).toString()
        )}
      </Typography>
      <Form<FormValues> onSubmit={handleSave}>
        <Input
          label={t.admin.edit.home.services.item_title}
          name='title'
          defaultValue={title.content}
        />
        <br />
        <ContentEditor
          name='content'
          initialValue={desc.content}
          height={200}
        />

        <Button type='submit' className='mt-4' disabled={loading}>
          {loading ? <Spinner /> : t.admin.edit.save}
        </Button>
      </Form>

      <FileUpload
        key={index}
        label={t.admin.edit.home.services.item_illustration}
        initialImage={image.url}
        onFileSelect={handleImageUpload}
      />
    </div>
  );
};

export default EditServiceItemForm;
