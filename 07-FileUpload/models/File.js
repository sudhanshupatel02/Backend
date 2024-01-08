const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  imageUrl: {
    type: String,
  },
  tags: {
    type: String,
  },
  email: {
    type: String,
  }
});

//post middleware
fileSchema.post("save", async function(doc){
  try{
       console.log("DOC", doc)

       //transporter
       //TODO: shift this confiquration under /config Folder 
       let transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        auth:{
          user:process.env.MAIL_USER,
          pass:process.env.MAIL_PASS,
        },
       });

       //send mail
       const info = await transporter.sendMail({
        from: `StudyNotion`, // sender address
        to: doc.email, // list of receivers
        subject: "New File Uploaded on Cloudinary ✔", // Subject line
        html: `<b>Hello world?</b> <p>File Uploaded View here: <a href="${doc.imageUrl}">${doc.imageUrl}</a> </p>`, // html body
      });

      console.log("INFO", info);

  }
  catch(error){
       console.error(error);
  }
})

const File = mongoose.model("File", fileSchema);
module.exports = File;
