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

async function uploadFileToCloudinary(file, folder, quality){
    const options = {folder};
    console.log("temp file poth", file.tempFilePath);

    if(quality){
        options.quality = quality; //imageSizeReducer
    }

    options.resource_type = "auto" //importent video upload
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}
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
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type:", fileType);

        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message:'File format not supported',
            })
        }

        //file format supported hai
        console.log("Uploading to StudyNotion")
        const response = await uploadFileToCloudinary(file, "StudyNotion");
        console.log(response);

        //db me entry save krni h
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        })
        
        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:'Image Successfully Uploaded',
        })
    }
    catch(error){
     console.error(error);
     res.status(400).json({
        success:false,
        message:'Something went wrong',
     })
    }
}


//video upload ka hadler
exports.videoUpload = async (req, res) =>{
    try{
        //data fetch
        const {name, tags, email} = req.body;
        console.log(name,tags,email);

        const file = req.files.videoFile;
        console.log(file);

        //validation
        const supportedTypes = ["mp4", "mov"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type:", fileType);
        
        //TODO: add a upper limit of 5mb for video
        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message:'File format not supported',
            })
        }

        //file format supported hai
        console.log("Uploading to StudyNotion")
        const response = await uploadFileToCloudinary(file, "StudyNotion");
        console.log(response);

        //db me entry save krni h
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        })
        
        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:'video Successfully Uploaded',
        })
    }
    catch(error){
     console.error(error);
     res.status(400).json({
        success:false,
        message:'Something went wrong',
     })
    }
}


//imageSizeReducer

exports.imageSizeReducer = async (req, res) =>{
    try{
        //data fetch
        const {name, tags, email} = req.body;
        console.log(name,tags,email);

        const file = req.files.imageFile;
        console.log(file);

        //validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type:", fileType);

         //TODO: add a upper limit of 5mb for video
        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message:'File format not supported',
            })
        }

        //file format supported hai
        console.log("Uploading to StudyNotion")
        // TODO: Height attribute--> COMPRESS
        const response = await uploadFileToCloudinary(file, "StudyNotion", 90);
        console.log(response);

        //db me entry save krni h
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        })
        
        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:'Image Successfully Uploaded',
        })
    }
    catch(error){
     console.error(error);
     res.status(400).json({
        success:false,
        message:'Something went wrong',
     })
    }
}