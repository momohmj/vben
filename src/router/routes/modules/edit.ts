import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/edit',
  name: 'Edit',
  component: LAYOUT,
  redirect: '/edit/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'simple-icons:about-dot-me',
    title: t('routes.dashboard.edit'),
    orderNo: 20,
  },
  children: [
    {
      path: 'index',
      name: 'EditPage',
      component: () => import('/@/views/sys/edit/index.vue'),
      meta: {
        title: t('routes.dashboard.edit'),
        icon: 'simple-icons:about-dot-me',
        hideMenu: true,
      },
    },
  ],
};

export default dashboard;
