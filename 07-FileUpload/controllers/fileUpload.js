const File = require("../models/File");
const cloudinary = require("cloudinary").v2

//localfileupload -> handler function

exports.localFileUpload = async (req, res) =>{
    try{
         //fetch file
         const file = req.files.file; //file ka name file h
         console.log("FILE AAGYI JEE ->",file);

         //create path where file need to be stared on server
         let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;   //__dirname jobhi tumari curent directry hogi wah tumara {__}drshaye ga
         console.log("PATH->", path)

         //add poth to the move function
        file.mv(path, (err)=>{
            console.log(err);
        });

        //create a successful response
        res.json({
            success:true,
            message:"Local File Uploaded Successfully",
        });
    }catch(error){
        console.log(error);
    }
}


function isFileTypeSupported(type, supportedTypes){
    return supportedTypes.includes(type);
}

a
//image upload ka hadler
exports.imageUpload = async (req, res) =>{
    try{
        //data fetch
        const {name, tags, email} = req.body;
        console.log(name,tags,email);

        const file = req.files.imageFile;
        console.log(file);

        //validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1]

        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message:'File format not supported',
            })
        }

        //file format supported hai
        
    }catch(error){

    }
}




