import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from './routes/posts.js';
import {createPost} from "./controllers/posts.js"
import { registers } from "./controllers/auth.js";
import { verifyToken } from "./middleware/auth.js";
import User from "./models/user.js";
import Post from "./models/post.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import config from "config";

const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit: "40mb" , extended:true}));
app.use(bodyParser.urlencoded({limit:"40mb", extended:true}));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

/* storage */

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,"public/assets");
    },
    filename:function(req,file,cb){
        cb(null, file.originalname);
    }
});

const upload = multer({storage});

app.post("/auth/register", upload.single("picture"),verifyToken, registers);
app.post("/posts", verifyToken,upload.single("picture"), createPost)

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

const PORT = process.env.PORT || 6001; 

// mongoose.connect(, {
//     useNewUrlParser : true,
//     useUnifiedTopology : true,
// }).then(()=>{
//     app.listen(PORT, ()=> console.log('server port: ', PORT));
    
// }).catch((error) => console.log('${error} did not connect'));

const mongooseIns =mongoose.connect(config.get("dbconfig").url, { useNewUrlParser: true, useUnifiedTopology: true });
mongooseIns.then(() => {
	console.log("Connection success");
}).catch((err) => {
	console.log(err);
})
