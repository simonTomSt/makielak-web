import { PencilSquareIcon, ShoppingBagIcon } from '@heroicons/react/24/solid';
import { t } from '@/translations';
import { Routes } from '@/utils';

export const menuItems = [
  {
    name: t.routes.dashboard.pages_edit,
    Icon: PencilSquareIcon,
    pages: [
      { name: t.routes.dashboard.edit_home, link: Routes.EditHomePage },
      { name: t.routes.dashboard.edit_about_us, link: Routes.EditAbutUsPage },
      { name: t.routes.dashboard.edit_services, link: Routes.EditServicesPage },
      {
        name: t.routes.dashboard.edit_certificates,
        link: Routes.EditCertificatesPage,
      },
      { name: t.routes.dashboard.edit_contact, link: Routes.EditContactPage },
      { name: t.routes.dashboard.edit_footer, link: Routes.EditFooter },
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
