import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Badge, Nav, NavItem, NavLink as RsNavLink } from 'reactstrap';
import classNames from 'classnames';

import SidebarFooter from './SidebarFooter';
import SidebarForm from './SidebarForm';
import SidebarHeader from './SidebarHeader';
import SidebarMinimizer from './SidebarMinimizer';

import { withRouter } from 'react-router'

import nav from './_nav.js';
import { ic_people } from 'react-icons-kit/md/ic_people';
import { ic_dashboard } from 'react-icons-kit/md/ic_dashboard';
import { ic_shopping_cart } from 'react-icons-kit/md/ic_shopping_cart';
import { ic_local_shipping } from 'react-icons-kit/md/ic_local_shipping';
import { ic_home } from 'react-icons-kit/md/ic_home';
import { ic_insert_chart } from 'react-icons-kit/md/ic_insert_chart';
import { ic_settings } from 'react-icons-kit/md/ic_settings';
import { cube } from 'react-icons-kit/ionicons/cube';
import { ic_move_to_inbox } from 'react-icons-kit/md/ic_move_to_inbox';
import { iosContactOutline } from 'react-icons-kit/ionicons/iosContactOutline'
import { shop } from 'react-icons-kit/ikons/shop'
import { androidShareAlt } from 'react-icons-kit/ionicons/androidShareAlt'
import { grid } from 'react-icons-kit/ionicons/grid'
import { usd } from 'react-icons-kit/fa/usd'
import { cubes } from 'react-icons-kit/fa/cubes'

import SvgIcon from 'react-icons-kit';

const Icon20 = props => <SvgIcon size={props.size || 20} icon={props.icon} style={{ width: '50px' }} />;

const icon = {
  ic_people, ic_dashboard,
  ic_cart: ic_shopping_cart,
  ic_local_shipping, ic_home,
  ic_insert_chart, ic_settings,
  cube, ic_move_to_inbox,
  iosContactOutline, shop,
  androidShareAlt, grid,
  usd, cubes
}

class Sidebar extends Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.activeRoute = this.activeRoute.bind(this);
    this.hideMobile = this.hideMobile.bind(this);
  }


  handleClick(e) {
    e.preventDefault();
    e.target.parentElement.classList.toggle('open');
    e.target.parentElement.parentElement.classList.toggle('open');
  }

  activeRoute(routeName, props) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';
  }

  hideMobile() {
    if (document.body.classList.contains('sidebar-mobile-show')) {
      document.body.classList.toggle('sidebar-mobile-show')
    }
  }

  // todo Sidebar nav secondLevel
  // secondLevelActive(routeName) {
  //   return this.props.location.pathname.indexOf(routeName) > -1 ? "nav nav-second-level collapse in" : "nav nav-second-level collapse";
  // }


  render() {

    const props = this.props;

    // badge addon to NavItem
    const badge = (badge) => {
      if (badge) {
        const classes = classNames(badge.class);
        return (<Badge className={classes} color={badge.variant}>{badge.text}</Badge>)
      }
    };

    // simple wrapper for nav-title item
    const wrapper = item => { return (item.wrapper && item.wrapper.element ? (React.createElement(item.wrapper.element, item.wrapper.attributes, item.name)) : item.name) };

    // nav list section title
    const title = (title, key) => {
      const classes = classNames('nav-title', title.class);
      return (<li key={key} className={classes}>{wrapper(title)} </li>);
    };

    // nav list divider
    const divider = (divider, key) => {
      const classes = classNames('divider', divider.class);
      return (<li key={key} className={classes}></li>);
    };

    // nav label with nav link
    const navLabel = (item, key) => {
      const classes = {
        item: classNames('hidden-cn', item.class),
        link: classNames('nav-label', item.class ? item.class : ''),
        icon: classNames(
          !item.icon ? 'fa fa-circle' : item.icon,
          item.label.variant ? `text-${item.label.variant}` : '',
          item.label.class ? item.label.class : ''
        )
      };
      return (
        navLink(item, key, classes)
      );
    };

    // nav item with nav link
    const navItem = (item, key) => {
      const classes = {
        item: classNames(item.class),
        link: classNames('nav-link', item.variant ? `nav-link-${item.variant}` : ''),
        icon: item.icon
      };
      return (
        navLink(item, key, classes)
      )
    };

    // nav link
    const navLink = (item, key, classes) => {
      const url = item.url ? item.url : '';
      // const ic = item.icon;
      // console.log(icon[item.icon])
      return (
        <NavItem key={key} className={classes.item}>
          {isExternal(url) ?
            <RsNavLink href={url} className={classes.link} active>
              <div style={{ display: 'flex', alignSelf: 'center' }}>
                {item.icon ? <Icon20 icon={icon[item.icon]} /> : <i></i>}
                {item.name}
              </div>
              {badge(item.badge)}
            </RsNavLink>
            :
            <NavLink to={url} className={classes.link} activeClassName="active" onClick={this.hideMobile}>
              <div style={{ display: 'flex', alignSelf: 'center' }}>
                {item.icon ? <Icon20 icon={icon[item.icon]} /> : <i></i>}
                {item.name}
              </div>
              {badge(item.badge)}
            </NavLink>
          }
        </NavItem>
      )
    };

    // nav dropdown
    const navDropdown = (item, key) => {
      return (
        <li key={key} className={this.activeRoute(item.url, props)}>
          <a href="#" className="nav-link nav-dropdown-toggle" aria-current="true" onClick={this.handleClick}>
            <div style={{ display: 'flex', alignSelf: 'center' }}>
              {item.icon ? <Icon20 size={25} icon={icon[item.icon]} /> : <i></i>} {item.name}
            </div>
          </a>
          <ul className="nav-dropdown-items">
            {navList(item.children)}
          </ul>
        </li>)
    };

    // nav type
    const navType = (item, idx) =>
      item.title ? title(item, idx) :
        item.divider ? divider(item, idx) :
          item.label ? navLabel(item, idx) :
            item.children ? navDropdown(item, idx)
              : navItem(item, idx);

    // nav list
    const navList = (items) => {
      return items.map((item, index) => navType(item, index));
    };

    const isExternal = (url) => {
      const link = url ? url.substring(0, 4) : '';
      return link === 'http';
    };

    // sidebar-nav root
    return (
      <div className="sidebar">
        <SidebarHeader />
        <SidebarForm />
        <nav className="sidebar-nav">
          <Nav>
            {navList(nav.items)}
          </Nav>
        </nav>
        <SidebarFooter />
        <SidebarMinimizer />
      </div>
    )
  }
}

export default withRouter(Sidebar);