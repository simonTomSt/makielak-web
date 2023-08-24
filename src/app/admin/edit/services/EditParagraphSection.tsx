'use client';
import { saveContent } from '@/api/spa';
import {
  Button,
  Card,
  ContentEditor,
  Form,
  Spinner,
  Typography,
  toast,
} from '@/components';
import { t } from '@/translations';
import { ContentKey, useMutation } from '@/utils';

type EditParagraphSectionProps = {
  title: string;
  initialContent: string;
  contentKey: ContentKey;
};

type FormValues = {
  content: string;
};

const EditParagraphSection = ({
  title,
  contentKey,
  initialContent,
}: EditParagraphSectionProps) => {
  const { mutate, loading } = useMutation({
    onSuccess: () => toast.success(t.admin.edit.saved_successfully),
    onError: () => toast.error(t.admin.edit.could_not_save),
  });

  const handleSave = ({ content }: FormValues) => {
    mutate(() => saveContent(contentKey, content));
  };

  return (
    <Card className='p-5 mb-5'>
      <Typography color='blue' variant='h5' className='mb-2'>
        {title}
      </Typography>

      <Form<FormValues> onSubmit={handleSave}>
        <ContentEditor name='content' initialValue={initialContent} />
        <Button type='submit' className='mt-4' disabled={loading}>
          {loading ? <Spinner /> : t.admin.edit.save}
        </Button>
      </Form>
    </Card>
  );
};

export default EditParagraphSection;
