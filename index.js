const express = require("express");
const app =express();
const cors= require("cors")
app.use(cors())
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute= require("./routes/users");
const authRoute= require("./routes/auth");
const postRoute= require("./routes/posts");
const multer = require("multer")
const path = require("path")

dotenv.config();
app.use("/images", express.static(path.join(__dirname, "public/images")));

mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser: true},()=>{
console.log("connected to mongoDB")
});

// midleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "public/images");
    },
    filename:(req,file,cb)=>{
        cb(null,req.body.name);
    },
})
const upload =multer({storage});


app.post("/api/upload", upload.single("file"), (req,res)=>{

    try{
        return res.status(200).json("File uploaded successfully")
    }catch(err){

    }
})


app.use("/api/users",userRoute)
app.use("/api/auth",authRoute)

app.use("/api/posts",postRoute)



// listen port
app.listen(8000,()=>{
    console.log("Backend server is running");


    
})