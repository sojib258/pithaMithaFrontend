import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import * as React from "react";

const ProgressBar = () => {
  const [progress, setProgress] = React.useState(0);
  const [buffer, setBuffer] = React.useState(10);

  const progressRef = React.useRef(() => {});
  React.useEffect(() => {
    progressRef.current = () => {
      if (progress > 100) {
        setProgress(0);
        setBuffer(10);
      } else {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 10;
        setProgress(progress + diff);
        setBuffer(progress + diff + diff2);
      }
    };
  });

  React.useEffect(() => {
    const timer = setInterval(() => {
      progressRef.current();
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box className={"linearProgess"} sx={{ width: "100%" }}>
      <LinearProgress
        sx={{ color: "red" }}
        variant="indeterminate"
        value={progress}
        valueBuffer={buffer}
      />
    </Box>
  );
};

export default ProgressBar;
