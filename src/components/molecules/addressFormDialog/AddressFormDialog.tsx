import AddressForm from "@/components/organisms/addressForm/AddressForm";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import styles from "./addressFormDialog.module.scss";

type formFields = {
  fullName: string;
  phone: number;
  division: string;
  city: string;
  area: string;
  address: string;
  landmark: string;
  deliveryOption: string;
};

interface AddressDialogProps {
  open: boolean;
  handleClose: () => void;
  handleUpdateComponent: () => void;
  handleAction: (data: formFields) => void;
}
const AddressDialog: React.FC<AddressDialogProps> = ({
  open,
  handleClose,
  handleUpdateComponent,
  handleAction,
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
      <AddressForm
        handleUpdateComponent={handleUpdateComponent}
        handleClose={handleClose}
        handleAction={handleAction}
      />
    </Dialog>
  );
};

export default AddressDialog;
