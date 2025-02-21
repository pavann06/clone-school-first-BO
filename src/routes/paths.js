import { _id } from 'src/_mock/assets';

// ----------------------------------------------------------------------

const MOCK_ID = _id[1];

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page403: '/403',
  page404: '/404',
  page500: '/500',
  components: '/components',
  docs: 'https://familifirst.com',
  changelog: 'https://familifirst.com',
  zoneUI: 'https://familifirst.com',
  home: 'https://familifirst.com',
  freeUI: 'https://familifirst.com',
  figma: 'https://familifirst.com',
  product: {
    root: `/product`,
    details: (id) => `/product/${id}`,
  },
  // AUTH
  auth: {
    login: `${ROOTS.AUTH}/login`,
    forgotPassword: `${ROOTS.AUTH}/password-forgot`,
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    general: {
      booking: `${ROOTS.DASHBOARD}/booking`,
    },
    user: {
      root: `${ROOTS.DASHBOARD}/user`,
      new: `${ROOTS.DASHBOARD}/user/new`,
      list: `${ROOTS.DASHBOARD}/user/list`,
      cards: `${ROOTS.DASHBOARD}/user/cards`,
      profile: `${ROOTS.DASHBOARD}/user/profile`,
      account: `${ROOTS.DASHBOARD}/user/account`,
      edit: (id) => `${ROOTS.DASHBOARD}/user/${id}/edit`,
      demo: {
        edit: `${ROOTS.DASHBOARD}/user/${MOCK_ID}/edit`,
      },
    },
    product: {
      root: `${ROOTS.DASHBOARD}/product`,
      new: `${ROOTS.DASHBOARD}/product/new`,
      details: (id) => `${ROOTS.DASHBOARD}/product/${id}`,
      edit: (id) => `${ROOTS.DASHBOARD}/product/${id}/edit`,
      analytics: `${ROOTS.DASHBOARD}/product/analytics`,
    },
    cities: {
      root: `${ROOTS.DASHBOARD}/cities`,
      new: `${ROOTS.DASHBOARD}/cities/new`,
    },
    specialities: {
      root: `${ROOTS.DASHBOARD}/specialities`,
      new: `${ROOTS.DASHBOARD}/specialities/new`,
      edit: (id) => `${ROOTS.DASHBOARD}/specialities/${id}/edit`,
    },
    hospitals: {
      root: `${ROOTS.DASHBOARD}/hospitals`,
      new: `${ROOTS.DASHBOARD}/hospitals/new`,
      edit: (id) => `${ROOTS.DASHBOARD}/hospitals/${id}/edit`,
      view: (id) => `${ROOTS.DASHBOARD}/hospitals/${id}/view`,
    },
    edutainment: {
      root: `${ROOTS.DASHBOARD}/edutainment`,
      new: `${ROOTS.DASHBOARD}/edutainment/new`,
      edit: (id) => `${ROOTS.DASHBOARD}/edutainment/${id}/edit`,
    },

    onlinestores: {
      root: `${ROOTS.DASHBOARD}/onlinestores`,
      new: `${ROOTS.DASHBOARD}/onlinestores/new`,
      // edit: (id) => `${ROOTS.DASHBOARD}/edutainment/${id}/edit`,
    },

    calender: {
      root: `${ROOTS.DASHBOARD}/calender`,
      new: `${ROOTS.DASHBOARD}/calender/new`,
      edit: (id) => `${ROOTS.DASHBOARD}/calender/${id}/edit`,
    },
    subscribedusers: {
      root: `${ROOTS.DASHBOARD}/subscribedusers`,
      // new: `${ROOTS.DASHBOARD}/calender/new`,
      // edit: (id) => `${ROOTS.DASHBOARD}/calender/${id}/edit`,
    },

    // appointments: {
    //   root: `${ROOTS.DASHBOARD}/appointments`,
    //   new: `${ROOTS.DASHBOARD}/appointments/new`,
    //   edit: (id) => `${ROOTS.DASHBOARD}/appointments/${id}/edit`,
    // },

    polls: {
      root: `${ROOTS.DASHBOARD}/polls`,
      new: `${ROOTS.DASHBOARD}/polls/new`,
      edit: (id) => `${ROOTS.DASHBOARD}/polls/${id}/edit`,
    },

    survey: {
      root: `${ROOTS.DASHBOARD}/survey`,
      new: `${ROOTS.DASHBOARD}/survey/new`,
      edit: (id) => `${ROOTS.DASHBOARD}/survey/${id}/edit`,
      questions: (id) => `${ROOTS.DASHBOARD}/survey/${id}/questions`,
      questions_new: (surveyId) => `${ROOTS.DASHBOARD}/survey/${surveyId}/questions_new`,
      questions_edit : (id) => `${ROOTS.DASHBOARD}/survey/${id}/questions_edit`,
    },

    banner: {
      root: `${ROOTS.DASHBOARD}/banner`,
      new: `${ROOTS.DASHBOARD}/banner/new`,
      edit: (id) => `${ROOTS.DASHBOARD}/banner/${id}/edit`,
    },

    news: {
      root: `${ROOTS.DASHBOARD}/news`,
      new: `${ROOTS.DASHBOARD}/news/new`,
      edit: (id) => `${ROOTS.DASHBOARD}/news/${id}/edit`,
    },

    categories: {
      root: `${ROOTS.DASHBOARD}/categories`,
      new: `${ROOTS.DASHBOARD}/categories/new`,
      edit: (id) => `${ROOTS.DASHBOARD}/categories/${id}/edit`,
    },

    listings: {
      root: `${ROOTS.DASHBOARD}/listings`,
      new: `${ROOTS.DASHBOARD}/listings/new`,
      edit: (id) => `${ROOTS.DASHBOARD}/listings/${id}/edit`,
      view: (id) => `${ROOTS.DASHBOARD}/listings/${id}/view`,
    },

    business_categories: {
      root: `${ROOTS.DASHBOARD}/business_categories`,
      new: `${ROOTS.DASHBOARD}/business_categories/new`,
      edit: (id) => `${ROOTS.DASHBOARD}/business_categories/${id}/edit`,
      view: (id) => `${ROOTS.DASHBOARD}/business_categories/${id}/view`,
    },

    // groups: {
    //   root: `${ROOTS.DASHBOARD}/groups`,
    //   new: `${ROOTS.DASHBOARD}/groups/new`,
    //   edit: (id) => `${ROOTS.DASHBOARD}/groups/${id}/edit`,
    //   view: (id) => `${ROOTS.DASHBOARD}/groups/${id}/view`,
    //   // feedsnew: (id)=> `${ROOTS.DASHBOARD}/forum_feeds/${id}/new`,
    // },

    // forum_feeds: {
    //   root: `${ROOTS.DASHBOARD}/forum_feeds`,
      
    //   new: (groupId)=> `${ROOTS.DASHBOARD}/forum_feeds/${groupId}/new`,
    //   edit: (id) => `${ROOTS.DASHBOARD}/forum_feeds/${id}/edit`,
    //   view: (id) => `${ROOTS.DASHBOARD}/forum_feeds/${id}/view`, 
    // },
  
        groups: {
          root: `${ROOTS.DASHBOARD}/groups`,
          new: `${ROOTS.DASHBOARD}/groups/new`,
          edit: (id) => `${ROOTS.DASHBOARD}/groups/${id}/edit`,
          view: (id) => `${ROOTS.DASHBOARD}/groups/${id}/feeds`,
          forumFeeds: {
            root: (id) => `${ROOTS.DASHBOARD}/groups/${id}/feeds`, 
            new: (id) => `${ROOTS.DASHBOARD}/groups/${id}/feeds/new`,
            edit: (id, feedId) => `${ROOTS.DASHBOARD}/groups/${id}/feeds/${feedId}/edit`,
            view: (id, feedId) => `${ROOTS.DASHBOARD}/groups/${id}/feeds/${feedId}/view`,
          },
        },


        schools: {
          root: `${ROOTS.DASHBOARD}/schools`,
          new: `${ROOTS.DASHBOARD}/schools/new`,
          edit: (id) => `${ROOTS.DASHBOARD}/schools/${id}/edit`,
          view: (id) => `${ROOTS.DASHBOARD}/schools/${id}/view`,
        },
      

        
        students: {
          root: `${ROOTS.DASHBOARD}/students`,
          new: `${ROOTS.DASHBOARD}/students/new`,
          edit: (id) => `${ROOTS.DASHBOARD}/students/${id}/edit`,
          view: (id) => `${ROOTS.DASHBOARD}/students/${id}/view`,
        },
    
    





    contact: {
      root: `${ROOTS.DASHBOARD}/contact`,
      new: `${ROOTS.DASHBOARD}/contact/new`,
      subledger: (id) => `${ROOTS.DASHBOARD}/contact/${id}/subledger`,
      edit: (id) => `${ROOTS.DASHBOARD}/contact/${id}/edit`,
      analytics: `${ROOTS.DASHBOARD}/contact/analytics`,
    },
    purchase: {
      root: `${ROOTS.DASHBOARD}/purchase`,
      new: `${ROOTS.DASHBOARD}/purchase/new`,
      details: (id) => `${ROOTS.DASHBOARD}/purchase/${id}`,
      edit: (id) => `${ROOTS.DASHBOARD}/purchase/${id}/edit`,
      analytics: `${ROOTS.DASHBOARD}/purchase/analytics`,
    },
    sales: {
      root: `${ROOTS.DASHBOARD}/sales`,
      new: `${ROOTS.DASHBOARD}/sales/new`,
      details: (id) => `${ROOTS.DASHBOARD}/sales/${id}`,
      edit: (id) => `${ROOTS.DASHBOARD}/sales/${id}/edit`,
      analytics: `${ROOTS.DASHBOARD}/sales/analytics`,
    },
    returns: {
      root: `${ROOTS.DASHBOARD}/returns`,
      new: `${ROOTS.DASHBOARD}/returns/new`,
      details: (id) => `${ROOTS.DASHBOARD}/returns/${id}`,
      edit: (id) => `${ROOTS.DASHBOARD}/returns/${id}/edit`,
      analytics: `${ROOTS.DASHBOARD}/returns/analytics`,
    },
    payments: {
      root: `${ROOTS.DASHBOARD}/payments`,
      new: `${ROOTS.DASHBOARD}/payments/new`,
      details: (id) => `${ROOTS.DASHBOARD}/payments/${id}`,
      edit: (id) => `${ROOTS.DASHBOARD}/payments/${id}/edit`,
      analytics: `${ROOTS.DASHBOARD}/payments/analytics`,
    },
    godowns: {
      root: `${ROOTS.DASHBOARD}/godowns`,
      new: `${ROOTS.DASHBOARD}/godowns/new`,
      details: (id) => `${ROOTS.DASHBOARD}/godowns/${id}`,
      edit: (id) => `${ROOTS.DASHBOARD}/godowns/${id}/edit`,
    },
    branches: {
      root: `${ROOTS.DASHBOARD}/branches`,
      new: `${ROOTS.DASHBOARD}/branches/new`,
      details: (id) => `${ROOTS.DASHBOARD}/branches/${id}`,
      edit: (id) => `${ROOTS.DASHBOARD}/branches/${id}/edit`,
    },
    staff: {
      root: `${ROOTS.DASHBOARD}/staff`,
      new: `${ROOTS.DASHBOARD}/staff/new`,
      details: (id) => `${ROOTS.DASHBOARD}/staff/${id}`,
      edit: (id) => `${ROOTS.DASHBOARD}/staff/${id}/edit`,
    },
  },
};
