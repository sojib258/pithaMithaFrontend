import Button from "@/components/atoms/button/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import styles from "./couponCode.module.scss";

interface CouponCodeProps {
  open: boolean;
  handleCouponOpen: () => void;
  couponCode: string;
  handleCouponCode: (value: string) => void;
}
const CouponCode: React.FC<CouponCodeProps> = ({
  open,
  handleCouponOpen,
  handleCouponCode,
}) => {
  const [code, setCode] = useState("");

  const handleCouponChange = (value: string) => {
    setCode(value);
  };
  const updateCouponCode = () => {
    if (!code) {
      return alert("Please enter a valid coupon code before applying.");
    }
    handleCouponCode(code);
    setCode("");
    handleCouponOpen();
  };

  return (
    <Dialog
      className={`${styles.coupon} coupon`}
      onClose={handleCouponOpen}
      open={open}
    >
      <DialogContent>
        <TextField
          sx={{ color: "red" }}
          autoFocus
          required
          margin="dense"
          id="name"
          name="email"
          label="Coupon code"
          type="email"
          fullWidth
          variant="standard"
          value={code}
          onChange={(e) => handleCouponChange(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          text={"Cancel"}
          sx={{
            backgroundColor: "#ff8a00!important",
            padding: "6px 20px!important ",
            "&:hover": {
              backgroundColor: "#d87300!important",
            },
          }}
          onClick={handleCouponOpen}
        />
        <Button
          text={"Apply"}
          sx={{ padding: "6px 20px!important " }}
          onClick={updateCouponCode}
        />
      </DialogActions>
    </Dialog>
  );
};

export default CouponCode;
