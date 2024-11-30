import { _mock } from './_mock';

// ----------------------------------------------------------------------

export const _carouselsMembers = [...Array(6)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.fullName(index),
  role: _mock.role(index),
  avatarUrl: _mock.image.portrait(index),
}));

// ----------------------------------------------------------------------

export const _faqs = [...Array(8)].map((_, index) => ({
  id: _mock.id(index),
  value: `panel${index + 1}`,
  heading: `Questions ${index + 1}`,
  detail: _mock.description(index),
}));

// ----------------------------------------------------------------------

export const _addressBooks = [...Array(24)].map((_, index) => ({
  id: _mock.id(index),
  primary: index === 0,
  name: _mock.fullName(index),
  email: _mock.email(index + 1),
  fullAddress: _mock.fullAddress(index),
  phoneNumber: _mock.phoneNumber(index),
  company: _mock.companyName(index + 1),
  addressType: index === 0 ? 'Home' : 'Office',
}));

// ----------------------------------------------------------------------

export const _contacts = [...Array(20)].map((_, index) => {
  const status =
    (index % 2 && 'online') || (index % 3 && 'offline') || (index % 4 && 'alway') || 'busy';

  return {
    id: _mock.id(index),
    status,
    role: _mock.role(index),
    email: _mock.email(index),
    name: _mock.fullName(index),
    phoneNumber: _mock.phoneNumber(index),
    lastActivity: _mock.time(index),
    avatarUrl: _mock.image.avatar(index),
    address: _mock.fullAddress(index),
  };
});

// ----------------------------------------------------------------------

export const _notifications = [...Array(9)].map((_, index) => ({
  id: _mock.id(index),
  avatarUrl: [
    _mock.image.avatar(1),
    _mock.image.avatar(2),
    _mock.image.avatar(3),
    _mock.image.avatar(4),
    _mock.image.avatar(5),
    null,
    null,
    null,
    null,
    null,
  ][index],
  type: ['friend', 'project', 'file', 'tags', 'payment', 'order', 'chat', 'mail', 'delivery'][
    index
  ],
  category: [
    'Communication',
    'Project UI',
    'File Manager',
    'File Manager',
    'File Manager',
    'Order',
    'Order',
    'Communication',
    'Communication',
  ][index],
  isUnRead: _mock.boolean(index),
  createdAt: _mock.time(index),
  title:
    (index === 0 && `<p><strong>Deja Brady</strong> sent you a friend request</p>`) ||
    (index === 1 &&
      `<p><strong>Jayvon Hull</strong> mentioned you in <strong><a href='#'>FamiliFirst UI</a></strong></p>`) ||
    (index === 2 &&
      `<p><strong>Lainey Davidson</strong> added file to <strong><a href='#'>File Manager</a></strong></p>`) ||
    (index === 3 &&
      `<p><strong>Angelique Morse</strong> added new tags to <strong><a href='#'>File Manager<a/></strong></p>`) ||
    (index === 4 &&
      `<p><strong>Giana Brandt</strong> request a payment of <strong>$200</strong></p>`) ||
    (index === 5 && `<p>Your order is placed waiting for shipping</p>`) ||
    (index === 6 && `<p>Delivery processing your order is being shipped</p>`) ||
    (index === 7 && `<p>You have new message 5 unread messages</p>`) ||
    (index === 8 && `<p>You have new mail`) ||
    '',
}));

// ----------------------------------------------------------------------

export const _mapContact = [
  {
    latlng: [33, 65],
    address: _mock.fullAddress(1),
    phoneNumber: _mock.phoneNumber(1),
  },
  {
    latlng: [-12.5, 18.5],
    address: _mock.fullAddress(2),
    phoneNumber: _mock.phoneNumber(2),
  },
];

// ----------------------------------------------------------------------

export const _socials = [
  {
    value: 'facebook',
    name: 'FaceBook',
    icon: 'eva:facebook-fill',
    color: '#1877F2',
    path: 'https://www.facebook.com/caitlyn.kerluke',
  },
  {
    value: 'instagram',
    name: 'Instagram',
    icon: 'ant-design:instagram-filled',
    color: '#E02D69',
    path: 'https://www.instagram.com/caitlyn.kerluke',
  },
  {
    value: 'linkedin',
    name: 'Linkedin',
    icon: 'eva:linkedin-fill',
    color: '#007EBB',
    path: 'https://www.linkedin.com/caitlyn.kerluke',
  },
  {
    value: 'twitter',
    name: 'Twitter',
    icon: 'eva:twitter-fill',
    color: '#00AAEC',
    path: 'https://www.twitter.com/caitlyn.kerluke',
  },
];

// ----------------------------------------------------------------------

export const _homePlans = [...Array(3)].map((_, index) => ({
  license: ['Standard', 'Standard Plus', 'Extended'][index],
  commons: ['One end products', '12 months updates', '6 months of support'],
  options: [
    'JavaScript version',
    'TypeScript version',
    'Design Resources',
    'Commercial applications',
  ],
  icons: [
    '/assets/icons/platforms/ic_js.svg',
    '/assets/icons/platforms/ic_ts.svg',
    '/assets/icons/platforms/ic_figma.svg',
  ],
}));

// ----------------------------------------------------------------------

export const _pricingPlans = [
  {
    key:8890,
    subscription: 'Basic',
    price: '₹ 49,999',
    caption: 'Forever',
    description: 'Basic plan that gets you started',
    features: [
      {
        key:10,
        title:'Upto 1 Branch',
        logo:'/assets/icons/platforms/ic_js.svg',
        tooltip:`you'll get 1 branch to manage business`,
        is_active:true
      },
      {
        key:11,
        title:'Upto 1 Godown',
        logo:'/assets/icons/platforms/ic_figma.svg',
        tooltip:`you'll get 1 godown to manage business`,
        is_active:true
      },
      {
        key:12,
        title:'Upto 2 Users',
        logo:'/assets/icons/platforms/ic_ts.svg',
        tooltip:`you'll get 1 warehouse to manage business`,
        is_active:true
      },
      {
        key:13,
        title:'Free Website',
        logo:'/assets/icons/platforms/ic_js.svg',
        tooltip:`you'll get 1 branch to manage business`,
        is_active:true
      },
      {
        key:14,
        title:'Free SSL certificate - Lifetime',
        logo:'/assets/icons/platforms/ic_js.svg',
        tooltip:`you'll get 1 branch to manage business`,
        is_active:true
      },
      {
        key:15,
        title:'Module wise Analytics',
        logo:'/assets/icons/platforms/ic_js.svg',
        tooltip:`you'll get 1 branch to manage business`,
        is_active:false
      },
      {
        key:16,
        title:'Monthly Report Mails',
        logo:'/assets/icons/platforms/ic_figma.svg',
        tooltip:`you'll get 1 branch to manage business`,
        is_active:false
      },
      {
        key:17,
        title:'Activity Monitoring for each user',
        logo:'/assets/icons/platforms/ic_ts.svg',
        tooltip:`you'll get 1 branch to manage business`,
        is_active:false
      },
      {
        key:18,
        title:'SMS Notifications',
        logo:'/assets/icons/platforms/ic_js.svg',
        tooltip:`you'll get 1 branch to manage business`,
        is_active:false

      },
      {
        key:19,
        title:'Mobile App with Notifications',
        logo:'/assets/icons/platforms/ic_ts.svg',
        tooltip:`you'll get 1 branch to manage business`,
        is_active:false
      }
    ],
  },
  {
    key:8891,
    subscription: 'Standard',
    price: '₹ 74,999',
    caption: 'Forever',
    description: 'Business Starter',
    features: [
      {
        key:30,
        title:'Upto 3 Branches',
        logo:'/assets/icons/platforms/ic_js.svg',
        tooltip:`you'll get 1 branch to manage business`,
        is_active:true
      },
      {
        key:31,
        title:'Upto 5 Godowns',
        logo:'/assets/icons/platforms/ic_figma.svg',
        tooltip:`you'll get 1 godown to manage business`,
        is_active:true
      },
      {
        key:32,
        title:'Upto 15 Users',
        logo:'/assets/icons/platforms/ic_ts.svg',
        tooltip:`you'll get 1 warehouse to manage business`,
        is_active:true
      },
      {
        key:33,
        title:'Free Website',
        logo:'/assets/icons/platforms/ic_js.svg',
        tooltip:`you'll get 1 branch to manage business`,
        is_active:true
      },
      {
        key:34,
        title:'Free SSL certificate - Lifetime',
        logo:'/assets/icons/platforms/ic_js.svg',
        tooltip:`you'll get 1 branch to manage business`,
        is_active:true
      },
      {
        key:35,
        title:'Module wise Analytics',
        logo:'/assets/icons/platforms/ic_js.svg',
        tooltip:`you'll get 1 branch to manage business`,
        is_active:true
      },
      {
        key:36,
        title:'Monthly Report Mails',
        logo:'/assets/icons/platforms/ic_figma.svg',
        tooltip:`you'll get 1 branch to manage business`,
        is_active:true
      },
      {
        key:37,
        title:'Activity Monitoring for each user',
        logo:'/assets/icons/platforms/ic_ts.svg',
        tooltip:`you'll get 1 branch to manage business`,
        is_active:false
      },
      {
        key:38,
        title:'SMS Notifications',
        logo:'/assets/icons/platforms/ic_js.svg',
        tooltip:`you'll get 1 branch to manage business`,
        is_active:false

      },
      {
        key:39,
        title:'Mobile App with Notifications',
        logo:'/assets/icons/platforms/ic_ts.svg',
        tooltip:`you'll get 1 branch to manage business`,
        is_active:false
      }
    ],
  },
  {
    key:8892,
    subscription: 'Premium',
    price: '₹ 99,999',
    caption: 'Forever',
    description: 'Everything you need for your business',
    features: [
      {
        key:51,
        title:'Unlimited Branches',
        logo:'/assets/icons/platforms/ic_js.svg',
        tooltip:`you'll get 1 branch to manage business`,
        is_active:true
      },
      {
        key:52,
        title:'Unlimited Godowns',
        logo:'/assets/icons/platforms/ic_figma.svg',
        tooltip:`you'll get 1 godown to manage business`,
        is_active:true
      },
      {
        key:53,
        title:'Unlimited Users',
        logo:'/assets/icons/platforms/ic_ts.svg',
        tooltip:`you'll get 1 warehouse to manage business`,
        is_active:true
      },
      {
        key:54,
        title:'Free Website',
        logo:'/assets/icons/platforms/ic_js.svg',
        tooltip:`you'll get 1 branch to manage business`,
        is_active:true
      },
      {
        key:55,
        title:'Free SSL certificate - Lifetime',
        logo:'/assets/icons/platforms/ic_js.svg',
        tooltip:`you'll get 1 branch to manage business`,
        is_active:true
      },
      {
        key:56,
        title:'Module wise Analytics',
        logo:'/assets/icons/platforms/ic_js.svg',
        tooltip:`you'll get 1 branch to manage business`,
        is_active:true
      },
      {
        key:57,
        title:'Monthly Report Mails',
        logo:'/assets/icons/platforms/ic_figma.svg',
        tooltip:`you'll get 1 branch to manage business`,
        is_active:true
      },
      {
        key:58,
        title:'Activity Monitoring for each user',
        logo:'/assets/icons/platforms/ic_ts.svg',
        tooltip:`you'll get 1 branch to manage business`,
        is_active:true
      },
      {
        key:59,
        title:'SMS Notifications',
        logo:'/assets/icons/platforms/ic_js.svg',
        tooltip:`you'll get 1 branch to manage business`,
        is_active:true

      },
      {
        key:60,
        title:'Mobile App with Notifications ✨',
        logo:'/assets/icons/platforms/ic_ts.svg',
        tooltip:`you'll get 1 branch to manage business`,
        is_active:true
      }
    ],
  },
];

// ----------------------------------------------------------------------

export const _testimonials = [
  {
    name: _mock.fullName(1),
    postedDate: _mock.time(1),
    ratingNumber: _mock.number.rating(1),
    avatarUrl: _mock.image.avatar(1),
    content: `Excellent Work! Thanks a lot!`,
  },
  {
    name: _mock.fullName(2),
    postedDate: _mock.time(2),
    ratingNumber: _mock.number.rating(2),
    avatarUrl: _mock.image.avatar(2),
    content: `It's a very good dashboard and we are really liking the product . We've done some things, like migrate to TS and implementing a react useContext api, to fit our job methodology but the product is one of the best in terms of design and application architecture. The team did a really good job.`,
  },
  {
    name: _mock.fullName(3),
    postedDate: _mock.time(3),
    ratingNumber: _mock.number.rating(3),
    avatarUrl: _mock.image.avatar(3),
    content: `Customer support is realy fast and helpful the desgin of this theme is looks amazing also the code is very clean and readble realy good job !`,
  },
  {
    name: _mock.fullName(4),
    postedDate: _mock.time(4),
    ratingNumber: _mock.number.rating(4),
    avatarUrl: _mock.image.avatar(4),
    content: `Amazing, really good code quality and gives you a lot of examples for implementations.`,
  },
  {
    name: _mock.fullName(5),
    postedDate: _mock.time(5),
    ratingNumber: _mock.number.rating(5),
    avatarUrl: _mock.image.avatar(5),
    content: `Got a few questions after purchasing the product. The owner responded very fast and very helpfull. Overall the code is excellent and works very good. 5/5 stars!`,
  },
  {
    name: _mock.fullName(6),
    postedDate: _mock.time(6),
    ratingNumber: _mock.number.rating(6),
    avatarUrl: _mock.image.avatar(6),
    content: `CEO of Codealy.io here. We’ve built a developer assessment platform that makes sense - tasks are based on git repositories and run in virtual machines. We automate the pain points - storing candidates code, running it and sharing test results with the whole team, remotely. Bought this template as we need to provide an awesome dashboard for our early customers. I am super happy with purchase. The code is just as good as the design. Thanks!`,
  },
];
