import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { setAuthUserDataActionCreator } from '../../redux/reducers/authReducer';
import axios from 'axios';

class HeaderContainer extends React.Component {
  componentDidMount() {
        axios.get('https://social-network.samuraijs.com/api/1.0/auth/me', {
          withCredentials: true
        })
            .then(res => {
              console.log(res);
              if(res.data.resultCode === 0) {
                this.props.setAuthUserData(res.data.data)
              }
                
            });
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
  setAuthUserData: data => dispatch(setAuthUserDataActionCreator(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);