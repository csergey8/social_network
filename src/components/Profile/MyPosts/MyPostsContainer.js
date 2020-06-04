import React from 'react';
import MyPosts from './MyPosts';
import { connect } from 'react-redux';
import { actions } from '../../../redux/reducers/profileReducer';

// const MyPostsContainer = () => {

//     return (
//             <StoreContext.Consumer>
//                 {(store) => {
//                     const state = store.getState();
//                     const addPost = () => {

//                     }
                
//                     const onPostChange = (text) => {
                
//                     }
//                     return (
//                         <MyPosts 
//                         updateNewPostText={onPostChange}
//                         addPost={addPost}
//                         posts={store.getState().profileReducer.posts}
//                         newPostText={store.getState().profileReducer.newPostText}
//                     />
//                     )
//                 }}
//             </StoreContext.Consumer>
//     )
// }

const mapStateToProps = state => {
    return {
        posts: state.profileReducer.posts,
        newPostText: state.profileReducer.newPostText
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addPost: post => {
            dispatch(actions.addPostActionCreator(post));
        }
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;
