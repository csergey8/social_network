import React from 'react';
import Dialog from './Dialog/Dialog';
import DialogItem from './DialogItem/DialogItem';

const Dialogs = (props) => {
  const state = props.dialogs;

  const dialogElements = state.dialogs.map(dialog => <DialogItem key={dialog.name} name={dialog.name} id={dialog.id} />)
  const messagesElements = state.messages.map(message => <Dialog key={message.text} message={message.text} />)
  const newMessageBody = state.newMessageBody;

  const onSendMessageClick = () => {
    props.sendMessage();
  }

  const onNewMessageChange = (e) => {
    let body = e.target.value;
    props.updateNewMessageBody(body);
  }
  return (
    <div className="dialogs">
      <div>
        {dialogElements}
      </div>
      <div>
        {messagesElements}
      </div>
    </div>
  );
};

export default Dialogs;