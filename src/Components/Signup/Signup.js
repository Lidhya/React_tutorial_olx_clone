import React, { useState,useContext } from 'react';
import {useHistory, Link} from 'react-router-dom'
import { FirebaseContext } from '../../store/Context';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getFirestore, collection, addDoc} from 'firebase/firestore/lite';
import Logo from '../../olx-logo.png';
import './Signup.css';

// , getDocs, addDoc, deleteDoc, doc, setDoc

export default function Signup() {
  const [username, setUsername]=useState('')
  const [email, setEmail]=useState('')
  const [phone, setphone]=useState('')
  const [password, setPassword]=useState('')
  const {firebase}=useContext(FirebaseContext)
  const auth = getAuth(firebase);
  const db=getFirestore(firebase)
  const userDb=collection(db, 'users') 
  const history=useHistory()

  const handleSubmit=(e)=>{
    e.preventDefault()
    createUserWithEmailAndPassword(auth, email, password).then((result)=>{
      updateProfile(result.user, {displayName:username})
      addDoc(userDb, {
        id:result.user.uid,
        username:username,
        phone:phone
      }).then(()=>{
        history.push("/login")
      }) 
    })
    console.log('this is firebase log in signup');
    console.log(firebase );
  }

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt=""></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e)=>{setUsername(e.target.value)}}
            name="name"    
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            name="email"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="tel"
            value={phone}
            onChange={(e)=>{setphone(e.target.value)}}
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}
