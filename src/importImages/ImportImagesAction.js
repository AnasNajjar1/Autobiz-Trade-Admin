import React from "react";
import { TopToolbar } from "react-admin";
import { ArchivedFileUploader } from "../components/ArchivedFileUploader";

export const ImportImagesListActions = (props) => {
  return (
    <TopToolbar>
      <ArchivedFileUploader />
    </TopToolbar>
  );
};
