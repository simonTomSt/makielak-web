import dynamic from 'next/dynamic';
import { getAllCategories } from '@/api/ssr';
import { Typography } from '@/components';
import { t } from '@/translations';

import CategoryItem from './CategoryItem';

const CreateCategoryForm = dynamic(() => import('./CreateCategoryForm'), {
  ssr: true,
});

const EditCategories = async () => {
  const { data: categories } = await getAllCategories();

  return (
    <>
      <Typography variant='h2' className='mb-5'>
        {t.admin.edit.categories.title}
      </Typography>

      {categories?.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}

      <CreateCategoryForm />
    </>
  );
};

export default EditCategories;
