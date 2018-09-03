// import SvgIcon from 'react-icons-kit';

export default {
    items: [
      {
        name: 'Dashboard',
        url: '/dashboard',
        icon: 'ic_dashboard',
        badge: {
          variant: 'info',
          text: 'NEW'
        }
      },
      {
        name: 'Menu1',
        url: '/menu1',
        icon: 'ic_insert_chart',
        children: [
          {
            name: 'SubMenu1',
            url: '/menu1/submenu1',
            icon: 'usd'
          },
          {
            name: 'SubMenu2',
            url: '/menu1/submenu1',
            icon: 'cubes'
          }
        ]
      },
    ]
  };