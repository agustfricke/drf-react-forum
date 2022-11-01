import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';


//Components
import Landing from './components/Landing';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from './components/PrivateRoute';
import MiPerfil from './components/MiPerfil';
import Feed from './components/Feed';
import UserProfile from './components/UserProfile';
import AddBlog from './components/AddBlog';
import SoloBlog from './components/SoloBlog';
import EditBlog from './components/EditBlog';
import EditProfile from './components/EditProfile';


function App() {
  return (
    <BrowserRouter>
      <Header/>
        <Routes>
          <Route element={<PrivateRoute/>}>
            <Route path='/' exact element={<Feed/>}/>
            <Route path='/miPerfil' element={<MiPerfil/>} />
            <Route path='/userProfile/:id' element={<UserProfile/>}/>
            <Route path='/addBlog' element={<AddBlog/>}/>
            <Route path="/soloBlog/:id" element={<SoloBlog/>}/>
            <Route path="/editBlog/:id" element={<EditBlog/>}/>
            <Route path='/editProfile' element={<EditProfile/>}/>

          </Route>

          <Route path='/landing' element={<Landing/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />


      </Routes>
   </BrowserRouter>

  );
}

export default App;
