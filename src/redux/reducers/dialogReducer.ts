import { BaseThunkType, InfernActionsTypes } from "../store";

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

type ThunkType = BaseThunkType<ActionTypes>

type ActionTypes = InfernActionsTypes<typeof actions>

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

const dialogReducer = (state = initialState, action: ActionTypes ): InitialStateType => {

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

export const actions = {
  sendMessageCreator: (message: any) => ({ type: SEND_MESSAGE, message } as const)
}


export default dialogReducer;
