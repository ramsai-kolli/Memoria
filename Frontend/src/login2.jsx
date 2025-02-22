import React,{ useState,useEffect } from 'react';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Login2(){
    const [line , setLine] =useState([]);
    const [imageUrl, setImageUrl] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);
    const [line2 , setLine2] =useState([]);

    const [selectedFile, setSelectedFile] = useState(null); // Store selected image


    const location = useLocation(); 
    const userId = location.state?.userId || null;
    console.log("userId is ",userId)

    // useEffect(() => {
    //     const fetchUserData = async () => {
    //         try {
    //             console.log(userId)
    //             const res = await axios.get(`http://localhost:5555/user-data/${userId}`);
    //             if (res.data.success) {
    //                 setLine(res.data.data.map(entry => entry.text)); // Populate stored text
    //                 setLine2(res.data.data.map(entry => entry.image || null)); // Populate stored text
    //                 //setSelectedFile(res.data.data.map(entry => entry.image));
    //             }
    //             // if (res.data.success) {
    //             //     setLine(res.data.data); // Store full objects (text + image)
    //             // }
    //         } catch (error) {
    //             console.log('Error fetching user data:', error);
    //         }
    //     };
    //     if (userId) fetchUserData();
    // }, [userId]);

    useEffect(() => {
        const fetchUserData = async () => {
            // try {
            //     console.log("Fetching data for user:", userId);
            //     const res = await axios.get(`http://localhost:5555/user-data/${userId}`);
            //     console.log("UseEffect  Profile Image ID1:", res.data);
            //     if (res.data.success) {

            //     //     const userData = res.data.data;
            //     //     // Store texts and images correctly
            //     //     setLine(userData.map(entry => entry.text));  // Extract texts into an array
            //     //     const images = userData.map(entry => entry.image).filter(img => img); // Filter out null images
            //     //     //setImageUrls(images);  // Store the array of image URLs
            //     //     setImageUrls((prevImages) => [...prevImages, images]);
            //     //  console.log("set Images=",setImageUrls)



            //         const userData = res.data.data;
            //         console.log("User Data:", userData);
            //         setLine([userData.text]); // Store text as an array
            //         // setImageUrl(userData.image); 
            //         if (userData.profile_image_id) {
            //             console.log("Profile Image ID2:", res.data.data.profile_image_id);
            //            // setImageUrls((prevImages) => [...prevImages, userData.image]);
            //             setImageUrls((prevImages) => [...prevImages, `http://localhost:5555/image/${res.data.data.profile_image_id}`]);
            //         }  

            //     //     const userData = res.data; // This is an object, not an array
            //     //     console.log("user =",userData)
                
            //     // // Convert object into an array before using .map()
            //     // // setLine([userData.text]);  
            //     // // setLine2([userData.image]); 

            //     // setLine(res.data.data.map(entry => entry.text)); 

            //         // Store text as an array (so UI mapping logic still works)
            //     //     console.log("text",res.data.data.text)
            //     //    // setLine([...line,res.data.data.text]);
            //     //    setLine(res.data.data.map(entry => entry.text));
    
            //     //     // Store image URL as an array
            //     //     setLine2([res.data.data.image]); 
            //     }
            // } catch (error) {
            //     console.log("Error fetching user data:", error);
            // }

            try {
                console.log("Fetching data for user:", userId);
                const res = await axios.get(`https://memoria-api.onrender.com/user-data/${userId}`);
                console.log("UseEffect  Profile Image ID1:", res.data);
                if (res.data.success) {
                    setLine(res.data.data.map(entry => entry.text)); // Populate stored text
                    //setImageUrls((prevImages) => [...prevImages, `http://localhost:5555/image/${res.data.data.profile_image_id}`]);
                    setImageUrls(res.data.data.map(entry =>  `https://memoria-api.onrender.com/image/${entry.profile_image_id}`));
                }


                // if (res.data.success) {

                // //     const userData = res.data.data;
                // //     // Store texts and images correctly
                // //     setLine(userData.map(entry => entry.text));  // Extract texts into an array
                // //     const images = userData.map(entry => entry.image).filter(img => img); // Filter out null images
                // //     //setImageUrls(images);  // Store the array of image URLs
                // //     setImageUrls((prevImages) => [...prevImages, images]);
                // //  console.log("set Images=",setImageUrls)

                

                //     const userData = res.data.data;
                //     console.log("User Data:", userData);
                //     setLine([userData.text]); // Store text as an array
                //     // setImageUrl(userData.image); 
                //     if (userData.profile_image_id) {
                //         console.log("Profile Image ID2:", res.data.data.profile_image_id);
                //        // setImageUrls((prevImages) => [...prevImages, userData.image]);
                //         setImageUrls((prevImages) => [...prevImages, `http://localhost:5555/image/${res.data.data.profile_image_id}`]);
                //     }  

                // //     const userData = res.data; // This is an object, not an array
                // //     console.log("user =",userData)
                
                // // // Convert object into an array before using .map()
                // // // setLine([userData.text]);  
                // // // setLine2([userData.image]); 

                // // setLine(res.data.data.map(entry => entry.text)); 

                //     // Store text as an array (so UI mapping logic still works)
                // //     console.log("text",res.data.data.text)
                // //    // setLine([...line,res.data.data.text]);
                // //    setLine(res.data.data.map(entry => entry.text));
    
                // //     // Store image URL as an array
                // //     setLine2([res.data.data.image]); 
                // }
            } catch (error) {
                console.log("Error fetching user data:", error);
            }
            
        };
        if (userId) fetchUserData();
    }, [userId]);
    

    const subhandle = (async(e) => {
        e.preventDefault();
        const val1 = document.getElementById("i1").value;
        setLine([...line,val1]);
        document.getElementById("i1").value="";

        // Create FormData to send text + image
        const formData = new FormData();
        formData.append("text", val1);
        formData.append("userId", userId);
        if (selectedFile) {
            formData.append("image", selectedFile); // Attach the image
        }else {
            console.warn("No file selected");
        }
        // setLine2([...line2, selectedFile])
         // Debugging: Log FormData values before sending
    for (let pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
    }

    setLine2([...line2,selectedFile]);
   // setSelectedFile(...selectedFile,selectedFile);

//{text:val1}

//---------------------------------------------------------------------------------------------
        // try{
        //     console.log('Sending:', { text: val1, userId });
        //     const res = await axios.post('http://localhost:5555/login2',{text:val1,userId});
        //           if(res.data.success){
        //             alert("login2 Succesfully!");
        //             console.log(res.data.message);// without window.location.href = '/home2'; this console.log is worked sucessfully
        //             // console.log(res.data.user.name);
        //             // setUser({name:'',email:'',password:'',age:''});
                    
        //            // window.location.href = '/home3';
                  
        //           //navigate('/home3', { state: { message: res.data.message,message2:res.data.user.name } }); // Pass message to the next page and go to next page also,that mean without window.location.href = '/home2';
        //           }
        //           if(!res.data.success){
        //             alert(res.data.message);
        //           }
                       
      
                      
        //               // LOGIN page redirected from here
                  
        //          // console.log("register")
                 
        //   }
        //   catch(error){
        //       console.log('Error sending registration request',error);
        //   }
         
//---------------------------------------------------------------------------------------------
          
try {
    console.log("Sending data:", formData);
    const res = await axios.post("https://memoria-api.onrender.com/login2", formData, {
        headers: { "Content-Type": "multipart/form-data" }, // Important for file upload
    });

    if (res.data.success) {
        alert("Upload successful!");
        console.log("this is in post=",res.data);
        // if (selectedFile) {
        //     // setImageUrl(URL.createObjectURL(selectedFile)); // Preview the uploaded image
        //     setImageUrls((prevImages) => [...prevImages, URL.createObjectURL(selectedFile)]);
        // }
        if (res.data.image_id) {
            console.log("this is in  post ");
            console.log("this is image ID in post =",res.data.image_id);
            setImageUrls((prevImages) => [...prevImages, `https://memoria-api.onrender.com/image/${res.data.image_id}`]);
            console.log("this is after setImageUrls");
        }
    }
     else {
        alert(res.data.message);
    }
} catch (error) {
    console.log("Error sending data", error);
}

    })

     
    const message = location.state?.message || "No message received";
    const message2 = location.state?.message2 || "No message2 received";
    return(
        <>
        <p>hello {message2}</p>
         <p>this is {message}</p> 
        <p>YOU loged your Account succesfully</p>
        <input name="text" id="i1" type="text"></input>
        <input type="file" accept="image/*" onChange={(e) => setSelectedFile(e.target.files[0])} />

        <button onClick={subhandle}>Add</button>
        {/* {line.map((obj,index)=>(
            <p key={index} >{obj}</p>
        ))} */}
        {line.map((obj, index) => (
    <div key={index}>
       <p>{obj}</p> 
       </div>

))}

{/* {line2.map((imageUrl, index) => (
    <div key={index}>
       {console.log("Image value:", imageUrl)}
       {imageUrl ? (
           <img src={imageUrl} alt="Uploaded" style={{ width: "200px", border: "1px solid black" }} />
       ) : (
           <p>No Image Available</p>
       )}
    </div>
))} */}

{/* {imageUrl ? (
                <img src={imageUrl} alt="Uploaded" style={{ width: "200px", border: "1px solid black" }} />
            ) : (
                <p>No Image Available</p>
            )} */}
        ✅ Display multiple images
       {imageUrls.length > 0 ? (
                imageUrls.map((imageUrl, index) => (
                    <img key={index} src={imageUrl} alt="Uploaded" style={{ width: "200px", border: "1px solid black", margin: "10px" }} />
                ))
            ) : (
                <p>No Images Available</p>
            )} 

{/* {imageUrls.length > 0 ? (
    imageUrls.map((imageUrl, index) => (
        <img key={index} src={`http://localhost:5555/${imageUrl}`} alt="Uploaded" style={{ width: "200px", border: "1px solid black", margin: "10px" }} />
    ))
) : (
    <p>No Images Available</p>
)} */}

 {/*{imageUrls.length > 0 ? (
  imageUrls.map((imageUrl, index) => (
    <img key={index} src={imageUrl} alt="Uploaded" style={{ width: "200px", border: "1px solid black", margin: "10px" }} />
  ))
) : (
  <p>No Images Available</p>
)}*/}

{/*{imageUrls.length > 0 ? (
  imageUrls.map((imageUrl, index) => (
    // <img 
    //   key={index} 
    //   src={imageUrl}  // Ensure correct URL is used
    //   alt="Uploaded" 
    //   style={{ width: "200px", border: "1px solid black", margin: "10px" }} 
    //   onError={(e) => console.error("Image load error:", e.target.src)}
    // />
    <img 
  src={`http://localhost:5555/image/${image}`} 
//src={`http://localhost:5555/image/${imageUrl}`}
  onError={(e) => { 
    console.error(`Image load failed for ${e.target.src}`); 
    e.target.src = '/fallback-image.jpg'; // Set a default image
  }} 
  alt="User Image"
/>
  ))
) : (
  <p>No Images Available</p>
)}*/}



{/*---------------------------------------------------------------------------------------------------*/}
 { /*      {line2.map((obj, index) => (
    <div key={index}>
       {console.log(obj)}
        {obj && <img src={`http://localhost:5555/${obj}`} alt="Uploaded" style={{ width: "200px" }} />}
    </div>

))}  */}

{/* {selectedFile.map((obj, index) => (
    <div key={index}>
       {console.log(obj)}
        {obj && <img src={`http://localhost:5555/${obj}`} alt="Uploaded" style={{ width: "200px" }} />}
    </div>

))} */}

{/* {Array.isArray(line) && line.length > 0 ? (
    line.map((obj, index) => (
        <div key={index}>
            <p>{obj.text}</p>
            {obj.image && <img src={`http://localhost:5555/${obj.image}`} alt="Uploaded" style={{ width: "200px" }} />}
        </div>
    ))
) : (
    <p>No data available.</p>
)} */}
        </>
    )
}
export default Login2;