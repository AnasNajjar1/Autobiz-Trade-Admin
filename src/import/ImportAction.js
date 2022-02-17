import React from "react";
import { TopToolbar } from "react-admin";
import { FileUploader } from "../components/FileUploader";

export const ImportListActions = (props) => {
  return (
    <TopToolbar>
      <FileUploader />
    </TopToolbar>
  );
};
