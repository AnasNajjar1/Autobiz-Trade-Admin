import React, { useCallback } from "react";
import { TextInput, ImageField, regex } from "react-admin";
import { useField, useForm } from "react-final-form";
import { Storage } from "aws-amplify";
import awsconfig from "../aws-config";

const S3CustomUploader = ({source, label, type="image"}) => {
  const b2bUploadPublicUrl = `https://${awsconfig.Storage.bucket}.s3-${awsconfig.Storage.region}.amazonaws.com/public/`;
  const form = useForm();
  const field = useField();
  const value = field.input.value;
  const src = Object.byString(value, source);
  const fileExtention = src ? checkExtension(src) : "";


  const getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };

  const validateURL = regex(new RegExp("^https*://.*\\.[a-z].{2,3}"),"Must be an URL");

  const handleChangeImage = useCallback(
    (fileObj) => {
      getBase64(fileObj[0], (result) => {
        let filename = new Date().getTime();
        const extension = fileObj[0].name.match(new RegExp("[^.]+$"));
        filename = filename + "." + extension;
        Storage.put(filename, fileObj[0], {
          contentType: fileObj[0].type,
          ACL: "public-read",
        })
          .then((result) => {
            form.change(source, b2bUploadPublicUrl + result.key);
          })
          .catch((err) => console.log(err));
      });
    },
    [b2bUploadPublicUrl, form, source]
  );

  return (
    <div>
      <div style={{ marginBottom: "15px" }}>
        {fileExtention === "img" && (
          <div>
            <img src={src} style={{ maxWidth: "300px" }}></img>
          </div>)
        }

        <TextInput label={label} source={source} validate={validateURL}/>
        <label
          for={`file${source}`}
          style={{
            fontFamily: "Arial",
            padding: "15px",
            backgroundColor: "#E1E4EA",
            fontWeight: "bold",
            cursor: "pointer",
            border: "0px",
            position: "relative",
            top: "22px",
            left: "15px",
          }}
        >
          Upload {type}
        </label>
        <input
          id={`file${source}`}
          type="file"
          accept={type === 'image' ? "image/*" : ""}
          style={{ display: "none" }}
          onChange={(e) => handleChangeImage(e.target.files)}
        ></input>
      </div>
    </div>
  );
};

Object.byString = function (o, s) {
  s = s.replace(/\[(\w+)\]/g, ".$1"); // convert indexes to properties
  s = s.replace(/^\./, ""); // strip a leading dot
  var a = s.split(".");
  for (var i = 0, n = a.length; i < n; ++i) {
    var k = a[i];
    if(o && k in o){
      o = o[k];
    }else{
      return;
    }
  }
  return o;
};

const checkExtension = (file)  => {
  var extension = file.substr((file.lastIndexOf('.') + 1));
  switch (extension) {
  case 'jpg':
  case 'jpeg':
  case 'png':
  case 'gif':
      return "img" // There's was a typo in the example where
      break; // the alert ended with pdf instead of gif.
  case 'mp4':
  case 'mp3':
  case 'ogg':
      return "video"
      break;
  case 'html':
      return "html"
      break;

  }
};

export default S3CustomUploader;
