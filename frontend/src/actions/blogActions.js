import axios from 'axios';
import {
    BLOG_LIST_REQUEST,
    BLOG_LIST_SUCCESS,
    BLOG_LIST_FAIL,

    BLOG_CREATE_REQUEST,
    BLOG_CREATE_SUCCESS,
    BLOG_CREATE_FAIL,

    BLOG_DETAILS_REQUEST,
    BLOG_DETAILS_SUCCESS,
    BLOG_DETAILS_FAIL,

    BLOG_CREATE_COMMENT_REQUEST,
    BLOG_CREATE_COMMENT_SUCCESS,
    BLOG_CREATE_COMMENT_FAIL,

    BLOG_UPDATE_REQUEST,
    BLOG_UPDATE_SUCCESS,
    BLOG_UPDATE_FAIL,

    BLOG_DELETE_REQUEST,
    BLOG_DELETE_SUCCESS,
    BLOG_DELETE_FAIL,

} from '../constants/blogConstants';


export const updateBlogAction = (blog) => async (dispatch, getState) => {
    try {
        dispatch({
            type: BLOG_UPDATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `http://127.0.0.1:8000/blogs/put/${blog.id}/`, blog, config
        )

        dispatch({
            type: BLOG_UPDATE_SUCCESS,
            payload: data,
        })

        dispatch({
            type: BLOG_DETAILS_REQUEST,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: BLOG_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const deleteBlogAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: BLOG_DELETE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(
            `http://127.0.0.1:8000/blogs/delete/${id}`, config
        )


        dispatch({
            type: BLOG_DELETE_SUCCESS
        })

    } catch (error) {
        dispatch({
            type: BLOG_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const createBlogComment = (id, text) => async (dispatch, getState) => {
    try {
        dispatch({
            type: BLOG_CREATE_COMMENT_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post(
            `http://127.0.0.1:8000/blogs/comment/${id}/`, text, config
        )

        dispatch({
            type: BLOG_CREATE_COMMENT_SUCCESS,
            payload: data,
        })

        } catch (error) {
            dispatch({
                type: BLOG_CREATE_COMMENT_FAIL,
                payload: error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
            })
        }
    }

export const blogActionDetails = (id) => async (dispatch, getState) => {

    try {
        dispatch({ type: BLOG_DETAILS_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`http://127.0.0.1:8000/blogs/get/${id}/`, config);

        dispatch({
            type: BLOG_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: BLOG_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })

    }
}

export const createBlogAction = (body) => async (dispatch, getState) => {
    try {
        dispatch({
            type: BLOG_CREATE_REQUEST
        })    

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `http://127.0.0.1:8000/blogs/post/`,
            {'body':body},
            config
        )

        dispatch({
            type: BLOG_CREATE_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: BLOG_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}



export const listBlogs = () => async (dispatch, getState) => {
    try {
        dispatch({ type: BLOG_LIST_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`http://127.0.0.1:8000/blogs/get/`, config);

        dispatch({
            type: BLOG_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: BLOG_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })

    }
}
