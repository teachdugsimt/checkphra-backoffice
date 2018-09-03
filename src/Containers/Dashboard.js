import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
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

class Dashboard extends Component {

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
      <div className="dashboard">
          Dashboard
      </div>
    );
  }
}

Dashboard.propTypes = {

};

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
