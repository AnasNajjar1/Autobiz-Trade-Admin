import React, { useCallback, useState } from "react";
import { TextInput, regex } from "react-admin";
import { useField, useForm } from "react-final-form";
import awsconfig from "../aws-config";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { httpClientAWS } from "../dataprovider";

const S3CustomUploader = ({ source, label, type = "image" }) => {
  const b2bUploadPublicUrl = `https://${awsconfig.Storage.bucket}.s3-${awsconfig.Storage.region}.amazonaws.com/`;
  const form = useForm();
  const field = useField();
  const value = field.input.value;
  const src = Object.byString(value, source);
  const fileExtention = src ? checkExtension(src) : "";
  const [zoomImage, setZoomImage] = useState(false);

  const validateURL = regex(
    new RegExp("^https*://.*\\.[a-z].{2,3}"),
    "Must be an URL"
  );

  function convertFileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  }

  const showLightbox = useCallback(() => setZoomImage(true), []);
  const hideLightbox = useCallback(() => setZoomImage(false), []);
  const handleChangeImage = useCallback(
    async (fileObj) => {
      try {
        const imgBase64 = await convertFileToBase64(fileObj[0]);
        const result = await httpClientAWS("/admin/image", {
          method: "POST",
          body: JSON.stringify({
            image: imgBase64,
            bucket: awsconfig.Storage.bucket,
          }),
        });
        return form.change(source, b2bUploadPublicUrl + result.json.path);
      } catch (err) {
        console.log(err);
      }
    },
    [b2bUploadPublicUrl, form, source]
  );

  return (
    <div>
      <div style={{ marginBottom: "15px" }}>
        {fileExtention === "img" && (
          <div>
            <img
              src={src}
              style={{ maxWidth: "300px" }}
              onClick={showLightbox}
            ></img>
            {zoomImage && (
              <Lightbox mainSrc={src} onCloseRequest={hideLightbox} />
            )}
          </div>
        )}

        <TextInput label={label} source={source} validate={validateURL} />
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
          accept={type === "image" ? "image/*" : ""}
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
    if (o && k in o) {
      o = o[k];
    } else {
      return;
    }
  }
  return o;
};

const checkExtension = (file) => {
  var extension = file.substr(file.lastIndexOf(".") + 1);
  switch (extension) {
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
      return "img"; // There's was a typo in the example where
    case "mp4":
    case "mp3":
    case "ogg":
      return "video";
    case "html":
      return "html";
  }
};

export default S3CustomUploader;
