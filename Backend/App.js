import express from "express";
//import {PORT,mongoDBURL} from "./config.js";
import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();
//require("dotenv").config();

import fs from "fs";
import path from "path";

// // Ensure 'uploads' directory exists
// const uploadDir = path.join(process.cwd(), "uploads");
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
//     console.log("Uploads folder created.");
// }
import ImageModel from "./models/ImageModel.js"; // Ensure the correct file path

import multer from "multer";
import { GridFSBucket } from "mongodb";
let bucket;
//import * as path from "path";

import { Form } from './models/bookModel.js';
import { Form2 } from './models/textModel.js';
import cors from 'cors';
import bcrypt from 'bcrypt';
 

const app = express();

//app.use(cors());
//app.use(cors({ origin: "http://localhost:5000" }));
 

//const cors = require("cors");

//app.use(cors({ origin: "https://memoria-frontend.vercel.app", credentials: true }));

app.use(cors({
  origin: "https://memoria-frontend.vercel.app",
  // methods: "POST",
  // allowedHeaders: "Content-Type, Authorization"
  methods: ["GET", "POST", "PUT", "DELETE"], // Add allowed methods
    allowedHeaders: ["Content-Type", "Authorization"] // Keep this as needed
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Memoria API!");
});

app.post('/register',async(req,res)=>{ 
    try{
        const { name2,phone2, password2 } = req.body;
        const user1 = await Form.findOne({ name: req.body.name});
        const phone1 = await Form.findOne({ phone: req.body.phone });
        console.log(user1);
        console.log(phone1);
       // const password1 = await Form.findOne({ password: req.body.password });
            // !req.body.name ||
            // !req.body.phone || 
            // !req.body.password
            // !name2 || !phone2 || !password2
        if(
           
            !req.body.name ||
            !req.body.phone || 
            !req.body.password
        ){
            return res.status(400).json({message:'send all required fileds: name,phone,password',})
        }
         //if(user1.name !== name && phone1.phone !== phone && password1.password !== password){
         if(user1 === null && phone1 === null){
            const newForm ={
                name:req.body.name,
                phone:req.body.phone,
                password:req.body.password
            };
            const form = await Form.create(newForm)
            return res.status(201).json({success: true, message: 'register successful'})
        }
        if(user1 !== null || phone1 !== null){
        return res.status(201).json({success: false, message: 'same name or phone contain'})
        }
    }catch(error){
        res.status(500).json({message:error.message})
    }
})
 
app.post('/login', async (req, res) => {
    const { phone, password } = req.body;
    try {
    // Check if user exists in the database
    const user = await Form.findOne({ phone });
     console.log(user); 
    // res.json(user);
    // ok
    if (!user) {
    // User not found, send error response
  
    return res.status(201).json({ success: false, message: 'Invalid phone no or password.' });
  
    }
    // Compare passwords
    // const passwordMatch = await bcrypt.compare(password, user.password);
    // if (!passwordMatch) {
         // Passwords don't match, send error response
    //return res.status(403).json({ success: false, error: 'Invalid email or password.' });
    if (user.password === password) {
        return res.status(200).json({ success: true, message: 'Login successful',userId: user._id, user });
    } 
       // return res.status(404).json({ success: false, error: 'Invalid phone number or password.' });
       return res.status(200).json({ success: false, message: "invalid password" });
    }
      
    //res.json({ success: true, message: 'Login successful', user: user });
     catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
      }
  });
  
//   app.post('/login2',async(req,res) => {
//     try{
//         const text1= req.body.text;
//         console.log(text1);
//         if(text1 !== null){
//             const newForm ={
//                 text:req.body.text
                
//             };
//             const form = await Form2.create(newForm)
//             return res.status(201).json({success: true, message: 'login2  successful'})
//         }
//         return res.status(201).json({success: false, message: 'login2  failed'})
//     }
//     catch(error){
//         console.error('Error during login:', error);
//         res.status(500).json({ success: false, error: 'Internal server error' });
//     }
// })

//---------------------------------------------------------------------------------------------

// app.post('/login2',async(req,res) => {
//            try{
//             const text1= req.body;
//             console.log(text1);
//             // if(text1 !== null){
//             //     text1.map((obj,index)=>(
//             //         const newForm ={
//             //             text:req.body.text
                        
//             //         };
//             //         const form = await Form2.create(newForm)
//            return res.status(201).json({success: true, message: 'login2  successful'})
//             //     ))
                 
//             }
//            // return res.status(201).json({success: false, message: 'login2  failed'})
//        // }
//         catch(error){
//             console.error('Error during login:', error);
//             res.status(500).json({ success: false, error: 'Internal server error' });
//         }
//     })

//---------------------------------------------------------------------------------------------

// --------------------the bolow one is 1----------------------------------------------------------

// app.use("/uploads", express.static("uploads"));
// //app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // Multer setup for file storage
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "uploads/"); // Store images in 'uploads' folder
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
//     }
// });

// const upload = multer({ storage: storage });

// //------------------ the above one is for /login2--------------------------------------

// app.post('/login2', upload.single("image"),async(req,res) => {
//         try{
//             const text1= req.body.text;
//             const userId1 = req.body.userId;
//             const imagePath = req.file ? req.file.path : null; // Get image path
            
//             console.log(text1);
//             console.log(userId1);
//             console.log(imagePath);

//             if(text1 !== null || userId1 !== null){
//                 // const newForm ={
//                 //     UserId:req.body.userId,
//                 //     text:req.body.text
                    
//                 // };
//                // const form = await Form2.create(newForm)
//                const newEntry = new Form2({ userId:userId1, text:text1, image: imagePath });
//                             await newEntry.save();
//                 return res.status(201).json({success: true, message: 'login2  successful'})
//             }
//             return res.status(201).json({success: false, message: 'login2  failed'})
//         }
//         catch(error){
//             console.error('Error during login:', error);
//             res.status(500).json({ success: false, error: 'Internal server error' });
//         }
//     })

//         --------------------the above one is 1------------------------------------------

// Serve images statically
//app.use("/uploads", express.static("uploads"));

// app.get('/login2',async(req,res) => {
//     try{
//         const text= Form.findAll({});
//         return res.status(200).json({ success: true, message: "data transfer",text });
//     }
//     catch(error){
//         console.error('Error during login:', error);
//         res.status(500).json({ success: false, error: 'Internal server error' });
//     }
// })

// const express = require("express");
// const multer = require("multer");
// const mongoose = require("mongoose");
// const { GridFSBucket } = require("mongodb");


// Set up Express app
 
 

// // MongoDB Connection
// const mongoURI = "mongodb://localhost:27017/mydatabase"; // Replace with your MongoDB URI
// mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

//const db1 = mongoose.connection;

// // User Schema (for storing email, text, and image reference)
// const userSchema = new mongoose.Schema({
//   userId: { type: String, required: true },
//   text: String,
//   profile_image_id: { type: mongoose.Schema.Types.ObjectId, ref: "fs.files" }, // Store the GridFS file ID
// });

//const User = mongoose.model("User", userSchema);

// Set up GridFS for storing files
//const bucket = new GridFSBucket(db1.db, { bucketName: "uploads" });


// //----------------------------------------------------------------
// const db = mongoose.connection.db;
// const bucket = new GridFSBucket(db);

// // Set up multer to handle file uploads
// const storage = multer.memoryStorage(); // Store files temporarily in memory
// const upload = multer({ storage });

// // API endpoint to handle login and image upload
// app.post("/login2", upload.single("image"), async (req, res) => {
//   try {
//     // Check if file exists in the request
//     if (!req.file) {
//       return res.status(400).send("No file uploaded.");
//     }

//     // Retrieve form data from request body
//     const { text, userId } = req.body;

//     // Open upload stream to save the image file to GridFS
//     const uploadStream = bucket.openUploadStream(req.file.originalname);
//     uploadStream.end(req.file.buffer); // Write the file buffer to GridFS

//     uploadStream.on("finish", async () => {
//       const fileId = uploadStream.id; // Get the file ID from GridFS

//       // Find the user by userId and save the text and image file reference (fileId)
//       const user = await Form2.findOneAndUpdate(
//         { userId: userId },
//         { text: text, profile_image_id: fileId }, // Save the file ID in the user document
//         { new: true } // Return the updated user document
//       );

//       if (!user) {
//         return res.status(404).json({ success: false, message: "User not found" });
//       }

//       // Return a success response with user data and image file ID
//       return res.status(200).json({
//         success: true,
//         message: "Image uploaded and user updated successfully.",
//         image_id: fileId,
//         user: user,
//       });
//     });

//     uploadStream.on("error", (err) => {
//       console.error("Error uploading image:", err);
//       res.status(500).send("Error uploading image: " + err.message);
//     });
//   } catch (error) {
//     console.error("Error in the upload process:", error);
//     res.status(500).send("Server error: " + error.message);
//   }
// });
//-----------------------------------------------------------------

// // Start the server
// const PORT = 5555;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });


// app.get('/user-data/:userId', async (req, res) => {
//     try {
//         const { userId } = req.params;
//         const userData = await Form2.find({ userId });
//         res.status(200).json({ success: true, data: userData });
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         res.status(500).json({ success: false, error: 'Internal server error' });
//     }
// });

// app.get('/user-data/:userId', async (req, res) => {
//     try {
//         const { userId } = req.params;
//         console.log("get userId ",userId)
//         // Find the user by userId
//         const user = await Form2.find({ userId });

//         if (!user) {
//             return res.status(404).json({ success: false, message: "User not found" });
//         }

//         // If the user has a profile_image_id, fetch the image from GridFS
//         if (user.profile_image_id) {
//             const file = await bucket.find({ _id: user.profile_image_id }).toArray();

//             if (file.length === 0) {
//                 return res.status(404).json({ success: false, message: "Image not found" });
//             }

//             // Get the file from GridFS
//             const downloadStream = bucket.openDownloadStream(user.profile_image_id);
//             res.setHeader('Content-Type', file[0].contentType);  // Set correct content type based on file
//             downloadStream.pipe(res);  // Pipe the file stream to the response
//         } else {
//             return res.status(200).json({ success: true, data: user });  // Return user data without image
//         }
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         res.status(500).json({ success: false, error: 'Internal server error' });
//     }
// });

/* app.get('/user-data/:userId', async (req, res) => {
  // try {
  //     const { userId } = req.params;
  //     console.log("Fetching user data for:", userId);

  //     // Find the user
  //     const user = await Form2.findOne({ userId });

  //     if (!user) {
  //         return res.status(404).json({ success: false, message: "User not found" });
  //     }

  //     let imageUrl = null;
      
  //     // Check if the user has an image
  //     if (user.profile_image_id) {
  //         // Create an endpoint URL to fetch the image separately
  //         imageUrl = `http://localhost:5555/image/${user.profile_image_id}`;
  //     }

  //     // Return JSON response with text and image URL
  //     return res.status(200).json({ 
  //         success: true, 
  //         data: [
  //           { 
  //             text: user.text, 
  //             image: imageUrl 
  //         } 
  //         ]
  //     });

  // } catch (error) {
  //     console.error('Error fetching user data:', error);
  //     res.status(500).json({ success: false, error: 'Internal server error' });
  // }

  try {
    const { userId } = req.params;
    const userData = await Form2.find({ userId });
    res.status(200).json({ success: true, data: userData });
} catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
}
});   */


// app.get('/user-data/:userId', async (req, res) => {
//   try {
//       const { userId } = req.params;
//       console.log("Fetching user data for:", userId);

//       // Find all entries for this user
//       const userEntries = await Form2.find({ userId });

//       if (!userEntries || userEntries.length === 0) {
//           return res.status(404).json({ success: false, message: "User not found or no data available" });
//       }

//       // Format the response to return both text and image URLs
//       const formattedData = userEntries.map(entry => ({
//           text: entry.text,
//           image: entry.profile_image_id ? `http://localhost:5555/image/${entry.profile_image_id}` : null
//       }));

//       return res.status(200).json({ success: true, data: formattedData });

//   } catch (error) {
//       console.error('Error fetching user data:', error);
//       res.status(500).json({ success: false, error: 'Internal server error' });
//   }
// });


/*app.get('/user-data/:userId', async (req, res) => {
  try {
      const { userId } = req.params;  // Retrieve userId from URL params
      console.log("Fetching user data for userId:", userId);

      // Query the database for entries matching the userId
      const userEntries = await Form2.find({ userId });

      // If no user entries are found, return 404 error
      if (!userEntries || userEntries.length === 0) {
          return res.status(404).json({ success: false, message: "User not found or no data available" });
      }

      // Map the user entries to return an array with text and image URL
      const formattedData = userEntries.map(entry => ({
          text: entry.text,  // Include the text
          //image: entry.profile_image_id ? `http://localhost:5555/image/${entry.profile_image_id}` : null  // Handle image if it exists
          image: entry.profile_image_id ? `http://localhost:5555/image/${entry.profile_image_id}` : null  // Construct image URL if exists
      }));

      // Return the formatted response
      return res.status(200).json({ success: true, data: formattedData });

  } catch (error) {
      // Catch any errors and return a 500 Internal Server Error
      console.error('Error fetching user data:', error);
      return res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
}); */


// app.get('/user-data/:userId', async (req, res) => {
//   try {
//       const userId = req.params.userId;
//       console.log("Fetching data for user:", userId);

//       const user = await Form2.findOne({userId: userId});  // Make sure this fetches user data

//       if (!user) {
//         console.log("user not found in database.")
//           return res.status(404).json({ success: false, message: "User not found" });
//       }

//       console.log("User Data in backend:", user);  // Debugging line

//       res.json({
//           success: true,
//           image_id:user.profile_image_id,
//           data: {
//               userId: user._id,
//               text: user.text,  // Assuming you have text field
//               profile_image_id: user.profile_image_id || null,  // Make sure this is in the response
//           }
//       });
//   } catch (error) {
//       console.error("Error fetching user data:", error);
//       res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// });


app.get('/user-data/:userId', async (req, res) => {
  try {
      // const userId = req.params.userId;
      // console.log("Fetching data for user:", userId);

      // const user = await Form2.findOne({userId: userId});  // Make sure this fetches user data
      const { userId } = req.params;
        const userData = await Form2.find({ userId });

      if (!userData) {
        console.log("user not found in database.")
          return res.status(404).json({ success: false, message: "User not found" });
      }

      console.log("User Data in backend:", userData);  // Debugging line

     return res.json({
          success: true,
          // image_id:user.profile_image_id,
          // data: {
          //     userId: user._id,
          //     text: user.text,  // Assuming you have text field
          //     profile_image_id: user.profile_image_id || null,  // Make sure this is in the response
          // }
          data:userData,
      });
  } catch (error) {
      console.error("Error fetching user data:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});






// app.get('/image/:id', async (req, res) => {
//   try {
//       const { id } = req.params;

//       // Ensure GridFS bucket is initialized
//       if (!bucket) {
//           return res.status(500).json({ success: false, message: "GridFS bucket not initialized" });
//       }

//       // Find the image in GridFS
//       const file = await bucket.find({ _id: new mongoose.Types.ObjectId(id) }).toArray();

//       if (!file || file.length === 0) {
//           return res.status(404).json({ success: false, message: "Image not found" });
//       }

//       // Set correct content type
//       res.setHeader('Content-Type', file[0].contentType);

//       // Pipe the file stream to the response
//       const downloadStream = bucket.openDownloadStream(new mongoose.Types.ObjectId(id));
//       downloadStream.pipe(res);

//   } catch (error) {
//       console.error('Error fetching image:', error);
//       res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// });


//  app.get('/image/:id', async (req, res) => {
//  /* const { id } = req.params;
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).send("Invalid image ID format");
//   }
//   //const image = await ImageModel.findOne({profile_image_id:id});  // Check how you're retrieving images
//   const objectId = new mongoose.Types.ObjectId(id); // Convert to ObjectId

//   const image = await ImageModel.findOne({ profile_image_id: objectId });
//   if (!image) return res.status(404).send('Image not found');  */

//   const imageId = req.params.id;
//         const image = await ImageModel.findById(imageId); // Fetch from MongoDB

//         if (!image) {
//             return res.status(404).send("Image not found");
//         }

//   res.contentType(image.contentType);
//   res.send(image.data);
// });   

// app.get('/image/:id', async (req, res) => {
//   const imageId = req.params.id;
//   console.log("image Id in get-image =",imageId);
//   try {
//       //const image = await Form2.findById(imageId); // Assuming Mongoose is used
//       const image = await Form2.findOne({profile_image_id: imageId}); // Assuming Mongoose is used
//       console.log("Retrieved Image:", image);
//       if (!image) {
//           return res.status(404).send("Image not found");
//       }
//       res.contentType(image.contentType); // Set the correct content type
//       res.send(image.data); // Send image binary data
//   } catch (error) {
//       console.error("Error retrieving image:", error);
//       res.status(500).send("Internal Server Error");
//   }
// });


app.get('/image/:id', async (req, res) => {
  const imageId = req.params.id;
  console.log("image Id in get-image =", imageId);

  try {

     

    // Retrieve the image from GridFS using the provided ID
    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: 'uploads' // This should match your GridFS collection name
    });

    const downloadStream = bucket.openDownloadStream(new mongoose.Types.ObjectId(imageId));

    // Handle errors if the image is not found
    downloadStream.on('error', (err) => {
      console.error("Error retrieving image:", err);
      return res.status(404).send("Image not found");
    });

    // Pipe the image stream to the response
    res.setHeader('Content-Type', 'image/jpeg'); // You may need to adjust based on your image type
    downloadStream.pipe(res);
  } catch (error) {
    console.error("Error retrieving image:", error);
    res.status(500).send("Internal Server Error");
  }
});




const mongoUri = process.env.MONGO_URI;
//mongoose.connect(mongoDBURL)
mongoose.connect(mongoUri)
    .then(() =>{
        console.log("App connected to database")
//         // const db = mongoose.connection.db;
//         // const bucket = new GridFSBucket(db);
//         const conn = mongoose.connection;
//         let bucket;

// conn.once('open', () => {
//     bucket = new GridFSBucket(conn.db, { bucketName: 'uploads' });
//     console.log("GridFS bucket initialized");
// });

        const conn = mongoose.connection;
        const bucket = new GridFSBucket(conn.db, { bucketName: 'uploads' }); // Initialize bucket
       console.log(bucket);

// Set up multer to handle file uploads
const storage = multer.memoryStorage(); // Store files temporarily in memory
const upload = multer({ storage });

// API endpoint to handle login and image upload
app.post("/login2", upload.single("image"), async (req, res) => {
  try {
    // Check if file exists in the request 
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    // Retrieve form data from request body
    const { text, userId } = req.body;
     console.log(text);
     console.log(userId);

     const userExists = await Form2.findOne({ userId: userId });
           console.log("User exists:", userExists);


    // Open upload stream to save the image file to GridFS
    const uploadStream = bucket.openUploadStream(req.file.originalname);
    uploadStream.end(req.file.buffer); // Write the file buffer to GridFS

    uploadStream.on("finish", async () => {
      const fileId = uploadStream.id; // Get the file ID from GridFS

      // Find the user by userId and save the text and image file reference (fileId)
      // const user = await Form2.findOneAndUpdate(
      //   { userId: userId },
      //   { text: text, profile_image_id: fileId }, // Save the file ID in the user document
      //   { new: true } // Return the updated user document
      // );

     /* const user = new Form2({ userId:userId, text:text,profile_image_id:fileId });
      await user.save(); */

      // Save the user entry with text and image file reference (fileId)
      const user = new Form2({
        userId: userId,
        text: text,
        profile_image_id: fileId, // Save the image file ID in the database
      });

      // Save the user entry to the database
      await user.save();


console.log(user)
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }

      // Return a success response with user data and image file ID
      return res.status(200).json({
        success: true,
        message: "Image uploaded and user updated successfully.",
        image_id: fileId, 
        user: user,
      });
    });

    uploadStream.on("error", (err) => {
      console.error("Error uploading image:", err);
      res.status(500).send("Error uploading image: " + err.message);
    });
  } catch (error) {
    console.error("Error in the upload process:", error);
    res.status(500).send("Server error: " + error.message);
  }
});

//const port = process.env.PORT || 5555;
const PORT = process.env.PORT;
        app.listen(PORT,()=>{
            console.log(`App is listening to port: ${PORT} `);
        })
         
    })
    .catch((error)=>{
        console.log(error)
    })
