const SEND_MESSAGE = "SEND_MESSAGE";

const initialState = {
  dialogs: [
    { id: 1, name: 'David' },
    { id: 2, name: 'Dan' },
    { id: 3, name: 'Steve' }
  ],
  messages: [
    { id: 1, text: 'Hi' },
    { id: 2, text: 'Hello' },
    { id: 3, text: 'How are you?' }
  ] 
};

const dialogReducer = (state = initialState, action) => {

  switch (action.type) {
    case SEND_MESSAGE:
      let body = action.message.newMessageBody
      return {
        ...state,
        messages: [...state.messages, {id: 6, text: body }]
      }
    default:
      return state;
  }
};

export const sendMessageCreator = message => ({ type: SEND_MESSAGE, message });

export default dialogReducer;
