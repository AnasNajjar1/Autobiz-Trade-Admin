import { createMuiTheme } from "@material-ui/core/styles";
export const muiThemeOverrides = createMuiTheme({
  overrides: {
    MuiTab: {
      root: {
        minWidth: 0,
        "@media (min-width: 0px)": {
          minWidth: 0
        }
      },
      labelContainer: {
        paddingLeft: "8px !important",
        paddingRight: "8px !important",
        textTransform: "capitalize"
      }
    },
    MuiFormControl: {
      root: {
        width: "50% !important"
      }
    }
  }
});
