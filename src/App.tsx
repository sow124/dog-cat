import { useEffect, useState } from 'react'
import './App.css'
import Header from './component/header/header'
import Home from './component/home/home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from './component/Notfound/notfound';
import Dog from './component/Dog/dog';
import Cat from './component/Cat/cat';
import Login from './component/login/login';
import Community from './component/community/community';
import Join from './component/login/join';
import Detail from './component/detail/detail';
import Addpost from './component/community/addpost';
import PostDetail from './component/community/postDetail';
import PostEdit from './component/community/postEdit';

function App() {
  return (
    <div>
        <Header/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path={'/dog'} element={<Dog/>}/>
            <Route path={'/cat'} element={<Cat/>}/>
            <Route path={'/login'} element={<Login/>}/>
            <Route path={'/join'} element={<Join/>}/>
            <Route path={'/community'} element={<Community/>}/>
            <Route path={'/*'} element={<NotFound/>}/>
            <Route path={':desertionNo'} element={<Detail/>}/>
            <Route path={'/post'} element={<Addpost/>}/>
            <Route path={'/content/:id'} element={<PostDetail/>}/>
            <Route path={'/content/:id/edit'} element={<PostEdit/>}/>
        </Routes>
    </div>
  )
}

export default App
