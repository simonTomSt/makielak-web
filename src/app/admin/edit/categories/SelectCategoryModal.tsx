'use client';
import { RowType } from '@/api';
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogProps,
  List,
  ListItem,
} from '@/components';
import { t } from '@/translations';

type SelectCategoryModalProps = {
  categories: RowType<'categories'>[];
  onCategorySelect: (category: RowType<'categories'>) => void;
} & Pick<DialogProps, 'open' | 'handler'>;

export const SelectCategoryModal = ({
  categories,
  onCategorySelect,
  handler,
  ...rest
}: SelectCategoryModalProps) => {
  return (
    <Dialog handler={handler} {...rest}>
      <DialogHeader>
        {t.admin.edit.categories.delete_category_confirmation}
      </DialogHeader>
      <DialogBody>
        <List>
          {categories?.map((category) => (
            <ListItem
              key={category.id}
              onClick={() => onCategorySelect(category)}
            >
              {category.name}
            </ListItem>
          ))}
        </List>
      </DialogBody>
      <DialogFooter>
        <Button
          variant='text'
          onClick={() => {
            handler(false);
          }}
          className='mr-1'
        >
          <span>{t.admin.edit.save}</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};
