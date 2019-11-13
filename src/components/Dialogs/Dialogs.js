import React from 'react';
import Dialog from './Dialog/Dialog';
import DialogItem from './DialogItem/DialogItem';
import { Redirect } from 'react-router-dom';
import authRedirect from '../../hoc/authRedirect';
import { reduxForm, Field } from 'redux-form';

const Dialogs = (props) => {
  const state = props.dialogs;

  const dialogElements = state.dialogs.map(dialog => <DialogItem  name={dialog.name} id={dialog.id} />)
  const messagesElements = state.messages.map(message => <Dialog  message={message.text} />)

  const addNewMessage = message => {
    props.sendMessage(message);
  }

  return (
    <div className="dialogs">
      <div>
        {dialogElements}
      </div>
      <div>
        {messagesElements}
      </div>
      <AddMessageReduxForm onSubmit={addNewMessage} />
    </div>
  );
};

const AddMessageForm = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
      <Field placheholder="Enter your message" component={"textarea"} name="newMessageBody"  />
      <button>Send</button>
      </div>
    </form>
  )
}

const AddMessageReduxForm = reduxForm({
  form: 'dialog '
})(AddMessageForm)

export default authRedirect(Dialogs);