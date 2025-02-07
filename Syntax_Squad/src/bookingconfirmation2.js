import React, { useReducer, useEffect,useState } from "react";
import { Button,  TextField, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";


export default function Booking(props) {

  const [users,setUser]=useState([])
  useEffect(()=>{
    getUsers();
    
  },[])
  function getUsers()
  {
    fetch("http://localhost:3000/hotel1s").then((result)=>{
      result.json().then((resp)=>{
        // console.warn(resp)
        setUser(resp)
      })
    })
  }
  console.warn(users)
  function deleteUser(id)
  {
    fetch(`http://localhost:3000/hotel1s/${id}`,{method:'DELETE'}).then((result)=>{result.json().then((resp)=>{
      console.warn(resp)
      getUsers()
    })
  })
  }
  



  console.log(props);

  return (
    <div>

      
     <h2>HOTELS</h2>

       {
         users.map((item,i)=>
         <div key={i}>
          
         <div class="col d-flex justify-content-center">

<div class="card w-75" >
<div class="card-body">
<h5 class="card-title">
  <table cellpadding="75" >
<tr>
  <td><span>{item.city_agra}</span><br/><pre>CITY</pre></td>
  <td><span>{item.hotel_agra}</span><br/><pre>HOTEL</pre></td>
  <td><span>{item.ppl_agra}</span><pre>NUMBER OF PEOPLE</pre></td>
  <td><span>{item.days_agra}</span><pre>NUMBER OF Days</pre></td>
 
  </tr>
  </table>
  <p><small>BOOKING NUMBER-{'   '}{item.id}</small></p>
  </h5>
<button type="button" onClick={()=>deleteUser(item.id)} class="btn btn-outline-danger">DELETE BOOKING</button>
</div>
</div>
</div>
<br/>
         </div>
     
         )
       }
    

  </div>
    

     
     
   );
 }
