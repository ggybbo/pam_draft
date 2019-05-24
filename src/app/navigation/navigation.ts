import { FuseNavigation } from '@fuse/types';
import { TodoCountService } from '../services/todo/todocount.service';

export const navigation: FuseNavigation[] = [
  {
    id: 'applications',
    title: 'Applications',
    translate: 'NAV.APPLICATIONS',
    type: 'group',
    icon: 'apps',
    children: [
      {
        id: 'dashboards',
        title: 'Dashboards',
        translate: 'Dashboards',
        type: 'collapsable',
        icon: 'dashboard',
        children: [
          {
            id: 'analytics',
            title: 'Analytics',
            type: 'item',
            url: '/apps/dashboards/analytics'
          },
          {
            id: 'project',
            title: 'Information',
            type: 'item',
            url: '/apps/dashboards/project'
          }
        ]
      },
      {
        id: 'academy',
        title: 'Academy',
        translate: '수업',
        type: 'item',
        icon: 'school',
        url: '/apps/academy'
      }
      // {
      //   id: 'calendar',
      //   title: 'Calendar',
      //   translate: '일정',
      //   type: 'item',
      //   icon: 'today',
      //   url: '/apps/calendar'
      // },
      // {
      //   id: 'e-commerce',
      //   title: 'E-Commerce',
      //   translate: '수업자료',
      //   type: 'collapsable',
      //   icon: 'save',
      //   children: [
      //     {
      //       id: 'products',
      //       title: 'Materials',
      //       type: 'item',
      //       url: '/apps/e-commerce/products',
      //       exactMatch: true
      //     }
      //   ]
      // },
      // {
      //   id: 'contacts',
      //   title: 'Contacts',
      //   translate: '회원관리',
      //   type: 'item',
      //   icon: 'account_box',
      //   url: '/apps/contacts'
      // }
      // {
      //   id: 'scrumboard',
      //   title: 'Scrumboard',
      //   translate: '수업 데이터',
      //   type: 'item',
      //   icon: 'assessment',
      //   url: '/apps/scrumboard'
      // }
    ]
  },
  {
    id: 'pages',
    title: 'Pages',
    type: 'group',
    icon: 'pages',
    children: [
      {
        id: 'profile',
        title: 'Profile',
        type: 'item',
        icon: 'person',
        url: '/pages/profile'
      }
    ]
  },
  {
    id: 'documentation',
    title: 'Documentation',
    icon: 'import_contacts',
    type: 'group',
    children: [
      {
        id: 'changelog',
        title: 'Changelog',
        type: 'item',
        icon: 'update',
        url: '/documentation/changelog',
        badge: {
          title: '1.0.0',
          bg: '#EC0C8E',
          fg: '#FFFFFF'
        }
      }
    ]
  }
];
