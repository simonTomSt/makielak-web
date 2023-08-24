import dynamic from 'next/dynamic';
import { RowType } from '@/api';
import { getImageById } from '@/api/ssr';

const EditCategoryForm = dynamic(() => import('./EditCategoryForm'), {
  ssr: true,
});
const CategoryItemAccordion = dynamic(() => import('./CategoryItemAccordion'), {
  ssr: true,
});

type CategoryItemProps = {
  category: RowType<'categories'>;
};

const CategoryItem = async ({ category }: CategoryItemProps) => {
  const thumbImage = await getImageById(category.thumb_image || '');

  return (
    <CategoryItemAccordion category={category}>
      <EditCategoryForm category={category} categoryThumbImage={thumbImage} />
    </CategoryItemAccordion>
  );
};

export default CategoryItem;
