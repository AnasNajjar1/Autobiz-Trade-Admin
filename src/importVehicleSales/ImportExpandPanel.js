import React from "react";

export const ImportExpandPanel = ({ id, record, resource }) => {
  return <div dangerouslySetInnerHTML={{ __html: record.notification }} />;
};
