import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { compose } from 'redux'
import RoundedButton from '../Components/RoundedButton'

import AuthActions from '../Redux/AuthRedux'
import { firebaseConnect } from 'react-redux-firebase'


const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class Signup extends Component {

  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };

  }


  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  checkAuth() {

  }

  onSubmit = (event) => {
    this.props.signup(
      this.state.email,
      this.state.password
    )
  }

  render() {

    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    console.log(this.props.signingUp)

    return (
      <div className="signup-box">

        <div className="login-header">
          <img src="./assets/images/logo.png" alt="" />
          <br /><br /><br />
          <h4>สมัครสมาชิก</h4>
        </div>

        <div className="login-form">
          <form
            onSubmit={this.onSubmit}
          >
            <div className="form-group">
              <input
                type="email"
                className="form-control login-field"
                value={email}
                onChange={event => this.setState(byPropKey('email', event.target.value))}
                placeholder="อีเมล"
                id="login-email" />
              <label className="login-field-icon fui-user" htmlFor="login-email"></label>
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control login-field"
                value={password}
                onChange={event => this.setState(byPropKey('password', event.target.value))}
                placeholder="รหัสผ่าน"
                id="login-pass" />
              <label className="login-field-icon fui-lock" htmlFor="login-pass"></label>
            </div>

            <div className="error-message">{this.props.errorSignin && <p>{this.props.errorSignin}</p>}</div>
            <div className="error-message">{
              this.props.signupErrorMessage && this.props.signupErrorMessage.length > 0 ? 
              <p>{this.props.signupErrorMessage.map(e => e)}</p> : null
            }</div>

            <RoundedButton
              loading={this.props.signingUp}
              barColor={'#1ABC9C'}
              onPress={this.onSubmit}
              text={'สมัครสมาชิก'}
            />
            <div>
              <Link to={'/signin'} className="signup-link pull-left">เข้าสู่ระบบ</Link>
              <div className="clearfix"></div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Signup.propTypes = {

};

const mapStateToProps = (state) => ({
  signingUp: state.auth.signingUp,
  signupErrorMessage: state.auth.signupErrorMessage,
  auth: state.firebase.auth
});

const mapDispatchToProps = (dispatch) => ({
  signup: (email, password) => dispatch(AuthActions.signup(email, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
// export default compose(
//   firebaseConnect(), // withFirebase can also be used
//   connect(mapStateToProps, mapDispatchToProps)
// )(Signup)