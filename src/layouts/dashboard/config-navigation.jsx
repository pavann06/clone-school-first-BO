import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { paths } from 'src/routes/paths';

import { selectUser } from 'src/redux/auth/selectors';

import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
  // OR
  // <Iconify icon="fluent:mail-24-filled" />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
);

const ICONS = {
  user: icon('ic_user'),
  lock: icon('ic_lock'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  invoice: icon('ic_invoice'),
  product: icon('ic_product'),
  contact: icon('ic_menu_item'),
  godowns:icon('ic_tour'),
  branches:icon('ic_folder'),
  staff:icon('ic_lock'),
  purchase: icon('ic_ecommerce'),
  sales: icon('ic_external'),
  returns: icon('ic_label'),
  payments:icon('ic_invoice'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

// ----------------------------------------------------------------------

export function useNavData() {

  let userPermissions = useSelector(selectUser);
  userPermissions = userPermissions?.custom_permissions || [];


  const data = useMemo(
    () => {
      const modules = [
      // OVERVIEW
      // ----------------------------------------------------------------------
      {
        subheader: 'overview',
        items: [
          {
            title: 'Dashboard',
            path: paths.dashboard.root,
          
            icon: ICONS.dashboard,
          },

        ],
      },

      // MANAGEMENT
      // ----------------------------------------------------------------------
      {
        subheader: 'management',
        items: [

         
     
          // {
          //   title: 'features',
          //   path: paths.dashboard.features.root,
          //   icon: ICONS.contact,
          //   children: [
          //     { title: 'list', path: paths.dashboard.features.root, permissions: ['is_superuser'] },
          //     { title: 'create', path: paths.dashboard.features.new, permissions: ['is_superuser'] },
          //   ],
          // },

        
      
        
          // {
          //   title: 'hospitals',
          //   path: paths.dashboard.hospitals.root,
          //   icon: ICONS.contact,
          //   children: [
          //     { title: 'list', path: paths.dashboard.hospitals.root, permissions: ['is_superuser'] },
          //     { title: 'create', path: paths.dashboard.hospitals.new, permissions: ['is_superuser'] },
          //     // {title:'view' , path: paths.dashboard.hospitals.view, permissions : ['is_superuser']},
              
          //   ],
          // },


             {
            title: 'edutainment',
            path: paths.dashboard.edutainment.root,
            icon: ICONS.contact,
            children: [
              { title: 'list', path: paths.dashboard.edutainment.root, },
              { title: 'create', path: paths.dashboard.edutainment.new,},
            ],
          },

          {
            title: 'onlinestores',
            path: paths.dashboard.onlinestores.root,
            icon: ICONS.contact,
            children: [
              { title: 'list', path: paths.dashboard.onlinestores.root, },
              { title: 'create', path: paths.dashboard.onlinestores.new,  },
            ],
          },


          // {
          //   title: 'appointments',
          //   path: paths.dashboard.appointments.root,
          //   icon: ICONS.contact,
          //   children: [
          //     { title: 'list', path: paths.dashboard.appointments.root, permissions: ['is_superuser'] },
          //     { title: 'create', path: paths.dashboard.appointments.new, permissions: ['is_superuser'] },
          //   ],
          // },
          // SALES
          // {
          //   title: 'sales',
          //   path: paths.dashboard.sales.root,
          //   icon: ICONS.sales,
          //   children: [
          //     { title: 'list', path: paths.dashboard.sales.root, permissions: ['is_superuser'] },
          //     { title: 'create', path: paths.dashboard.sales.new, permissions: ['is_superuser']},
          //     { title: 'analytics', path: paths.dashboard.sales.analytics, permissions: ['is_superuser'] },
          //   ],
          // },

        ],
      },
    ];

    const filteredModules = modules.map(module => {
      const filteredItems = module.items.reduce((acc, item) => {
        if (!item.permissions || item.permissions.some(permission => userPermissions.includes(permission))) {
          if (!item.children) {
            acc.push(item);
          } else {
            const filteredChildren = item.children.filter(child =>
              !child.permissions || child.permissions.some(permission =>
                userPermissions.includes(permission)
              )
            );
            if (filteredChildren.length > 0) {
              acc.push({ ...item, children: filteredChildren });
            }
          }
        }
        return acc;
      }, []);

      return {
        ...module,
        items: filteredItems,
      };
    }).filter(module => module.items.length > 0);

    return filteredModules;
  }, [userPermissions]);

  return data;
}
