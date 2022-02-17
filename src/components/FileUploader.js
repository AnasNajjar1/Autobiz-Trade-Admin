import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { CloudUpload, CloudUploadOutlined } from "@material-ui/icons";
import { API } from "aws-amplify";
import { useRefresh, useNotify } from "react-admin";

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const FileUploader = () => {
  const notify = useNotify();
  const refresh = useRefresh();
  const onDrop = useCallback(async (file) => {
    try {
      if (file[0].name.split(".").pop() !== "xlsx")
        throw Error("wrong file extension");
      const data = await toBase64(file[0]);
      await API.post("b2bPlateform", "/admin/import/vehicle", {
        body: { fileBase64: data },
      });
      notify("file uploaded", "info");
      refresh();
    } catch (e) {
      notify(`${e.message ? `${e.message}` : `file not uploaded`}`, "error");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? <CloudUploadOutlined /> : <CloudUpload />}
    </div>
  );
};
