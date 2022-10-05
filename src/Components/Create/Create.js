import React, { Fragment, useState, useContext } from 'react';
import './Create.css';
import Header from '../Header/Header';
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import { getFirestore, collection, addDoc} from 'firebase/firestore/lite';
import {FirebaseContext, AuthContext} from '../../store/Context'
import { useHistory} from 'react-router-dom'

const Create = () => {
  const {firebase}=useContext(FirebaseContext)
  const {user}=useContext(AuthContext)
  const [name, setName]=useState('')
  const [category, setCategory]=useState('')
  const [price, setPrice]=useState(null)
  const [image, setImage]=useState('')
  const history=useHistory()

  const storage=getStorage(firebase)
  const storageRef= ref(storage, `/image/${image.name}`)
  const db=getFirestore(firebase)
  const productDb=collection(db, 'products') 
  const date=new Date()

  function handleSubmit(){
    uploadBytes(storageRef, image).then(()=>{
      getDownloadURL(storageRef).then((url)=>{
        addDoc(productDb, {
          name,
          category,
          price,
          url,
          userId:user.uid,
          createdAt: date.toDateString()
        })
        history.push('/')
      })
    })
  }
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e)=>{setName(e.target.value)}}
              name="Name"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              value={category}
              onChange={(e)=>{setCategory(e.target.value)}}
              name="category"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number"  value={price}
              onChange={(e)=>{setPrice(e.target.value)}} name="Price" />
            <br />
          <br />
          <img alt="Posts" width="200px" height="200px" src={image? URL.createObjectURL(image):''}></img>
            <br />
            <input type="file" onChange={(e)=>{setImage(e.target.files[0])}} name="Price" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
