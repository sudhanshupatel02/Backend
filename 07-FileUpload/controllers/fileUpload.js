const File = require("../models/File");

//localfileupload -> handler function

exports.localFileUpload = async (req, res) =>{
    try{
         //fetch file
         const file = req.files.file;
         console.log("FILE AAGYI JEE ->",file);
         let path = __dirname + "/files/" + Data.now();   //__dirname jobhi tumari curent directry hogi wah tumara {__}drshaye ga
         console.log("PATH->", path)

        file.mv(path, (err)=>{
            console.log(err);
        });

        res.json({
            success:true,
            message:"Local File Uploaded Successfully",
        });
    }catch(error){
        console.log(error);
    }
}

