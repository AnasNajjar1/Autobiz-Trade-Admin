import React, { useCallback } from "react";
import { TextInput, ImageField } from "react-admin";
import { useField, useForm } from "react-final-form";
import { Storage } from "aws-amplify";
import awsconfig from "../aws-config";

const S3CustomUploader = (props) => {
  const b2bUploadPublicUrl = `https://${awsconfig.Storage.bucket}.s3-${awsconfig.Storage.region}.amazonaws.com/public/`;
  const form = useForm();
  const field = useField();

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
            form.change(props.source, b2bUploadPublicUrl + result.key);
          })
          .catch((err) => console.log(err));
      });
    },
    [form]
  );

  const imgSrc = Object.byString(field.input.value, props.source);

  return (
    <div>
      <div style={{ marginBottom: "15px" }}>
        <div>
          <img src={imgSrc} style={{ maxWidth: "300px" }}></img>
        </div>

        <TextInput label={props.label} source={props.source} />
        <label
          for={`file${props.source}`}
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
          Upload image
        </label>
        <input
          id={`file${props.source}`}
          type="file"
          accept="image/*"
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
    if (k in o) {
      o = o[k];
    } else {
      return;
    }
  }
  return o;
};

export default S3CustomUploader;
