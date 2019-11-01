import React from 'react';
import Preloader from '../../utils/Preloader';

const ProfileInfo = props => {
  if(!props.profile) {
    return <Preloader />
  }
  return (
    <div>
      <img src={props.profile.photos.small} />
      AVA
    </div>
  );
};

export default ProfileInfo;