import React,{ useState,useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
//import './home.css';
function Edit(){

  const [items, setItems] = useState([]);
  

     const location = useLocation(); 
     console.log("location is:",location)
    const editId = location.state?.id1 || null;
    console.log("editId is ",editId)
    const userId = location.state?.userId1 || null;
    console.log("userId is ",userId);


    const fetchUserData = async () => {
        try {
            console.log("Fetching data for user:", userId);
             
            const res = await axios.get(`https://memoria-api.onrender.com/user-data/${userId}`);
            console.log("UseEffect  Profile Image ID1:", res.data);
            console.log("data in array:",res.data.data)
            if (res.data.success) {
                //setItems(res.data.data.map(entry => ({textnew: entry.text,imagenew: `http://localhost:5555/image/${entry.profile_image_id}`})));
                //setItems(res.data.data.map(entry => ({textnew: entry.text})),res.data.data.map(entry => ({imagenew: `http://localhost:5555/image/${entry.profile_image_id}`})))
                //entry => ({ textnew: entry.text, imagenew: `http://localhost:5555/image/${entry.profile_image_id}`})
                setItems(res.data.data.map(entry => ({ idnew: entry._id, textnew: entry.text, imagenew: `http://localhost:5555/image/${entry.profile_image_id}`})))
                console.log("Items:",items)
                // console.log("setItems:",setItems)
                // setLine(res.data.data.map(entry => entry.text)); // Populate stored text
                // //setImageUrls((prevImages) => [...prevImages, `http://localhost:5555/image/${res.data.data.profile_image_id}`]);
                // setImageUrls(res.data.data.map(entry =>  `http://localhost:5555/image/${entry.profile_image_id}`));
                // console.log("images:",imageUrls);
                // console.log("setimages:",setImageUrls);
                  
            } 
} catch (error) {
            console.log("Error fetching user data:", error);
        }
        
    };


    useEffect(() => {
        
        if (userId) fetchUserData();
    }, [userId]);


    const navigate = useNavigate();
    const saveSubmit = async() =>{
        const val1 =document.getElementById("i1").value;
        document.getElementById("i1").value="";
        console.log("val1 is:",val1);
        
        console.log("user1 is:",editId);
        
        try{
            const res = await axios.put("https://memoria-api.onrender.com/edit", {
                val1: val1, 
                editId: editId,
              });
           if(res.data.success){
            alert("update successfully");
            console.log("updated successfully");
           fetchUserData();
         //  navigate('/home3'); 
           }
       // fetchUserData();
        }catch(error){
            console.log("Error sending data", error);
        }
    }

    // function GoRegister()
    // {
    //     window.location.href=`/home1`;
    // }
    // function GoLogin()
    // {
    //     window.location.href=`/home2`;
    // }
    return(
        <>
        <div className="div-main"> 
        <div className="div1"> 
        {/* <form id='home-form'> */}
          <label className="88">Give Rename for image =   </label><br></br>
           {/* <button className="b1" type="button" onClick={GoRegister}>Register</button><br></br>
           <button className="b2" type="button" onClick={GoLogin}>Login</button> */}

        {/* </form>         */}

        <div className="res-div-m"> 
  
{   items.map((item, index) => {
      if(item.idnew === editId){
        console.log("editId is in map:",editId)
        return(
            <div className="res-div" key={index}>
                <div className="res-div2">
                 
                <img className="log2-image" src={item.imagenew} alt="Uploaded" />
                <p className="text-para">{item.textnew}</p>
                <input name="text" id="i1" type="text"></input>
                {/* <button className="res-del" onClick={() =>subhandle2(item.idnew)}> del</button> */}
                <button className="res-edit" onClick={saveSubmit}>save</button>
                </div>
            </div>
        )}
        return null;
})}
</div>


        </div>
        </div>
        </>
    )
}
export default Edit;