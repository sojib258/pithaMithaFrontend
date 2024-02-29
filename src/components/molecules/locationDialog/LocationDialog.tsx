import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
// import Location from "../location/Location";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

interface locationDialogProps {
  handleClose: () => void;
  open: boolean;
}

const LocationDialog: React.FC<locationDialogProps> = ({
  handleClose,
  open,
}) => {
  return (
    <>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        {/* Location Component Wrapper=============== */}
        <Box>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 13,
              top: 13,
              zIndex: 999,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          {/* Location Component===================== */}
          {/* <Location /> */}
          {/* TODO: */}
          <p style={{ padding: "40px" }}>I am working on it... Please wait</p>
        </Box>
      </BootstrapDialog>
    </>
  );
};

export default LocationDialog;
