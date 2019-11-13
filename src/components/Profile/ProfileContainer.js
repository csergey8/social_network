import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import Profile from './Profile';
import { setUserProfileThunk, getStatusThunk, setStatusThunk } from '../../redux/reducers/profileReducer';
import authRedirect from '../../hoc/authRedirect';

class ProfileContainer extends React.Component {
  componentDidMount() {
    let id = this.props.match.params.id
    if(!id) {
      id = 5088;
    }
    this.props.setUserProfile(id);
    this.props.getUserStatus(id);
    console.log(this.props.status);
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
  isAuth: state.authReducer.isAuth,
  status: state.profileReducer.status
})

const mapDispatchToProps = dispatch => ({
    setUserProfile: id => dispatch(setUserProfileThunk(id)),
    getUserStatus: id => dispatch(getStatusThunk(id)),
    setUserStatus: status => dispatch(setStatusThunk(status))
  })




export default compose(withRouter, authRedirect, connect(mapStateToProps, mapDispatchToProps))(ProfileContainer);