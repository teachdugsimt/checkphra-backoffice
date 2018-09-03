import React, { Component } from 'react';

import './Styles/App.css';
import { connect } from 'react-redux'
import { Switch, withRouter } from 'react-router'
import { Route } from 'react-router-dom'

import MainLayout from './Layouts/MainLayout'
import Loading from './Layouts/Loading'

import Signin from './Containers/Signin'
import Signup from './Containers/Signup'
import Dashboard from './Containers/Dashboard'



class AppRoute extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Loading} />
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
          <MainLayout path="/dashboard" component={Dashboard} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
})

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
})

// export default layout
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppRoute))
