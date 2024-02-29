"use client";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
const useResponsive = () => {
  const theme = useTheme();

  const xsScreen = useMediaQuery(theme.breakpoints.up("xs"));
  const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const mdScreen = useMediaQuery(theme.breakpoints.up("md"));
  const lgScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const xlScreen = useMediaQuery(theme.breakpoints.up("xl"));

  const downXsScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const downSmScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const downMdScreen = useMediaQuery(theme.breakpoints.down("md"));
  const downLgScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const downXlScreen = useMediaQuery(theme.breakpoints.down("xl"));

  return {
    xsScreen,
    smScreen,
    mdScreen,
    lgScreen,
    xlScreen,
    downXsScreen,
    downSmScreen,
    downMdScreen,
    downLgScreen,
    downXlScreen,
  };
};

export default useResponsive;
