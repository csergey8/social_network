import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { authThunk } from '../../redux/reducers/authReducer';
import axios from 'axios';

class HeaderContainer extends React.Component {
  componentDidMount() {
        this.props.setAuthUserData();
  }
  render() {
    return <Header {...this.props} />
  }
}

const mapStateToProps = state => ({
  isAuth: state.authReducer.isAuth,
  login: state.authReducer.login
})

const mapDispatchToProps = dispatch => ({
  setAuthUserData: () => dispatch(authThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);