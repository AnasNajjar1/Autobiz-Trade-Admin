import React from "react";
import { TopToolbar } from "react-admin";
import { FileUploader } from "../components/FileUploader";

export const ImportVehicleSalesAction = (props) => {
  return (
    <TopToolbar>
      <FileUploader />
    </TopToolbar>
  );
};
