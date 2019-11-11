import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import Profile from './Profile';
import { setUserProfileThunk } from '../../redux/reducers/profileReducer';
import authRedirect from '../../hoc/authRedirect';

class ProfileContainer extends React.Component {
  componentDidMount() {
    let id = this.props.match.params.id
    if(!id) {
      id = 2;
    }
    this.props.setUserProfile(id);
  }

  render() {
    return (
      <div>
        <Profile {...this.props} profile={this.props.profile}/>
      </div>
    );
  }
}; 

const mapStateToProps = state => ({
  profile: state.profileReducer.profile,
  isAuth: state.authReducer.isAuth
})

const mapDispatchToProps = dispatch => ({
    setUserProfile: id => dispatch(setUserProfileThunk(id))
  })




export default compose(withRouter, authRedirect, connect(mapStateToProps, mapDispatchToProps))(ProfileContainer);