//app create
const express =  require('express'); 
const app = express();

//PORT find krna h
require("dotenv").config();
const PORT = process.env.PORT || 3000;

//middleware add krne h
app.use(express.json());

const fileupload = require("express-fileupload")  //!file se intrect(packeg install{packeg name:- npm i express-fileupload})
app.use(fileupload());
//db se connect krna h
const db = require("./config/database")
db.connect();

//cloud se connect krna h
const cloudinary = require("./config/cloudinary")
cloudinary.cloudinaryConnect();

//api route mount krna h
const Upload = require("./routes/Fileupload");
app.use("/api/v1/upload",Upload);

//activate server
app.listen(PORT,() => {
    console.log(`Server Run at ${PORT}`);
})