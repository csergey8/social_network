import React from 'react';
import Dialog from './Dialog/Dialog';
import DialogItem from './DialogItem/DialogItem';

const Dialogs = () => {
  return (
    <div className="dialogs">
    <div>
      <DialogItem name="John" id="1" />
    </div>
      <div>
        <Dialog />
      </div>
    </div>
  );
};

export default Dialogs;