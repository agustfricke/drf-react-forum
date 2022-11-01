import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
    userLoginReducer,
    userRegisterReducer,
    userSoloReducer,
    userListReducer,
    userEditReducer,


} from './reducers/userReducers';

import {
    blogListReducer,
    blogCreateReducer,
    blogDetailsReducer,
    createCommentReducer,
    blogDeleteReducer,
    blogUpdateReducer,

} from './reducers/blogReducers';


const reducer = combineReducers({

    // User stuff
    userLogin: userLoginReducer,
    userRegister : userRegisterReducer,
    userSolo: userSoloReducer,
    userList: userListReducer,
    userEdit: userEditReducer,


    // Blog stuff
    blogList: blogListReducer,
    blogCreate: blogCreateReducer,
    soloBlog: blogDetailsReducer,
    commentBlog: createCommentReducer,
    deleteBlog: blogDeleteReducer,
    updateBlog: blogUpdateReducer,

})


const userInfoStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
        userLogin: { userInfo: userInfoStorage }
}

const middleware = [thunk]


const store = createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store
