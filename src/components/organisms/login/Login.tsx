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
import Register from "../register/Register";
import styles from "./login.module.scss";

interface LoginProps {
  handleClose: () => void;
  open: boolean;
}

const Login: React.FC<LoginProps> = ({ handleClose, open }) => {
  const { downSmScreen } = useResponsive();
  const [registerOpen, setRegisterOpen] = useState(false);
  const handleRegisterOpen = () => {
    setRegisterOpen(!registerOpen);
  };
  const handleRegisterClose = () => {
    setRegisterOpen(false);
    handleClose();
  };

  return (
    <>
      <Dialog className={"loginDialog"} onClose={handleClose} open={open}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
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
        <DialogContent sx={{ borderTop: "none", paddingTop: "8px" }}>
          <Box
            className={`${styles.login} ${
              downSmScreen && "login__smallScreen"
            } login`}
          >
            <Box component={"form"}>
              <Typography className={styles.login__text}>Sign In</Typography>
              <InputText
                customStyle={{ marginBottom: "16px" }}
                type="email"
                label="Email"
              />
              <InputText
                customStyle={{ marginBottom: "16px" }}
                type="password"
                label="Password"
              />
              <FormGroup className={styles.login__checkboxGroup}>
                <FormControlLabel
                  control={<Checkbox size="small" defaultChecked />}
                  label="Keep me looged in"
                  className={styles.login__remember}
                />
                <Button
                  sx={{ display: { xs: "none", sm: "block" } }}
                  variant="text"
                  className={styles.login__forget}
                >
                  Forget Password?
                </Button>
              </FormGroup>
              <AtomButton
                customStyle={{
                  width: "100%",
                  borderRadius: "25px",
                  marginBottom: "20px",
                }}
                text="Log in"
              />
              <Button
                sx={{
                  textAlign: "left",
                  padding: "0px",
                  marginBottom: "20px",
                  display: { xs: "block", sm: "none" },
                }}
                variant="text"
                className={styles.login__forget}
              >
                Forget Password?
              </Button>
              <Typography className={styles.login__haveAccount}>
                Don&apos;t have account?
                <Button
                  onClick={handleRegisterOpen}
                  className={styles.login__registerBtn}
                >
                  Register
                </Button>
                {registerOpen && (
                  <Register
                    handleRegisterClose={handleRegisterClose}
                    open={registerOpen}
                  />
                )}
              </Typography>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Login;
