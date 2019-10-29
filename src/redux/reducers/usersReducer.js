const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const GET_USERS = 'GET_USERS';

const initialState = {
    users: [
        { id: 1, subscribed: true, imgUrl: 'http://zornet.ru/_fr/19/1457300.png', fullName: 'Steve', status: 'Hi', location: { city: 'Kyiv', country: 'Ukraine'}},
        { id: 2, subscribed: false, imgUrl: 'http://zornet.ru/_fr/19/1457300.png', fullName: 'Steve', status: 'Hi', location: { city: 'Kyiv', country: 'Ukraine'}},
        { id: 3, subscribed: true, imgUrl: 'http://zornet.ru/_fr/19/1457300.png', fullName: 'Steve', status: 'Hi', location: { city: 'Kyiv', country: 'Ukraine'}},
        { id: 4, subscribed: false, imgUrl: 'http://zornet.ru/_fr/19/1457300.png', fullName: 'Steve', status: 'Hi', location: { city: 'Kyiv', country: 'Ukraine'}}
    ]
}
const UsersReducer = (state = initialState, action) => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    if(user.id === action.id){
                        return {...user, subscribed: true}
                    }
                    return user
                })
            }
            
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    if(user.id === action.id){
                        return {...user, subscribed: false}
                    }
                    return user
                })
            }
        case GET_USERS:
            return {
                ...state,
                users: [...state.users, ...action.users]
            }
        default:
        
        return state
            
    }
}

export default UsersReducer;

export const followActionCreator = id => ({ type: FOLLOW, id })
export const unfollowActionCreator = id => ({ type: UNFOLLOW, id})
export const getUsersActionCreator = users => ({ type: GET_USERS, users })