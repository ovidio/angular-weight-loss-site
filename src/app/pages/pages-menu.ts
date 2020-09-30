import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: {
      icon: 'chart-line',
      pack: 'fa',
    },
    link: '/pages/weight-dash',
  },
  {
    title: 'Weight',
    icon: {
      icon: 'weight',
      pack: 'fa',
    },
    link: '/pages/weight',
  },
  {
    title: 'Activity',
    icon: {
      icon: 'walking',
      pack: 'fa',
    },
    link: '/pages/activity',
  },
  {
    title: 'Nutrition',
    icon: {
      icon: 'cookie-bite',
      pack: 'fa',
    },
    link: '/pages/nutrition',
  },
];
