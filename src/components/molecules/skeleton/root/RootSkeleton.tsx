import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
const RootSkeleton = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "60vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress color="success" />
    </Box>
  );
};

export default RootSkeleton;
