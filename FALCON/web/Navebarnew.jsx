
import React from 'react'
import { getAuth,onAuthStateChanged,signOut} from 'firebase/auth';
import { app } from '../firebase';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../style/NavBar.css';
const Navebarnew = () => {
   const auth=getAuth();
   useEffect( () =>{
       onAuthStateChanged(auth,(user)=>{
           if (user){
               setuser(user)
           }
           else{
               setuser(null)
           }
       });},[]);
  return (
    <nav className="navbar navbar1">
    <div className="navbar-logo">
      <Link to="/">Agri-stack</Link>
    </div>
    <ul className="navbar-links navbar-links1">
      <li><a href="#weather">Weather</a></li>
      <li><a href="#soil">Soil</a></li>
      <li><a href="#sensor">sensor</a></li>
      <button onClick={()=>{signOut(auth)}} >signOut</button>
    </ul>
  </nav>
  )
}

export default Navebarnew