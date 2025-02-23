import React,{ useState,useEffect } from 'react';
import './register.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Register(){
  const [user, setUser] = useState({
    name : "",
    phone : "",
    password : "",
      
});

const navigate = useNavigate();

const changeHandler = (e) => {
  const { name, value } = e.target;
  setUser({ ...user, [name]: value });
};

  const submitHandler = async(e) => {
    e.preventDefault();
    console.log("submit handle");
    if(user.password.length<6) 
    {
        alert('password must contain 6 letters');
     }
    try{
      const res= await axios.post('https://memoria-api.onrender.com/register',user); //.then(res=>{
        console.log(res.data)
              if(res.data.success){
                alert("registered Succesfully!");
                console.log(res.data.message);// without window.location.href = '/home2'; this console.log is worked sucessfully
 
                setUser({name:'',email:'',password:'',age:''});
               // window.location.href = '/home2';
               navigate('/home2', { state: { message: res.data.message } }); // Pass message to the next page and go to next page also,that mean without window.location.href = '/home2';
              }
              if(!res.data.success){               
                alert("register failed! because of"+res.data.message);
                console.log(res.data.message);
              }
              
                
                // LOGIN page redirected from here
           // })
           // console.log("register")
           
    }
    catch(error){
        console.log('Error sending registration request',error);
    }
   
};
 // onSubmit={submitHandler} value={user.name}

    return(
        <>
        <div className="d1"> 
        <div className="d2"> 
         <label className="l1">This is register page</label><br></br>
        <form id='register-form' onSubmit={submitHandler} >
           
          
           
          <input className="i1" value={user.name} onChange={changeHandler} name='name' type='text' placeholder="enter name"  ></input><br></br>
           
          <input className="i2" value={user.phone} onChange={changeHandler} name='phone' type="tel" placeholder='enter no:'></input><br></br>
          
         
          <input className="i3" value={user.password} onChange={changeHandler} name='password' type="password"  placeholder='enter password'></input><br></br>
          <button className="btn1" type="submit">Submit</button>

        </form>        
        </div>
        </div>
        </>
    )
}
export default Register;

//<lable>Name:</lable>
/* <label>Phone No:</label>
 <lable>Password:</lable> */