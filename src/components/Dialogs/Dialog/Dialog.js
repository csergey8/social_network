import React from 'react';
import Message from '../Message/Message';

const Dialog = props => {
  return (
    <div>
      <Message text={props.message} />
    </div>
  );
};

export default Dialog;