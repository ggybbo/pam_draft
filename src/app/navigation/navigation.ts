import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
  {
    id: 'applications',
    title: 'Applications',
    translate: 'NAV.APPLICATIONS',
    type: 'group',
    icon: 'apps',
    children: [
      {
        id: 'academy',
        title: 'Academy',
        translate: '수업',
        type: 'item',
        icon: 'school',
        url: '/apps/academy'
      },
      {
        id: 'calendar',
        title: 'Calendar',
        translate: '일정',
        type: 'item',
        icon: 'today',
        url: '/apps/calendar'
      },
      {
        id: 'sample',
        title: 'Sample',
        translate: 'NAV.SAMPLE.TITLE',
        type: 'item',
        icon: 'email',
        url: '/sample',
        badge: {
          title: '25',
          translate: 'NAV.SAMPLE.BADGE',
          bg: '#F44336',
          fg: '#FFFFFF'
        }
      }
    ]
  }
];
