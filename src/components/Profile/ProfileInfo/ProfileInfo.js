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
      <ProfileStatus status="Hello" />
    </div>
  );
};

export default ProfileInfo;