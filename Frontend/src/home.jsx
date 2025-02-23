import React,{ useState,useEffect } from 'react';
import './home.css';
function Home(){
    function GoRegister()
    {
        window.location.href=`/home1`;
    }
    function GoLogin()
    {
        window.location.href=`/home2`;
    }
    return(
        <>
        <div className="div-main"> 
        <div className="div1"> 
        <form id='home-form'>
          <label className="l1">This is Home Page</label><br></br>
           <button className="b1" type="button" onClick={GoRegister}>Register</button><br></br>
           <button className="b2" type="button" onClick={GoLogin}>Login</button>

        </form>        
        </div>
        </div>
        </>
    )
}
export default Home;