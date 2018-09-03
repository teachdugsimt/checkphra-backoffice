import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect } from 'react-redux-firebase'

import RoundedButton from '../Components/RoundedButton';


const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
  signining: false
};

class Signin extends Component {

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

    return (
      <div className="login-box">

        <div className="login-header">
          <img src="./assets/images/logo.png" alt="" />
          <br /><br /><br />
          <h4>
            เข้าสู่ระบบ
          </h4>
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
            <div className="error-message">{error ? <p>{error.message}</p> : null}</div>

            <RoundedButton 
              loading={this.state.signining}
              barColor={'#1ABC9C'}
              // onPress={this.onSubmit}
              text={'เข้าสู่ระบบ'}
              />
            <div>
              <Link to={'/signup'} className="signup-link pull-left">สมัครสมาชิก</Link>
              <div className="clearfix"></div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Signin.propTypes = {

};

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default compose(
  firebaseConnect(),
  connect(mapStateToProps, mapDispatchToProps)
)(Signin)

