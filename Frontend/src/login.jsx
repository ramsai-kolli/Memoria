import React,{ useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Login2 from './login2';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


function Login(){
   const [user, setUser] = useState({
        
       phone : "",
       password : "",
         
   });
   const navigate = useNavigate();
    

   const changeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  //const location = useLocation();
       //console.log(location)
  //const message = location.state?.message || 'Welcome to Home2!'; // Get the message or default text
  // console.log(message);

    const submitHandler = async(e) => {
      e.preventDefault();
      console.log("submit handle");
      if(user.password.length<6) 
      {
          alert('password must contain 6 letterss');
       }
      try{
        const res = await axios.post('https://memoria-api.onrender.com/login',user);
              if(res.data.success){
                alert("login Succesfully!");
                console.log(res.data.message);// without window.location.href = '/home2'; this console.log is worked sucessfully
                console.log(res.data.user.name);
                setUser({name:'',email:'',password:'',age:''});
                
               // window.location.href = '/home3';
              
              navigate('/home3', { state: { message: res.data.message,message2:res.data.user.name,userId: res.data.userId } }); // Pass message to the next page and go to next page also,that mean without window.location.href = '/home2';
              }
              if(!res.data.success){
                alert(res.data.message);
              }
                   
  
                  
                  // LOGIN page redirected from here
              
             // console.log("register")
             
      }
      catch(error){
          console.log('Error sending registration request',error);
      }
     
  };    

    return(
        <>
        <form id='login-form' onSubmit={submitHandler} >
          <label>this is login form</label><br></br>
          <label>Phone No:</label>
          <input value={user.phone} onChange={changeHandler} name='phone' type="tel"></input><br></br>
          <label>Password:</label>
          <input value={user.password} onChange={changeHandler} name='password' type="password"></input><br></br>
          <button type="submit">Submit</button>

        </form>        
         
        </>
    )
}
export default Login;
//<Login2 message={message}/>

 