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
      view :  (id) => `${ROOTS.DASHBOARD}/hospitals/${id}/view`,
    },
    features: {
      root: `${ROOTS.DASHBOARD}/features`,
      new: `${ROOTS.DASHBOARD}/features/new`,
      edit: (id) => `${ROOTS.DASHBOARD}/features/${id}/edit`,
    },

    // appointments: {
    //   root: `${ROOTS.DASHBOARD}/appointments`,
    //   new: `${ROOTS.DASHBOARD}/appointments/new`,
    //   edit: (id) => `${ROOTS.DASHBOARD}/appointments/${id}/edit`,
    // },

    banners: {
      root: `${ROOTS.DASHBOARD}/banners`,
      new: `${ROOTS.DASHBOARD}/banners/new`,
      edit: (id) => `${ROOTS.DASHBOARD}/banners/${id}/edit`,
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
      analytics:`${ROOTS.DASHBOARD}/payments/analytics`,
    },
    godowns: {
      root: `${ROOTS.DASHBOARD}/godowns`,
      new: `${ROOTS.DASHBOARD}/godowns/new`,
      details: (id) => `${ROOTS.DASHBOARD}/godowns/${id}`,
      edit: (id) => `${ROOTS.DASHBOARD}/godowns/${id}/edit`,
    },
    branches:{
      root: `${ROOTS.DASHBOARD}/branches`,
      new: `${ROOTS.DASHBOARD}/branches/new`,
      details: (id) => `${ROOTS.DASHBOARD}/branches/${id}`,
      edit: (id) => `${ROOTS.DASHBOARD}/branches/${id}/edit`,
    },
    staff:{
      root: `${ROOTS.DASHBOARD}/staff`,
      new: `${ROOTS.DASHBOARD}/staff/new`,
      details: (id) => `${ROOTS.DASHBOARD}/staff/${id}`,
      edit: (id) => `${ROOTS.DASHBOARD}/staff/${id}/edit`,
    }
  },
};
