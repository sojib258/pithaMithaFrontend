import AddressForm from "@/components/organisms/addressForm/AddressForm";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import styles from "./addressFormDialog.module.scss";
interface AddressDialogProps {
  open: boolean;
  handleClose: () => void;
  onCreate: () => void;
}
const AddressDialog: React.FC<AddressDialogProps> = ({
  open,
  handleClose,
  onCreate,
}) => {
  const handleCloseDialog = (
    event: {},
    reason: "backdropClick" | "escapeKeyDown"
  ) => {
    if (reason === "backdropClick") {
      // Ignore backdrop click events
      return;
    }
    handleClose();
  };

  return (
    <Dialog
      className={`${styles.dialog} addressDialog`}
      open={open}
      onClose={handleCloseDialog}
    >
      <DialogActions className={styles.dialog__action}>
        <Typography className={styles.dialog__text}>Add New Address</Typography>
        <CloseIcon className={styles.dialog__closeIcon} onClick={handleClose} />
      </DialogActions>
      <AddressForm onCreate={onCreate} />
    </Dialog>
  );
};

export default AddressDialog;
