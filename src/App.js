import React,{useEffect,useContext} from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { getAuth, onAuthStateChanged} from "firebase/auth";
import Post from './store/PostContext'

/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import LoginPage from './Pages/Login';
import SignupPage from './Pages/Signup';
import { AuthContext, FirebaseContext } from './store/Context';
import CreatePage from './Pages/Create';
import ViewPost from './Pages/ViewPost';


function App() {
  const {setUser}=useContext(AuthContext)
  const {firebase}=useContext(FirebaseContext)
  const auth = getAuth(firebase);
  useEffect(()=>{
   onAuthStateChanged(auth, (user)=>{
    setUser(user)
   })
  })
  return (
    <div>
      <Post>
      <Router>/
      <Route exact path='/'>
      <Home />
      </Route>
      <Route path='/signup'>
      <SignupPage/>
      </Route>
      <Route path='/login'>
      <LoginPage/>
      </Route>
      <Route path='/create'>
      <CreatePage/>
      </Route>
      <Route path='/view'>
      <ViewPost/>
      </Route>
      </Router>
      </Post>
    </div>
  );
}

export default App;
