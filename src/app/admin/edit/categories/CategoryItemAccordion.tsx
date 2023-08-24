'use client';
import { ReactNode, useState } from 'react';
import { RowType } from '@/api';
import { Accordion, AccordionBody, AccordionHeader } from '@/components';

type CategoryItemAccordionProps = {
  children: ReactNode;
  category: RowType<'categories'>;
};

const CategoryItemAccordion = ({
  category,
  children,
}: CategoryItemAccordionProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Accordion
      open={open}
      className='mb-2 rounded-lg border border-blue-gray-100 px-4 bg-white'
    >
      <AccordionHeader onClick={() => setOpen(!open)}>
        {category?.name || ''}
      </AccordionHeader>
      <AccordionBody>{children}</AccordionBody>
    </Accordion>
  );
};

export default CategoryItemAccordion;
