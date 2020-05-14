import React, { Fragment, useState } from "react";
import axios from "axios";
import Message from "./Message";
import ProgressBar from "./ProgressBar";

const FileUpload = () => {
   const [file, setFile] = useState("");
   const [filename, setFileName] = useState("Choose File");
   const [uploadedFile, setUploadedFile] = useState({});
   const [message, setMessage] = useState("");
   const [percentage, setPercentage] = useState(0);

   const onChange = (e) => {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
   };

   const onSubmit = async (e) => {
      e.preventDefault();
      if (!file) {
         setMessage("No file upload");
         return;
      }

      const formData = new FormData();
      formData.append("file", file);

      try {
         const res = await axios.post("/upload", formData, {
            headers: {
               "Content-Type": "multipart/form-data"
            },
            onUploadProgress: (progressEvent) => {
               setPercentage(parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total)));
               setTimeout(() => {
                  setPercentage(0);
                  setFileName("Choose File");
                  setMessage("");
               }, 10000);
            }
         });
         const { fileName, filePath } = res.data;
         setUploadedFile({ fileName, filePath });
         setMessage("File Uploaded Successfully.");
      } catch (err) {
         if (err.response.status === 500) setMessage("There was a problem with the serever");
         if (err.response.status === 400) setMessage("Bad Reqest");
         setMessage(err.response.data.msg);
      }
   };
   return (
      <Fragment>
         {message ? <Message message={message} /> : null}
         <form onSubmit={onSubmit}>
            <div className="custom-file mb-4">
               <input type="file" className="custom-file-input" id="customFile" onChange={onChange} />
               <label className="custom-file-label" htmlFor="customFile">
                  {filename}
               </label>
            </div>
            <ProgressBar percentage={percentage} />
            <input type="submit" className="btn btn-primary btn-block mt-4" value="Submit" />
         </form>
         {uploadedFile.filePath ? (
            <div className="row mt-5">
               <div className="m-auto">
                  {/* <h3 className="text-center">{uploadedFile.fileName}</h3> */}
                  <img src={uploadedFile.filePath} alt="" className="card-img-bottom img-thumbnail rouded mx-auto d-block" />
               </div>
            </div>
         ) : null}
      </Fragment>
   );
};

export default FileUpload;
