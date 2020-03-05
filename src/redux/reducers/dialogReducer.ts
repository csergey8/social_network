const SEND_MESSAGE = "SEND_MESSAGE";

export type InitialStateType = typeof initialState

type DialogsType = {
  id: number,
  name: string
}

type MessagesType = {
  id: number,
  text: string
}

const initialState = {
  dialogs: [
    { id: 1, name: 'David' },
    { id: 2, name: 'Dan' },
    { id: 3, name: 'Steve' }
  ] as Array<DialogsType>,
  messages: [
    { id: 1, text: 'Hi' },
    { id: 2, text: 'Hello' },
    { id: 3, text: 'How are you?' }
  ] as Array<MessagesType>
};

const dialogReducer = (state = initialState, action: any): InitialStateType => {

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

type SendMessageCreatorType = {
  type: typeof SEND_MESSAGE,
  message: string
}

export const sendMessageCreator = (message: string): SendMessageCreatorType => ({ type: SEND_MESSAGE, message });

export default dialogReducer;
