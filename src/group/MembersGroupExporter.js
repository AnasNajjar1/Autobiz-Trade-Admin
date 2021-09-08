import React from "react";
import { API } from "aws-amplify";
import jsonExport from "jsonexport/dist";
import {
  downloadCSV,
  TopToolbar,
  EditButton,
  ExportButton,
  showNotification,
} from "react-admin";
import _ from "lodash";

export const ListShowActions = (props) => {
  const handleExport = async (e) => {
    let userIds = [];
    try {
      const result = await API.get(
        "b2bPlateform",
        `/admin/groupUser?filter=${JSON.stringify({
          groupMembers: props.data.id,
        })} & sort=${JSON.stringify(["id", "DESC"])}`
      );
      if (result) {
        userIds = result.map((user) => user.autobizUserId);
      }

      const members = await API.get(
        "b2bPlateform",
        `/admin/facade/User?filter=${JSON.stringify({
          id: userIds,
        })}`
      );

      jsonExport(
        members,
        {
          headers: ["id", "firstName", "lastName", "email", "companyId"],
          rename: ["RecordID", "FirstName", "LastName", "Email", "companyId"],
          typeHandlers: {
            Object: function (value, name) {
              value = _.omit(value, ["name"]);
              return value;
            },
          },
        },
        (err, csv) => {
          downloadCSV(csv, "groupMember"); // download as 'groupMember.csv` file
        }
      );
    } catch (error) {
      showNotification(error);
    }
  };

  return (
    <TopToolbar>
      <EditButton basePath={props.basePath} record={props.data} />
      <ExportButton onClick={handleExport} />
    </TopToolbar>
  );
};
