import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import {createBlogAction, listBlogs} from '../actions/blogActions';
import Messages from './Messages';
import Loader from './Loader';


export default function AddBlog () {


    const dispatch = useDispatch();

    const navigate = useNavigate();
    const path = ('/');


    const blogCreate = useSelector (state => state.blogCreate);
    const {loading, error} = blogCreate;

    const [body, setBody] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createBlogAction(body));
        dispatch(listBlogs());
        navigate(path);
    }

return (
        <>
      {loading ?
        <Loader />
        : error
          ? <Messages>{error}</Messages>
          : (

            <div>
            <div className="md:grid md:grid-cols-4 md:gap-6">
              <div className="md:col-span-1">
              </div>
              <div className="mt-5 md:col-span-2 md:mt-0">
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                  Create a Post
                </h2>
                <form
                    onSubmit={handleSubmit}
                    >

                    <div className="shadow sm:overflow-hidden sm:rounded-md">
                      <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                        <div className="grid grid-cols-3 gap-6">
                          <div className="col-span-3 sm:col-span-2">
                          </div>
                        </div>

                        <div>
                          <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                            About
                          </label>
                          <div className="mt-1">
                            <textarea
                              value={body}
                              onChange={(e) => setBody(e.target.value)}
                              type="text"
                              id="body"
                              rows={3}
                              className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                              placeholder="Type Here!"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                        <button
                          type='submit'
                          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          POST
                        </button>
                      </div>

                    </div>
                  </form>
                </div>
            </div>
        </div>
    )
    }
    </>
    )
}