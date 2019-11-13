import React from 'react';
import Preloader from '../../utils/Preloader';
import ProfileStatus from './ProfileStatus';

const ProfileInfo = props => {
  if(!props.profile) {
    return <Preloader />
  }
  return (
    <div>
      <img src={props.profile.photos.small} />
      AVA
      <ProfileStatus status={props.status}  setUserStatus={props.setUserStatus}/>
    </div>
  );
};

export default ProfileInfo;