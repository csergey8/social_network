const ADD_POST = "ADD_POST";
const UPDATE_NEW_POST_TEXT = "UPDATE_NEW_POST_TEXT";

const initialState = {
  posts: [{},{},{}],
  newPostText: ""
}

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      let newPost = {
        id: 5,
        message: state.newPostText,
        likesCount: 0,
      };
      state.push(newPost);
      state.newPostText = "";

      return state;

    case UPDATE_NEW_POST_TEXT:
      state.newPostText = action.text;

    default:
      return state;
  }
};

export default profileReducer;
