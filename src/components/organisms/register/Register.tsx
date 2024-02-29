"use client";
import InputText from "@/components/atoms/inputText/InputText";
import useResponsive from "@/hooks/useResponsive";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import AtomButton from "../../atoms/button/Button";
import Login from "../login/Login";
import styles from "./register.module.scss";

interface RegisterProps {
  handleRegisterClose: () => void;
  open: boolean;
}

const Register: React.FC<RegisterProps> = ({ handleRegisterClose, open }) => {
  const { downSmScreen } = useResponsive();
  const [loginOpen, setLoginOpen] = useState(false);
  const handleLoginOpen = () => {
    setLoginOpen(!loginOpen);
  };
  const handleLoginClose = () => {
    setLoginOpen(false);
    handleRegisterClose();
  };

  return (
    <>
      <Dialog
        className={"registerDialog"}
        onClose={handleRegisterClose}
        open={open}
      >
        <IconButton
          aria-label="close"
          onClick={handleRegisterClose}
          className={styles.quickView__crossIcon}
          sx={{
            width: "30px",
            height: "30px",
            color: "#1a1a1a",
            margin: "10px 10px 0px auto",
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent sx={{ borderTop: "none", paddingTop: "0px" }}>
          <Box
            className={`${styles.register} ${
              downSmScreen && "register__smallScreen"
            } register`}
          >
            <Box component={"form"}>
              <Typography className={styles.register__text}>
                Create Account
              </Typography>
              <InputText
                customStyle={{ marginBottom: "12px" }}
                type="email"
                label="Email"
              />
              <InputText
                customStyle={{ marginBottom: "12px" }}
                type="password"
                label="Password"
              />
              <InputText
                customStyle={{ marginBottom: "16px" }}
                type="password"
                label="Confirm Password"
              />
              <FormGroup className={styles.register__checkboxGroup}>
                <FormControlLabel
                  sx={{ fontSize: ".8rem" }}
                  control={<Checkbox size="small" defaultChecked />}
                  label="Accept all terms & Condition"
                />
              </FormGroup>
              <AtomButton
                customStyle={{
                  width: "100%",
                  borderRadius: "25px",
                  marginBottom: "20px",
                }}
                text="Register"
              />
              <Typography className={styles.register__haveAccount}>
                Already have account?
                <Button
                  onClick={handleLoginOpen}
                  className={styles.register__loginBtn}
                >
                  Login
                </Button>
                {loginOpen && (
                  <Login handleClose={handleLoginClose} open={loginOpen} />
                )}
              </Typography>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Register;
