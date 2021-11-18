import React from "react";
import { API } from "aws-amplify";
import jsonExport from "jsonexport/dist";
import {
  downloadCSV,
  TopToolbar,
  EditButton,
  showNotification,
  Button,
} from "react-admin";
import _ from "lodash";
import { SvgIcon } from "@material-ui/core";

export const ListShowActions = (props) => {
  const handleExport = async (e) => {
    let userIds = [];
    try {
      const result = await API.get(
        "b2bPlateform",
        `/admin/groupUser?filter=${JSON.stringify({
          groupMembers: props.data.id,
        })}&sort=${JSON.stringify(["id", "DESC"])}&range=${JSON.stringify([
          0, 1000,
        ])}`
      );
      if (result) {
        userIds = result.map((user) => user.autobizUserId);
      }
      const members = await API.get(
        "b2bPlateform",
        `/admin/facade/User?filter=${JSON.stringify({ id: userIds })}`
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
      <Button
        color="primary"
        size="small"
        onClick={handleExport}
        label={"ra.action.export"}
      >
        <SvgIcon>
          <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
        </SvgIcon>
      </Button>
    </TopToolbar>
  );
};
