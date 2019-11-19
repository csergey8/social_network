import React from 'react';
import Preloader from '../../../utils/Preloader';
import ProfileStatus from './ProfileStatus';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

const ProfileInfo = props => {
  if(!props.profile) {
    return <Preloader />
  }
  return (
    <div>
      <img src={props.profile.photos.small} />
      AVA
      <ProfileStatusWithHooks status={props.status}  setUserStatus={props.setUserStatus}/>
    </div>
  );
};

export default ProfileInfo;