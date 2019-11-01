import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Profile from './Profile';
import { setUserProfileActionCreator } from '../../redux/reducers/profileReducer';

class ProfileContainer extends React.Component {
  componentDidMount() {
    let id = this.props.match.params.id
    if(!id) {
      id = 2;
    }
    axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${id}`)
    .then(res => {
        this.props.setUserProfile(res.data);
    });
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
  profile: state.profileReducer.profile
})

const mapDispatchToProps = dispatch => ({
    setUserProfile: data => dispatch(setUserProfileActionCreator(data))
  })



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProfileContainer));