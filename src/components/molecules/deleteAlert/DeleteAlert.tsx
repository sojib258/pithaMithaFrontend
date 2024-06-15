import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface DeleteAlertProps {
  open: boolean;
  message: string;
  handleClose?: () => void;
  handleAction?: () => void;
  btnTextClose: string;
  btnTextAction: string;
}

const DeleteAlert: React.FC<DeleteAlertProps> = ({
  open,
  message,
  btnTextClose,
  btnTextAction,
  handleClose,
  handleAction,
}) => {
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        className={"deleteAlert"}
      >
        <DialogContent sx={{ backgroundColor: "#1e1e1e" }}>
          <Box sx={{ textAlign: "center", color: "yellow", padding: "0px" }}>
            <ErrorOutlineRoundedIcon sx={{ fontSize: "3rem" }} />
          </Box>
          <DialogTitle sx={{ textAlign: "center", color: "#fff" }}>
            Are You Sure?
          </DialogTitle>
          <DialogContentText sx={{ color: "#ddd", textAlign: "center" }}>
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{ backgroundColor: "#1e1e1e", padding: "20px 24px" }}
        >
          <Button
            variant="contained"
            color="success"
            onClick={handleClose}
            autoFocus
          >
            {btnTextClose}
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={handleAction}
            autoFocus
          >
            {btnTextAction}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteAlert;
