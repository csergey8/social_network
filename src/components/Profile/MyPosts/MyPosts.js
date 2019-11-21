import React from 'react';
import Post from './Post/Post';
import { reduxForm, Field } from 'redux-form';
import { required, maxLengthCreator } from '../../../utils/validators';
import { Textarea } from '../../Forms/FormsControl';

class MyPosts extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps !== this.props || nextState !== this.state
  }
  
  render() {
    const postsRender = this.props.posts.map(post => <Post key={post.message} message={post.message} likesCount={post.likesCount} />)
    const onAddPost = post => {
      this.props.addPost(post)
    }
    return (
      <div>
        <h1>My Posts</h1>
        <AddNewPostReduxForm onSubmit={onAddPost} />
        { postsRender }
      </div>
    );
  }
  
};

const maxLength10 = maxLengthCreator(10);

const AddNewPostForm = props => {
  
  return (
    <form onSubmit={props.handleSubmit}>
      <Field name="post" component={Textarea} validate={[required, maxLength10]}/>
      <button>Add Post</button>
    </form>
  )
}

const AddNewPostReduxForm = reduxForm({
  form: "post"
})(AddNewPostForm);

export default MyPosts;