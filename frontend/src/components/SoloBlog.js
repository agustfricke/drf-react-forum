import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router';
import { blogActionDetails, createBlogComment } from '../actions/blogActions';
import { getListUsers } from '../actions/userActions';
import Messages from './Messages';
import Loader from './Loader';
import { BLOG_CREATE_COMMENT_RESET } from '../constants/blogConstants';



export default function SoloBlog () {

    const { id } = useParams();

    const dispatch = useDispatch();

    const [text, setText] = useState('');

    const commentBlog = useSelector(state => state.commentBlog);
    const { success } = commentBlog;

    const soloBlog = useSelector(state => state.soloBlog);
    const { loading, error, blog } = soloBlog;

    const userList = useSelector(state => state.userList);
    const {users} = userList;

    useEffect (() => {
        if (success) {
            setText('')
            dispatch({type: BLOG_CREATE_COMMENT_RESET})
        }
        dispatch(getListUsers());
        dispatch(blogActionDetails(id));
    }, [dispatch, success]);

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createBlogComment(
            id, {text}
        ))
    }

return (

    <>
    {loading ?
      <Loader />
      : error
        ? <Messages>{error}</Messages>
        : (
<div className="mx-auto max-w-7xl px-4 sm:px-6 pt-6">

    <div>
        <div className="py-10 bg-gray-200">
        <div className="py-8" key={blog.id}>
          <div className="max-w-md mx-auto  bg-white shadow-lg rounded-md overflow-hidden md:max-w-md">
            <div className="md:flex">
              <div className="w-full">

                <div  class="flex justify-between items-center m-8">
                <div className="flex flex-row items-center">
                {users && users.map(user => (
                    <div key={user.id}>

                
                {user.user_name === blog.user &&
                    <>
                <div  className="flex flex-row items-center ml-2">
                    <img src={`http://127.0.0.1:8000${user.image}`} class="rounded-full" width="40" />
                    <span className="font-bold mr-1 ml-2">{blog.user}</span>
                    <small className="h-1 w-1 bg-gray-300 rounded-full mr-1 mt-1"></small>
                    <a style={{textDecoration: 'none'}} href={`/userProfile/${user.id}`}  className="text-blue-600 text-sm hover:text-blue-800">
                    See Profile
                    </a>
                    </div>
                    </>
                    }
                </div>
                    ))}


                </div>
                </div>

                <div className='p-4 flex justify-between items-center'>

                <p>{blog.body}</p>
              
                            
                </div>


                <div class="p-4 flex justify-between items-center">
                <div class="flex flex-row items-center ">
            
                <p className="mb-2 pl-2 text-xs font-semibold tracking-wide text-gray-600 uppercase">
                {blog.date?.substring(0,10)}
                </p>
                </div>
                </div>                 
                </div>
            </div>
        </div>
    </div>


</div>

        <h2 className="mt-6 mb-6 text-center text-3xl font-bold tracking-tight text-gray-900">
        COMMENTS
        </h2>

        <form onSubmit={submitHandler}>

        <div>
        <div className="mt-1 p-4">
            <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            type="text"
            id="text"
            rows={3}
            className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            placeholder="Type Here!"
            />

        </div>

        </div>
        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
        <button
            type='submit'
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
            Comment
        </button>
        </div>
        </form>


{blog.comments && blog.comments.map((comment) => (
   <>
   {users && users.map(u => (

       <div key={comment.id} className="flex justify-center">

       {u.user_name === comment.user &&

       <div className="py-6">
         <div>
           <img
             className="object-cover w-24 h-24 rounded-full shadow"
            src={`http://127.0.0.1:8000${u.image}`} 
             alt="Person"
           />
           <div className="flex flex-col justify-center mt-2">
             <p className="text-lg font-bold">{comment.user}</p>
             <p className="mb-4 text-xs text-gray-800">{comment.date.substring(0,10)}</p>
             <p className="text-sm tracking-wide text-gray-800">
               {comment.text}
             </p>
           </div>
         </div>
       </div>
 }
     </div>
 
     ))}
 
 
     </>
 ))}




</div>
</div>


)}
</>


    )
}
