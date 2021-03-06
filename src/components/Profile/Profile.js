import React from 'react';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import { Redirect } from 'react-router-dom';

const Profile = props => {
  return (
    <div>
      <ProfileInfo profile={props.profile} status={props.status} setUserStatus={props.setUserStatus}/>
      <MyPostsContainer />
    </div>
  );
}; 

export default Profile;