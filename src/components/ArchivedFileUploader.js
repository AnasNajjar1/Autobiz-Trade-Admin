import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { CloudUpload, CloudUploadOutlined } from "@material-ui/icons";
import { API } from "aws-amplify";
import { Storage } from "aws-amplify";
import awsconfig from "../aws-config";
import auth from "../providers/Auth";
import { useRefresh, useNotify } from "react-admin";
import { v4 as uuid_v4 } from "uuid";

export const ArchivedFileUploader = () => {
  const notify = useNotify();
  const refresh = useRefresh();
  const b2bUploadPublicUrl = `https://${awsconfig.Storage.bucket}.s3-${awsconfig.Storage.region}.amazonaws.com/public/`;

  const onDrop = useCallback(async (fileObj) => {
    try {
      const extension = ["zip", "rar"];
      const fileExtension = fileObj[0].name.split(".").pop();

      if (!extension.includes(fileExtension))
        throw Error("wrong file extension");

      const fileUuid = uuid_v4();
      const filename = `archive/${fileUuid}.${fileExtension}`;
      const result = await Storage.put(filename, fileObj[0], {
        contentType: fileObj[0].type,
        ACL: "public-read",
      });

      const link = b2bUploadPublicUrl + result.key;

      await API.post("b2bPlateform", "/admin/import/image", {
        body: {
          link,
          uuid: fileUuid,
        },
      });
      notify("file uploaded", "info");
      refresh();
    } catch (e) {
      if (
        e.statusCode === 403 ||
        JSON.parse(JSON.stringify(e)).code === "CredentialsError"
      ) {
        await auth
          .refreshToken()
          .then(async () => {
            await auth.federateSignInCognito();
            refresh();
          })
          .catch((err) => console.log(err));
      }
      notify(
        `${e.message ? `${e.message}` : `file not uploaded please retry`}`,
        "error"
      );
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
