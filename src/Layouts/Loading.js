import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { isEmpty } from 'react-redux-firebase'
import { BarLoader } from 'react-spinners'

class Loading extends Component {


  // const Loading = ({ component: Component, ...rest }) => {
  // console.log(this)
  componentDidMount() {

    if (!isEmpty(this.props.auth)) {
      if (this.props.location.redirect) {
        this.props.history.push(this.props.location.redirect)
      } else {
        // console.log('a')
        this.props.loadCompanyData()
        this.props.history.push('/dashboard')
      }
    } else {
      // console.log('no auth')
      if (!this.props.accessToken) {
        this.props.history.push('/signin')
      } else {
        if (!this.props.location.redirect) {
          // console.log('b')
          this.props.loadCompanyData()
          this.props.history.push('/dashboard')
        } else {
          // this.props.history.push('/signin')
          // this.props.history.push(this.props.location.redirect)
        }
      }
    }
  }

  componentWillReceiveProps(newProps) {
    const { location } = this.props
    // console.log(this.props)
    if (!isEmpty(newProps.auth)) {
      if (location.redirect) {
        // console.log('d')
        if (location.redirect === '/dashboard') {
          // console.log('dd')
          this.props.loadCompanyData()  
        }
        this.props.history.push(location.redirect)
      } else {
        // console.log('c')
        this.props.loadCompanyData()
        this.props.history.push('/dashboard')
      }
    } else {
      // console.log(this.props)
    }
  }

  render() {
    // const { component: Component, ...rest } = this.props
    // console.log(rest)
    // console.log(this.props)
    return (
      <div style={{
        position: 'absolute', top: 0, right: 0, bottom: 0, left: 0,
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        flexDirection: 'column', backgroundColor: '#fff'
      }}>
        <span>Loading ...</span>
        <BarLoader
          color={'#3c0876'}
          loading={true}
          width={120}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
})

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
})

// export default Loading
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Loading))