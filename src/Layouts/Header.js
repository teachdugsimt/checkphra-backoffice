import React, { Component } from 'react';
import { withRouter } from 'react-router'
import {
  NavbarToggler,
  NavbarBrand,
} from 'reactstrap';
import { connect } from 'react-redux'
// import { compose } from 'redux'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
// import { firebaseConnect, isEmpty } from 'react-redux-firebase'

const INITIAL_VALUE = {
  value: 'User',
  label: 'User'
}

class Header extends Component {

  state = {
    profileValue: INITIAL_VALUE
  }

  componentWillReceiveProps(newProps) {
    if (!this.props.profile.isEmpty && newProps.profile.isEmpty) {
      this.props.history.push('/signin')
    }
  }

  sidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-hidden');
  }

  sidebarMinimize(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-minimized');
  }

  mobileSidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-mobile-show');
  }

  asideToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('aside-menu-hidden');
  }

  _onSelect = (e) => {
    switch (e.value) {
      case -1:
        this.props.history.push('/companies/create')
        break;

      default:
        this.props.changeCurrentCompany(e.value)
        break;
    }
  }

  _onSelectMenu = (e) => {
    switch (e.value) {
      case 'signout':
        this.props.clearData()
        this.props.firebase.auth().signOut()
        break;

      default:
        this.setState({
          profileValue: {
            value: 'User',
            label: 'User'
          }
        })
        break;
    }
  }

  render() {

    let companies = []

    this.props.companies &&
      this.props.companies.forEach(element => {
        companies.push({
          value: element.id,
          label: element.name
        })
      });
    companies.push({
      value: -1,
      label: '+ เพิ่มร้าน',
      className: 'addCompanyMenu'
    })

    const currentCompany = {
      value: this.props.company && this.props.company.id ? this.props.company.id : 0,
      label: this.props.company && this.props.company.name ? this.props.company.name : '',
    }

    return (
      <header className="app-header navbar">
        <NavbarToggler className="d-lg-none" onClick={this.mobileSidebarToggle}>
          <span className="navbar-toggler-icon"></span>
        </NavbarToggler>
        <NavbarBrand href="#">
          <img src="./assets/images/logo.png" alt="" height="30px" className="navbar-brand-full" />
          <img src="./assets/images/logo-icon-only.png" alt="" height="30px" className="navbar-brand-minimized" />
        </NavbarBrand>
        <NavbarToggler className="d-md-down-none mr-auto" onClick={this.sidebarToggle}>
          <span className="navbar-toggler-icon"></span>
        </NavbarToggler>

        <Dropdown options={[
          {
            type: 'group',
            name: 'แพ็กเกจ',
            items: [
              { value: 'package', label: 'รายละเอียด' },
            ]
          },
          {
            type: 'group',
            name: 'บัญชีผู้ใช้',
            items: [
              { value: 'profile', label: 'ตั้งค่าบัญชี' },
              { value: 'signout', label: 'ออกจากระบบ' }
            ]
          }
        ]}
          onChange={this._onSelectMenu}
          value={this.state.profileValue}
          className="mr-4"
          controlClassName='dropdownControlProfile'
          menuClassName='profileMenu' />


        {/* <NavbarToggler className="d-md-down-none" onClick={this.asideToggle}>
          <span className="navbar-toggler-icon"></span>
        </NavbarToggler> */}
      </header>
    );
  }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

// export default connect(mapStateToProps, mapDispatchToProps)(Header);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))
// export default withRouter(compose(
  // firebaseConnect(['users']), // withFirebase can also be used
  // connect(mapStateToProps, mapDispatchToProps)
// )(Header))
// export default Header;