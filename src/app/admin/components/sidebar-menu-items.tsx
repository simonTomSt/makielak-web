import { PencilSquareIcon, ShoppingBagIcon } from '@heroicons/react/24/solid';
import { t } from '@/translations';
import { Routes } from '@/utils';
import EditCategories from '../edit/categories/page';

export const menuItems = [
  {
    name: t.routes.dashboard.pages_edit,
    Icon: PencilSquareIcon,
    pages: [
      { name: t.routes.dashboard.edit_home, link: Routes.EditHomePage },
      { name: t.routes.dashboard.edit_contact, link: Routes.EditContactPage },
    ],
  },
  {
    name: t.routes.dashboard.edit_offer,
    Icon: ShoppingBagIcon,
    pages: [
      { name: t.routes.dashboard.categories, link: Routes.EditCategories },
      { name: t.routes.dashboard.products, link: Routes.EditProducts },
    ],
  },
];
