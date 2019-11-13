import React from 'react';
import Post from './Post/Post';
import { reduxForm, Field } from 'redux-form';

const MyPosts = props => {
  const onAddPost = post => {
    props.addPost(post)
  }

  const postsRender = props.posts.map(post => <Post message={post.message} likesCount={post.likesCount} />)
  return (
    <div>
      <h1>My Posts</h1>
      <AddNewPostReduxForm onSubmit={onAddPost} />
      { postsRender }
    </div>
  );
};

const AddNewPostForm = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field name="post" component={"textarea"}/>
      <button>Add Post</button>
    </form>
  )
}

const AddNewPostReduxForm = reduxForm({
  form: "post"
})(AddNewPostForm);

export default MyPosts;