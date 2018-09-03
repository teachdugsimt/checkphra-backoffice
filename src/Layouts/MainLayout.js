import React from 'react'
// import { Route } from 'react-router'
import { Container } from 'reactstrap';
import EmptyLayout from './EmptyLayout'
import Sidebar from './Sidebar'
import Header from './Header'
import { withRouter } from 'react-router-dom';


import './css/style.css'
import './css/header.css'

const mainLayout = withRouter(props => <MainLayout {...props} />);

const MainLayout = ({ component: Component, ...rest }) => {
  return (
    <EmptyLayout {...rest} component={matchProps => (
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar {...this.props} />
          <main className="main">
            {/* <Breadcrumb /> */}
            <Container fluid>
              <Component {...matchProps} />
            </Container>
          </main>
          {/* <Aside /> */}
        </div>
        {/* <Footer /> */}
      </div>
    )} />
  )
}

export default mainLayout