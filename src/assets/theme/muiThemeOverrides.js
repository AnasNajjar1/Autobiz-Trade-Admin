import { createMuiTheme } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";

import facitRegular from "../fonts/facit-regular.woff";

export const muiThemeOverrides = createMuiTheme({
  palette: {
    primary: {
      main: "#324c89",
    },
    secondary: {
      main: "#83ff33",
    },
    error: red,
  },
  typography: {
    fontFamily: ["facitRegular", "sans-serif"].join(","),
    fontSize: 13,
  },
  Input: {
    backgroundColor: "#83ff33",
  },
  overrides: {
    MuiTab: {
      root: {
        padding: "5px",
        textTransform: "capitalize",
        fontSize: "0.75rem",
        minWidth: 0,
        "@media (min-width: 0px)": {
          minWidth: 0,
        },
      },
      labelContainer: {
        paddingLeft: "10px !important",
        paddingRight: "10px !important",
        textTransform: "capitalize",
      },
    },
    MuiFormControl: {
      root: {
        width: "50% !important",
      },
    },
    MuiToolbar: {
      backgroundColor: "red",
      minHeight: 130,
    },
    MuiTableCell: {
      root: {
        fontSize: "0.75rem",
      },
      sizeSmall: {
        padding: "5px",
      },
    },
    MuiButton: {
      root: {
        borderRadius: "30px",
        padding: "14px 30px",
        margin: "15px 5px",
        fontSize: 16,
        fontWeight: "bold",
        textTransform: "capitalize",
      },
    },

    /*,
       MuiInput: {
      root: {
        border:"1px solid #e5e5e7 !important",
        borderBottom:"1px solid #e5e5e7 !important",
        borderRadius: "5px",
        paddingLeft: 5,
        paddingRight: 5
      }
    },
    MuiButton: {
      root: {
        backgroundColor: "#6c757d",
        textButton: {
          color: "green"
        }
      }
    }
    ,MuiButtonBase: {
      root: {
        backgroundColor: "yellow",
        color: "green"
      }
    }*/
  },
});
