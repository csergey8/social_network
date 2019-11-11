import React from 'react';
import StoreContext from '../../StoreContext';
import { compose } from 'redux';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import { sendMessageCreator, updateNewMessageBodyCreator } from '../../redux/reducers/dialogReducer';

// const DialogsContainer = () => {
//     return (
//         <StoreContext.Consumer>
//             {(store) => {
//                 console.log(store)
//                 const onSendMessageClick = () => {

//                 }

//                 const onNewMessageChange = (body) => {

//                 }
//                 return (
//                     <Dialogs 
//                         updateNewMessageBody={onNewMessageChange}
//                         sendMessage={onSendMessageClick}
//                         //dialogs={store.getState().dialogReducer}
//                     />
//                 )
//             }}
//         </StoreContext.Consumer>
//     )
// }

const mapStateToProps = state => {
    return {
        dialogs: state.dialogReducer,
        isAuth: state.authReducer.isAuth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        sendMessage: () => {
            dispatch(sendMessageCreator())
        },
        updateNewMessageBody: (body) => {
            dispatch(updateNewMessageBodyCreator(body))
        }
    }
} 

export default compose(connect(mapStateToProps, mapDispatchToProps))(Dialogs);
