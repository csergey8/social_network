import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { authThunk, logoutThunk } from '../../redux/reducers/authReducer';


class HeaderContainer extends React.Component {
  render() {
    return <Header {...this.props} />
  }
}

const mapStateToProps = state => ({
  isAuth: state.authReducer.isAuth,
  login: state.authReducer.login
})

const mapDispatchToProps = dispatch => ({
  setAuthUserData: () => dispatch(authThunk()),
  logout: () => dispatch(logoutThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);