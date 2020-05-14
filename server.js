const express = require("express");
const fileUpload = require("express-fileupload");
const { v4: uuidv4 } = require("uuid");
const app = express();

app.use(fileUpload({ safeFileNames: true }));

app.post("/upload", function (req, res) {
   // Check if no files uploaded
   if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ msg: "No files uploaded" });
   }

   // The name of the input field (i.e. "file") is used to retrive the upload file
   let file = req.files.file;
   file.name = uuidv4();
   file.mv(`${__dirname}/client/public/upload/${file.name}`, function (err) {
      if (err) return res.status(500).send(err);
      res.json({ fileName: file.name, filePath: `/upload/${file.name}` });
   });
});

app.listen(5000, () => console.log("App is listening at 5000"));
