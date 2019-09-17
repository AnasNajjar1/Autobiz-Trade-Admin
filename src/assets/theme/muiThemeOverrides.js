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
        paddingLeft: "12px !important",
        paddingRight: "12px !important"
      }
    }
  }
});
