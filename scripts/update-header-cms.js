import 'dotenv/config';
import { query } from '../server/db.js';

const navItems = [
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

async function run() {
  try {
    const rows = await query('SELECT * FROM cms_content WHERE content_key = ?', ['header_footer_content']);
    if (rows.length > 0) {
      const data = typeof rows[0].data_json === 'string' ? JSON.parse(rows[0].data_json) : (rows[0].data_json || {});
      data.header = data.header || {};
      data.header.navItems = navItems;
      await query('UPDATE cms_content SET data_json = ? WHERE content_key = ?', [JSON.stringify(data), 'header_footer_content']);
      console.log('✅ Updated cms_content table with new 9-item header menu!');
    } else {
      const data = {
        header: {
          navItems
        }
      };
      await query('INSERT INTO cms_content (content_key, data_json) VALUES (?, ?)', ['header_footer_content', JSON.stringify(data)]);
      console.log('✅ Created cms_content table record for header_footer_content!');
    }
    process.exit(0);
  } catch (err) {
    console.error('Error updating CMS:', err);
    process.exit(1);
  }
}

run();
