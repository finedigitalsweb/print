/**
 * Default Header & Footer Content & Sections Schema
 * Used for Header & Footer CMS in Admin Dashboard and fallback on storefront.
 */

import logoImg from '../assets/Gift-Studio-Logo.webp';
import footerCtaImg from '../assets/images/footer-cta-img.avif';

export const DEFAULT_HEADER_NAV_ITEMS = [
  {
    id: 'nav_home',
    label: 'Home',
    path: '/',
    url: '/',
    icon: 'fa-solid fa-house',
    type: 'link',
    visible: true
  },
  {
    id: 'nav_children',
    label: 'Children',
    path: '/category/Children',
    url: '/category/Children',
    icon: 'fa-solid fa-child',
    type: 'dropdown-nested',
    visible: true,
    subItems: [
      {
        id: 'sub_infants',
        label: 'Infants',
        path: '/category/Children?sub=Infants',
        url: '/category/Children?sub=Infants',
        icon: 'fa-solid fa-baby',
        subItems: [
          {
            id: 'sub_inf_boys',
            label: 'Boys',
            path: '/category/Children?sub=Infants&subsub=Boys',
            url: '/category/Children?sub=Infants&subsub=Boys',
            icon: 'fa-solid fa-mars'
          },
          {
            id: 'sub_inf_girls',
            label: 'Girls',
            path: '/category/Children?sub=Infants&subsub=Girls',
            url: '/category/Children?sub=Infants&subsub=Girls',
            icon: 'fa-solid fa-venus'
          }
        ]
      },
      {
        id: 'sub_kids',
        label: 'Kids',
        path: '/category/Children?sub=Kids',
        url: '/category/Children?sub=Kids',
        icon: 'fa-solid fa-children',
        subItems: [
          {
            id: 'sub_kids_boys',
            label: 'Boys',
            path: '/category/Children?sub=Kids&subsub=Boys',
            url: '/category/Children?sub=Kids&subsub=Boys',
            icon: 'fa-solid fa-mars'
          },
          {
            id: 'sub_kids_girls',
            label: 'Girls',
            path: '/category/Children?sub=Kids&subsub=Girls',
            url: '/category/Children?sub=Kids&subsub=Girls',
            icon: 'fa-solid fa-venus'
          }
        ]
      }
    ]
  },
  {
    id: 'nav_men',
    label: 'Men',
    path: '/category/Men',
    url: '/category/Men',
    icon: 'fa-solid fa-person',
    type: 'dropdown-nested',
    visible: true,
    subItems: [
      {
        id: 'sub_men_engagement',
        label: 'Engagement',
        path: '/category/Men?sub=Engagement',
        url: '/category/Men?sub=Engagement',
        icon: 'fa-solid fa-ring'
      }
    ]
  },
  {
    id: 'nav_women',
    label: 'Women',
    path: '/category/Women',
    url: '/category/Women',
    icon: 'fa-solid fa-person-dress',
    type: 'dropdown-nested',
    visible: true,
    subItems: [
      {
        id: 'sub_women_engagement',
        label: 'Engagement',
        path: '/category/Women?sub=Engagement',
        url: '/category/Women?sub=Engagement',
        icon: 'fa-solid fa-ring'
      }
    ]
  },
  {
    id: 'nav_festivals',
    label: 'Festivals',
    path: '/category/Festivals',
    url: '/category/Festivals',
    icon: 'fa-solid fa-champagne-glasses',
    type: 'dropdown-nested',
    visible: true,
    subItems: [
      {
        id: 'sub_fest_diwali',
        label: 'Diwali',
        path: '/category/Festivals?sub=Diwali',
        url: '/category/Festivals?sub=Diwali',
        icon: 'fa-solid fa-fire'
      }
    ]
  },
  {
    id: 'nav_celebrations',
    label: 'Celebrations',
    path: '/category/Celebrations',
    url: '/category/Celebrations',
    icon: 'fa-solid fa-cake-candles',
    type: 'dropdown-nested',
    visible: true,
    subItems: [
      {
        id: 'sub_cel_bride',
        label: 'Bride to Be',
        path: '/category/Celebrations?sub=Bride%20to%20Be',
        url: '/category/Celebrations?sub=Bride%20to%20Be',
        icon: 'fa-solid fa-heart'
      }
    ]
  },
  {
    id: 'nav_corporate',
    label: 'Corporate Gifts',
    path: '/category/Corporate%20Gifts',
    url: '/category/Corporate%20Gifts',
    icon: 'fa-solid fa-briefcase',
    type: 'dropdown-nested',
    visible: true,
    subItems: [
      {
        id: 'sub_corp_welcome',
        label: 'Welcome Kit',
        path: '/category/Corporate%20Gifts?sub=Welcome%20Kit',
        url: '/category/Corporate%20Gifts?sub=Welcome%20Kit',
        icon: 'fa-solid fa-box-open'
      }
    ]
  },
  {
    id: 'nav_occasions',
    label: 'Occasions',
    path: '/category/Occasions',
    url: '/category/Occasions',
    icon: 'fa-solid fa-gift',
    type: 'dropdown-nested',
    visible: true,
    subItems: [
      {
        id: 'sub_occ_indep',
        label: 'Independence Day',
        path: '/category/Occasions?sub=Independence%20Day',
        url: '/category/Occasions?sub=Independence%20Day',
        icon: 'fa-solid fa-flag'
      }
    ]
  },
  {
    id: 'nav_contact',
    label: 'Contact Us',
    path: '/contact',
    url: '/contact',
    icon: 'fa-solid fa-phone',
    type: 'link',
    visible: true
  }
];

export const DEFAULT_FOOTER_QUICK_LINKS = {
  title: 'Quick Links',
  links: [
    { id: 'fql_1', label: 'Home', url: '/' },
    { id: 'fql_2', label: 'Shop', url: '/shop' },
    { id: 'fql_3', label: 'About Us', url: '/about-us' },
    { id: 'fql_4', label: 'Our Blog', url: '/blog' },
    { id: 'fql_5', label: 'Contact Us', url: '/contact' }
  ]
};

export const DEFAULT_FOOTER_CUSTOMER_SUPPORT = {
  title: 'Customer Support',
  links: [
    { id: 'fcs_1', label: 'Shipping Policy', url: '/shipping' },
    { id: 'fcs_2', label: 'Return & Refund', url: '/returns' },
    { id: 'fcs_3', label: 'FAQs', url: '/contact' },
    { id: 'fcs_4', label: 'Help Center', url: '/contact' }
  ]
};

export const DEFAULT_OCCASION_MENU_DATA = {
  sections: [
    {
      id: 'occ_sec_1',
      heading: 'Romantic',
      links: [
        { id: 'occ_l_1', name: 'Engagement Gifts', url: '/engagement-gifts' },
        { id: 'occ_l_2', name: "Valentine's Day", url: '/shop?cat=valentines' },
        { id: 'occ_l_3', name: 'Proposals', url: '/shop?cat=proposals' },
        { id: 'occ_l_4', name: 'Date Nights', url: '/shop?cat=date-nights' }
      ]
    },
    {
      id: 'occ_sec_2',
      heading: 'Family Events',
      links: [
        { id: 'occ_l_5', name: "Mother's Day", url: '/shop?cat=mothers-day' },
        { id: 'occ_l_6', name: "Father's Day", url: '/shop?cat=fathers-day' },
        { id: 'occ_l_7', name: 'Baby Showers', url: '/shop?cat=baby-showers' }
      ]
    },
    {
      id: 'occ_sec_3',
      heading: 'Celebrations',
      links: [
        { id: 'occ_l_8', name: 'Housewarming', url: '/shop?cat=housewarming' },
        { id: 'occ_l_9', name: 'Graduation', url: '/shop?cat=graduation' },
        { id: 'occ_l_10', name: 'Retirement', url: '/shop?cat=retirement' }
      ]
    },
    {
      id: 'occ_sec_4',
      heading: 'Festivals',
      links: [
        { id: 'occ_l_11', name: 'Christmas', url: '/shop?cat=christmas' },
        { id: 'occ_l_12', name: 'New Year', url: '/shop?cat=new-year' },
        { id: 'occ_l_13', name: 'Diwali / Eid', url: '/shop?cat=festivals' }
      ]
    }
  ]
};

export const DEFAULT_CORPORATE_MENU_DATA = {
  links: [
    { id: 'corp_1', label: 'Bulk Order Discounts', url: '/category/Corporate%20Gifts', icon: 'fa-solid fa-box-open' },
    { id: 'corp_2', label: 'Company Logo Branding', url: '/contact?type=corporate', icon: 'fa-solid fa-building' },
    { id: 'corp_3', label: 'Executive Gift Hampers', url: '/category/Corporate%20Gifts', icon: 'fa-solid fa-gifts' },
    { id: 'corp_4', label: 'Request Instant RFQ Quote', url: '/contact?type=corporate', icon: 'fa-solid fa-file-invoice' }
  ]
};

export const DEFAULT_HEADER_FOOTER_CONTENT = {
  header: {
    visibility: {
      topBar: true,
      socialIcons: true,
      helpLink: true,
      trackLink: false,
      uspStrip: true,
    },
    navItems: DEFAULT_HEADER_NAV_ITEMS,
    occasionMenu: DEFAULT_OCCASION_MENU_DATA,
    corporateMenu: DEFAULT_CORPORATE_MENU_DATA,
    topBar: {
      usp1: 'Unique Gifts for Every Occasion',
      usp2: 'Custom Design',
      usp3: 'Premium Quality',
      usp4: 'Fast Delivery',
      trackOrderText: 'Track Order',
      helpText: 'Help',
    },
    socialLinks: {
      instagram: 'https://instagram.com',
      facebook: 'https://facebook.com',
      pinterest: 'https://pinterest.com',
      youtube: 'https://youtube.com',
      whatsapp: 'https://wa.me/910000000000',
    },
    brand: {
      logoUrl: '',
      logoAlt: 'Fine Gift Studio',
      title: '+FINE GIFT STUDIO',
      subtitle: '— PRINT YOUR IDEAS —',
    },
    search: {
      placeholder: 'Search for personalised gifts...',
    },
    contact: {
      phone: '+91 0000 000 000',
      phoneLink: 'tel:+910000000000',
      whatsapp: '910000000000',
      whatsappLink: 'https://wa.me/910000000000',
      email: 'info@gift.com',
      emailLink: 'mailto:info@gift.com',
    },
  },
  footer: {
    visibility: {
      expressBanner: true,
      instagramSection: true,
      newsletter: true,
      contactInfo: true,
      socialRow: true,
      showcaseImage: true,
      brandBio: true,
    },
    quickLinks: DEFAULT_FOOTER_QUICK_LINKS,
    customerSupport: DEFAULT_FOOTER_CUSTOMER_SUPPORT,
    expressBanner: {
      tag: 'NEED IT URGENTLY?',
      title: 'We Also Offer',
      highlightTitle: 'Express Delivery',
      desc: 'For special occasions and last minute gifts.',
      btnText: 'Contact Us Now',
      btnLink: '/contact',
      feature1Title: 'Fast & Reliable',
      feature1Subtitle: 'Get it on time',
      feature2Title: 'Perfect for',
      feature2Subtitle: 'Special Occasions',
      feature3Title: 'Safe & Secure',
      feature3Subtitle: 'Delivery',
    },
    instagramSection: {
      tag: 'FOLLOW US ON',
      title: 'Instagram',
      desc: 'Get inspired with our latest gifts, custom designs and happy moments.',
      handle: '@finegiftstudio',
      handleLink: 'https://instagram.com',
      posts: [
        {
          id: 1,
          name: 'LED Heart Photo Lamp',
          image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=300&q=80',
          link: 'https://instagram.com',
        },
        {
          id: 2,
          name: 'Custom Photo Mug',
          image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=300&q=80',
          link: 'https://instagram.com',
        },
        {
          id: 3,
          name: 'Monogram Leather Keychain',
          image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=300&q=80',
          link: 'https://instagram.com',
        },
        {
          id: 4,
          name: 'Wooden Couple Frame',
          image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=300&q=80',
          link: 'https://instagram.com',
        },
        {
          id: 5,
          name: 'Custom Water Bottle',
          image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=300&q=80',
          link: 'https://instagram.com',
        },
        {
          id: 6,
          name: 'Good Vibes T-Shirt',
          image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=300&q=80',
          link: 'https://instagram.com',
        },
      ],
    },
    newsletter: {
      title: 'Stay Updated',
      desc: 'Subscribe to get latest offers, new products and gift ideas.',
      placeholder: 'Your email address',
      btnText: 'Subscribe',
    },
    brand: {
      logoUrl: '',
      bioText:
        'Your one-stop destination for customised gifts. We turn your ideas into meaningful and memorable products.',
      showcaseImgUrl: '',
    },
    socialLinks: {
      instagram: 'https://instagram.com',
      facebook: 'https://facebook.com',
      youtube: 'https://youtube.com',
      pinterest: 'https://pinterest.com',
      whatsapp: 'https://whatsapp.com',
    },
    contactInfo: {
      address: 'Mangalore, Karnataka, India',
      phone: '+91 0000 000 000',
      phoneLink: 'tel:+910000000000',
      email: 'info@gift.com',
      emailLink: 'mailto:info@gift.com',
      hours: 'Mon - Sat: 9:00 AM - 7:00 PM',
    },
    bottomBar: {
      copyrightText: '© 2026 Fine Gift Studio. All rights reserved.',
      loveBadgeText: 'Made with ❤️ for Special Moments',
    },
  },
};
