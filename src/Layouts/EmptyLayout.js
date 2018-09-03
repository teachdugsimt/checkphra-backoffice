import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { isEmpty } from 'react-redux-firebase'


class EmptyLayout extends Component {


  // const EmptyLayout = ({ component: Component, ...rest }) => {
  // console.log(this)
  componentDidMount() {
    if (isEmpty(this.props.auth)) {
      // console.log('aa')
      const { path } = this.props
      this.props.history.push({ pathname: '/', redirect: path })
    } else {
      // this.props.history.push('/signin')
    }
  }

  componentWillReceiveProps(newProps) {
    // console.log(newProps)
    if (!isEmpty(this.props.auth) && isEmpty(newProps.auth)) {
      // console.log('bb')
      this.props.history.push('/signin')
    }
  }

  render() {
    const { component: Component, ...rest } = this.props
    // console.log(rest)
    // console.log(this.props)
    return (
      <Route {...rest} render={matchProps => {
        return <div className="DefaultLayout">
          <Component {...matchProps} />
        </div>
      }
      } />
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.firebase.auth,
})

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
})

// export default EmptyLayout
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EmptyLayout))
// export default withRouter(compose(
  // firebaseConnect(['users']), // withFirebase can also be used
  // connect(mapStateToProps, mapDispatchToProps)
// )(EmptyLayout))