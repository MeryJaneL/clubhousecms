// components
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <SvgIconStyle src={`/assets/icons/navbar/${name}.svg`} sx={{ width: '4px', height: '4px' }} />
);

const ICONS = {
  user: getIcon('ic_user'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  dot: getIcon('ic_dot'),
};

const sidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: '',
    items: [
      { title: '탐색하기', path: '/dashboard/one', icon: ICONS.dot },
      { title: '발행하기', path: '/dashboard/two', icon: ICONS.dot },
      { title: '마이페이지', path: '/dashboard/three', icon: ICONS.dot },
      { title: 'NFT 강의 듣기', path: '/dashboard/user/four', icon: ICONS.dot },
      { title: 'Projects', path: '/dashboard/user/five', icon: ICONS.dot },
    ],
  },
];

export default sidebarConfig;
