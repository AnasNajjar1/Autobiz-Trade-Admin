import React from "react";
import { withStyles } from "@material-ui/core/styles";
const styles = {
  logValue: {
    fontWeight: "bold",
  },
};
export const LogPanel = withStyles(styles)(({ classes, record }) => {
  return (
    <table>
      {record &&
        record.data &&
        Object.entries(record.data).map(([key, value]) => {
          switch (value) {
            case true:
              value = "true";
              break;
            case false:
              value = "false";
              break;
            default:
              break;
          }
          return (
            <tr>
              <td>{key}:</td>
              <td className={classes.logValue}>{value}</td>
            </tr>
          );
        })}
    </table>
  );
});
