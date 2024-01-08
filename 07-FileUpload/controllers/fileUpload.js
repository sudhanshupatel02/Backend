const File = require("../models/File");

//localfileupload -> handler function

exports.localFileUpload = async (req, res) =>{
    try{
         //fetch file
         const file = req.files.file;
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

