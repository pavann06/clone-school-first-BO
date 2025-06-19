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
       

          // {
          //   title: 'edutainment',
          //   path: paths.dashboard.edutainment.root,
          //   icon: ICONS.contact,
          //   // children: [
          //   //   { title: 'list', path: paths.dashboard.edutainment.root },
          //   //   { title: 'create', path: paths.dashboard.edutainment.new },
          //   // ],
          // },
        


          // {
          //   title: 'polls',
          //   path: paths.dashboard.polls.root,
          //   icon: ICONS.contact,
          //   // children: [
          //   //   { title: 'list', path: paths.dashboard.polls.root },
          //   //   { title: 'create', path: paths.dashboard.polls.new },
          //   // ],
          // },

         

          // {
          //   title: 'banner',
          //   path: paths.dashboard.banner.root,
          //   icon: ICONS.contact,
          //   // children: [
          //   //   { title: 'list', path: paths.dashboard.banner.root },
          //   //    { title: 'create', path: paths.dashboard.banner.new },
          //   // ],
          // },


          
     
          

         
          // {
          //   title: 'Business',
          //   path: paths.dashboard.listings.root,
          //   icon: ICONS.contact,
          //   children: [
          //     {
          //       title: 'Listings',
          //       path: paths.dashboard.listings.root,
          //       // children: [
          //       //   { title: 'List', path: paths.dashboard.listings.root },
          //       //   { title: 'Create', path: paths.dashboard.listings.new },
          //       // ],
          //     },
          //     {
          //       title: 'Business Categories',
          //       path: paths.dashboard.business_categories.root,
          //       // children: [
          //       //   { title: 'List', path: paths.dashboard.business_categories.root },
          //       //   { title: 'Create', path: paths.dashboard.business_categories.new },
          //       // ],
          //     },
          //   ],
          // },
          

          
          {
            title: 'schools',
            path: paths.dashboard.schools.root,
            icon: ICONS.contact,
         
          },

             {
            title: 'Grades',
            path: paths.dashboard.grades.root,
            icon: ICONS.contact,
         
          },



           

           
         

          {
            title: 'Students',
            path: paths.dashboard.students.root,
            icon: ICONS.contact,
            // children: [
            //   { title: 'list', path: paths.dashboard.students.root },
            //    { title: 'create', path: paths.dashboard.students.new },
            // ],
          },

             {
            title: 'edutainment',
            path: paths.dashboard.edutainment.root,
            icon: ICONS.contact,
            // children: [
            //   { title: 'list', path: paths.dashboard.edutainment.root },
            //   { title: 'create', path: paths.dashboard.edutainment.new },
            // ],
          },


               {
            title: 'News',
            path: paths.dashboard.news.root,
            icon: ICONS.contact,
            children: [
              {
                title: 'News',
                path: paths.dashboard.news.root,
                // children: [
                //   { title: 'List', path: paths.dashboard.news.root },
                //   { title: 'Create', path: paths.dashboard.news.new },
                // ],
              },
              {
                title: 'News Categories',
                path: paths.dashboard.categories.root,
                // children: [
                //   { title: 'List', path: paths.dashboard.categories.root },
                //   { title: 'Create', path: paths.dashboard.categories.new },
                // ],
              },
            ],
          },

              {
            title: 'calender',
            path: paths.dashboard.calender.root,
            icon: ICONS.contact,
            
          },

              {
            title: 'Offine Courses',
            path: paths.dashboard.offlinecourse.root,
            icon: ICONS.contact,
            children: [
              {
                title: 'Offline Courses',
                path: paths.dashboard.offlinecourse.root,
                // children: [
                //   { title: 'List', path: paths.dashboard.offlinecourse.root },
                //   { title: 'Create', path: paths.dashboard.offlinecourse.new },
                // ],
              },
              {
                title: 'Host',
                path: paths.dashboard.host.root,
              // children: [
                //   { title: 'List', path: paths.dashboard.host.root },
                //   { title: 'Create', path: paths.dashboard.host.new },
                // ],
              },
              {
                title: 'Webinar',
                path: paths.dashboard.webinar.root,
                
              },
            ],
          },

            {
            title: 'Online Courses',
            path: paths.dashboard.onlinecourses.root,
            icon: ICONS.contact,
           
          },

                {
            title: 'Vocabee',
            path: paths.dashboard.word.root,
            icon: ICONS.contact,
            children: [
              {
                title: 'Word',
                path: paths.dashboard.word.root,
                // children: [
                //   { title: 'List', path: paths.dashboard.word.root },
                //   { title: 'Create', path: paths.dashboard.word.new },
                  
                // ],
              },
              {
                title: 'Competition',
                path: paths.dashboard.competition.root,
                // children: [
                //   { title: 'List', path: paths.dashboard.competition.root },
                //   { title: 'Create', path: paths.dashboard.competition.new },
                 
                // ],
              },
            ],
          },

             {
            title: 'Gallary',
            path: paths.dashboard.gallary.root,
            icon: ICONS.contact,
           
          },

          
          {
            title: 'Lessons',
            path: paths.dashboard.lessons.root,
            icon: ICONS.contact,
           
          },

             {
            title: 'MCQs',
            path: paths.dashboard.mcqs.root,
            icon: ICONS.contact,
            
          },

             {
            title: 'banner',
            path: paths.dashboard.banner.root,
            icon: ICONS.contact,
           
          },

             {
            title: 'Events',
            path: paths.dashboard.events.root,
            icon: ICONS.contact,
           
          },

               {
            title: 'School Info',
            path: paths.dashboard.school_info.root,
            icon: ICONS.contact,
           
          },




         


        


       

          
        

       

          


         


          
     


        

        
          
          

          


          

          

          

       
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
