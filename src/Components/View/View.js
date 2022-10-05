import React,{useContext, useState, useEffect} from 'react';
import { FirebaseContext } from '../../store/Context';
import { PostContext } from '../../store/PostContext';
import { getFirestore, collection, getDocs, query, where} from 'firebase/firestore/lite';


import './View.css';

function View() {
  const [userDetails, setUserDetails]=useState()
  const {postDetails}=useContext(PostContext)
  const {firebase}=useContext(FirebaseContext)
  const db=getFirestore(firebase)
  const userDb=collection(db, 'users') 

  useEffect(()=>{
    const {userId}=postDetails
    const q = query(userDb , where("id", "==", userId));
    getDocs(q).then((res)=>{
      res.forEach(doc=>{
        setUserDetails(doc.data())
      })
    })
  })

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt="post"
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>
        {userDetails &&
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.name}</p>
          <p>{userDetails.phone}</p>
        </div>
}
      </div>
    </div>
  );
}
export default View;
