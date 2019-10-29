const UPDATE_NEW_MESSAGE_BODY = "UPDATE_NEW_MESSAGE_BODY";
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
  ],
  newMessageBody: ""
};

const dialogReducer = (state = initialState, action) => {

  switch (action.type) {
    case UPDATE_NEW_MESSAGE_BODY:
      return {
        ...state,
        newMessageBody: action.body
      }

    case SEND_MESSAGE:
      return {
        ...state,
        newMessageBody: '',
        messages: [...state.messages, {id: 6, text: state.newMessageBody }]
      }
    default:
      return state;
  }
};

export const sendMessageCreator = () => ({ type: SEND_MESSAGE });
export const updateNewMessageBodyCreator = (body) => ({ type: UPDATE_NEW_MESSAGE_BODY, body })

export default dialogReducer;
