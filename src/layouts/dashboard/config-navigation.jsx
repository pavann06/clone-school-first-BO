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
  godowns: icon('ic_tour'),
  branches: icon('ic_folder'),
  staff: icon('ic_lock'),
  purchase: icon('ic_ecommerce'),
  sales: icon('ic_external'),
  returns: icon('ic_label'),
  payments: icon('ic_invoice'),
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

  const data = useMemo(() => {
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
       

          {
            title: 'edutainment',
            path: paths.dashboard.edutainment.root,
            icon: ICONS.contact,
            children: [
              { title: 'list', path: paths.dashboard.edutainment.root },
              { title: 'create', path: paths.dashboard.edutainment.new },
            ],
          },
        

         

          {
            title: 'calender',
            path: paths.dashboard.calender.root,
            icon: ICONS.contact,
            children: [
              { title: 'list', path: paths.dashboard.calender.root },
              { title: 'create', path: paths.dashboard.calender.new },
            ],
          },

          {
            title: 'polls',
            path: paths.dashboard.polls.root,
            icon: ICONS.contact,
            children: [
              { title: 'list', path: paths.dashboard.polls.root },
              { title: 'create', path: paths.dashboard.polls.new },
            ],
          },

          {
            title: 'survey',
            path: paths.dashboard.survey.root,
            icon: ICONS.contact,
            children: [
              { title: 'list', path: paths.dashboard.survey.root },
              { title: 'create', path: paths.dashboard.survey.new },
            ],
          },
          // {
          //   title: 'subscribed Users',
          //   path: paths.dashboard.subscribedusers.root,
          //   icon: ICONS.contact,
          //   children: [
          //     { title: 'list', path: paths.dashboard.subscribedusers.root },
          //     // { title: 'create', path: paths.dashboard.edutainment.new },
          //   ],
          // },

          // {
          //   title: 'Surveys',
          //   path: paths.dashboard.surveys.root,
          //   icon: ICONS.contact,
          //   children: [
          //     { title: 'list', path: paths.dashboard.surveys.root },
          //      { title: 'create', path: paths.dashboard.surveys.new },
          //   ],
          // },


          {
            title: 'banner',
            path: paths.dashboard.banner.root,
            icon: ICONS.contact,
            children: [
              { title: 'list', path: paths.dashboard.banner.root },
               { title: 'create', path: paths.dashboard.banner.new },
            ],
          },


          // {
          //   title: 'news',
          //   path: paths.dashboard.news.root,
          //   icon: ICONS.contact,
          //   children: [
          //     { title: 'list', path: paths.dashboard.news.root },
          //      { title: 'create', path: paths.dashboard.news.new },
          //   ],
          // },

          // {
          //   title: 'news categories',
          //   path: paths.dashboard.categories.root,
          //   icon: ICONS.contact,
          //   children: [
          //     { title: 'list', path: paths.dashboard.categories.root },
          //      { title: 'create', path: paths.dashboard.categories.new },
          //   ],
          // },
          {
            title: 'News',
            path: paths.dashboard.news.root,
            icon: ICONS.contact,
            children: [
              {
                title: 'News',
                path: paths.dashboard.news.root,
                children: [
                  { title: 'List', path: paths.dashboard.news.root },
                  { title: 'Create', path: paths.dashboard.news.new },
                ],
              },
              {
                title: 'News Categories',
                path: paths.dashboard.categories.root,
                children: [
                  { title: 'List', path: paths.dashboard.categories.root },
                  { title: 'Create', path: paths.dashboard.categories.new },
                ],
              },
            ],
          },
          

          // {
          //   title: 'listings',
          //   path: paths.dashboard.listings.root,
          //   icon: ICONS.contact,
          //   children: [
          //     { title: 'list', path: paths.dashboard.listings.root },
          //      { title: 'create', path: paths.dashboard.listings.new },
          //   ],
          // },

          // {
          //   title: 'Business Categories',
          //   path: paths.dashboard.business_categories.root,
          //   icon: ICONS.contact,
          //   children: [
          //     { title: 'list', path: paths.dashboard.business_categories.root },
          //      { title: 'create', path: paths.dashboard.business_categories.new },
          //   ],
          // },
          {
            title: 'Business',
            path: paths.dashboard.listings.root,
            icon: ICONS.contact,
            children: [
              {
                title: 'Listings',
                path: paths.dashboard.listings.root,
                children: [
                  { title: 'List', path: paths.dashboard.listings.root },
                  { title: 'Create', path: paths.dashboard.listings.new },
                ],
              },
              {
                title: 'Business Categories',
                path: paths.dashboard.listings.root,
                children: [
                  { title: 'List', path: paths.dashboard.business_categories.root },
                  { title: 'Create', path: paths.dashboard.business_categories.new },
                ],
              },
            ],
          },
          

          {
            title: 'forums',
            path: paths.dashboard.groups.root,
            icon: ICONS.contact,
            children: [
              { title: 'list', path: paths.dashboard.groups.root },
               { title: 'create', path: paths.dashboard.groups.new },
            ],
          },

          // {
          //   title: 'Forum Feeds',
          //   path: paths.dashboard.forum_feeds.root,
          //   icon: ICONS.contact,
          //   children: [
          //     { title: 'list', path: paths.dashboard.forum_feeds.root },
          //      { title: 'create', path: paths.dashboard.forum_feeds.new },
          //   ],
          // },

          {
            title: 'schools',
            path: paths.dashboard.schools.root,
            icon: ICONS.contact,
            children: [
              { title: 'list', path: paths.dashboard.schools.root },
               { title: 'create', path: paths.dashboard.schools.new },
            ],
          },


          {
            title: 'Students',
            path: paths.dashboard.students.root,
            icon: ICONS.contact,
            children: [
              { title: 'list', path: paths.dashboard.students.root },
               { title: 'create', path: paths.dashboard.students.new },
            ],
          },



          // {
          //   title: 'Online Store Categories',
          //   path: paths.dashboard.onlinecategories.root,
          //   icon: ICONS.contact,
          //   children: [
          //     { title: 'list', path: paths.dashboard.onlinecategories.root },
          //      { title: 'create', path: paths.dashboard.onlinecategories.new },
          //   ],
          // },

          // {
          //   title: 'Online Store Products',
          //   path: paths.dashboard.onlinestoreproducts.root,
          //   icon: ICONS.contact,
          //   children: [
          //     { title: 'list', path: paths.dashboard.onlinestoreproducts.root },
          //      { title: 'create', path: paths.dashboard.onlinestoreproducts.new },
          //   ],
          // },

          // {
          //   title: 'Online Orders',
          //   path: paths.dashboard.onlineorders.root,
          //   icon: ICONS.contact,
          //   children: [
          //     { title: 'list', path: paths.dashboard.onlineorders.root },
          //     //  { title: 'create', path: paths.dashboard.onlineorders.new },
          //   ],
          // },

          {
            title: 'Online',
            path: paths.dashboard.onlinecategories.root,
            icon: ICONS.contact,
            children: [
              {
                title: 'Store Categories',
                path: paths.dashboard.onlinecategories.root,
                children: [
                  { title: 'List', path: paths.dashboard.onlinecategories.root },
                  { title: 'Create', path: paths.dashboard.onlinecategories.new },
                ],
              },
              {
                title: 'Store Products',
                path: paths.dashboard.onlinestoreproducts.root,
                children: [
                  { title: 'List', path: paths.dashboard.onlinestoreproducts.root },
                  { title: 'Create', path: paths.dashboard.onlinestoreproducts.new },
                ],
              },
              {
                title: 'Orders',
                path: paths.dashboard.onlineorders.root,
                children: [
                  { title: 'List', path: paths.dashboard.onlineorders.root },
                ],
              },
            ],
          },
          




          // {
          //   title: 'Vocabee',
          //   path: paths.dashboard.word.root,
          //   icon: ICONS.contact,
          //   children: [
          //     { title: 'list', path: paths.dashboard.word.root },
          //      { title: 'create', path: paths.dashboard.word.new },
          //   ],
          // },


          {
            title: 'Vocabee',
            path: paths.dashboard.word.root,
            icon: ICONS.contact,
            children: [
              {
                title: 'Word',
                path: paths.dashboard.word.root,
                children: [
                  { title: 'List', path: paths.dashboard.word.root },
                  { title: 'Create', path: paths.dashboard.word.new },
                  
                ],
              },
              {
                title: 'Competition',
                path: paths.dashboard.competition.root,
                children: [
                  { title: 'List', path: paths.dashboard.competition.root },
                  { title: 'Create', path: paths.dashboard.competition.new },
                 
                ],
              },
            ],
          }
          

          


          

          

          

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

    const filteredModules = modules
      .map((module) => {
        const filteredItems = module.items.reduce((acc, item) => {
          if (
            !item.permissions ||
            item.permissions.some((permission) => userPermissions.includes(permission))
          ) {
            if (!item.children) {
              acc.push(item);
            } else {
              const filteredChildren = item.children.filter(
                (child) =>
                  !child.permissions ||
                  child.permissions.some((permission) => userPermissions.includes(permission))
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
      })
      .filter((module) => module.items.length > 0);

    return filteredModules;
  }, [userPermissions]);

  return data;
}
