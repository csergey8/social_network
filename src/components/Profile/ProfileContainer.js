import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Profile from './Profile';
import { setUserProfileThunk } from '../../redux/reducers/profileReducer';

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
  profile: state.profileReducer.profile
})

const mapDispatchToProps = dispatch => ({
    setUserProfile: id => dispatch(setUserProfileThunk(id))
  })



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProfileContainer));