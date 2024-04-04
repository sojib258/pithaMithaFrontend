"use client";
import Button from "@/components/atoms/button/Button";
import TextField from "@/components/atoms/textField/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./settings.module.scss";
type ProfileUpdateFields = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  avatar: string;
};

type ChangePasswordFields = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};
const Settings = () => {
  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: errorsProfile },
  } = useForm<ProfileUpdateFields>();

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorsPassword },
  } = useForm<ChangePasswordFields>();

  const handleProfileUpdate: SubmitHandler<ProfileUpdateFields> = (data) => {
    console.log("Profile Update Data:", data);
  };

  const handleChangePassword: SubmitHandler<ChangePasswordFields> = (data) => {
    console.log("Change Password Data:", data);
  };

  return (
    <Box className={styles.setting}>
      <Box className={styles.setting__profileSection}>
        <Box className={styles.setting__head}>
          <Typography className={styles.setting__headText}>
            Account Settings
          </Typography>
        </Box>
        <Grid container>
          <Grid order={{ xs: 2, lg: 1 }} item xs={12} lg={7}>
            <Box className={styles.setting__leftItem}>
              {/* First Name Field */}
              <Box className={styles.setting__inputItem}>
                <Typography
                  className={styles.setting__label}
                  component={"label"}
                  htmlFor="firstName"
                >
                  First Name *
                </Typography>
                <TextField
                  register={registerProfile("firstName", {
                    required: "first name can't be empty",
                  })}
                  type="text"
                  id="firstName"
                  placeholder="John"
                />
                {errorsProfile.firstName?.message && (
                  <Typography className={styles.setting__errorMsg}>
                    {errorsProfile.firstName.message}
                  </Typography>
                )}
              </Box>
              {/* Last Name Field */}
              <Box className={styles.setting__inputItem}>
                <Typography
                  className={styles.setting__label}
                  component={"label"}
                  htmlFor="lastName"
                >
                  Last Name *
                </Typography>
                <TextField
                  register={registerProfile("lastName", {
                    required: "last name can't be empty",
                  })}
                  type="text"
                  id="lastName"
                  placeholder="Doe"
                />
                {errorsProfile.lastName?.message && (
                  <Typography className={styles.setting__errorMsg}>
                    {errorsProfile.lastName.message}
                  </Typography>
                )}
              </Box>
              <Box className={styles.setting__inputItem}>
                <Typography
                  className={styles.setting__label}
                  component={"label"}
                  htmlFor="email"
                >
                  Email
                </Typography>
                <TextField
                  register={registerProfile("email")}
                  type="email"
                  id="email"
                  placeholder="xyz@gmail.com"
                />
              </Box>
              <Box className={styles.setting__inputItem}>
                <Typography
                  className={styles.setting__label}
                  component={"label"}
                  htmlFor="phoneNumber"
                >
                  Phone Number *
                </Typography>
                <TextField
                  register={registerProfile("phoneNumber", {
                    required: "phone number can't be empty",
                    minLength: {
                      value: 11,
                      message: "Phone number must be at least 11 digits long",
                    },
                  })}
                  type="number"
                  id="phoneNumber"
                  placeholder="017........"
                />
                {errorsProfile.phoneNumber?.message && (
                  <Typography className={styles.setting__errorMsg}>
                    {errorsProfile.phoneNumber.message}
                  </Typography>
                )}
              </Box>
              <Button
                sx={{ marginTop: "20px" }}
                text="Save Changes"
                onClick={handleSubmitProfile(handleProfileUpdate)}
              />
            </Box>
          </Grid>
          <Grid order={{ xs: 1, lg: 2 }} item xs={12} lg={5}>
            <Box className={styles.setting__rightItem}>
              <Image
                className={styles.setting__profileImg}
                width={250}
                height={250}
                alt={"Profile Image"}
                src={"/img/bg.png"}
              />
              <label
                className={styles.setting__imageSelectBtn}
                htmlFor="inputTag"
              >
                Chose Image
                <input
                  className={styles.setting__inputFile}
                  id="inputTag"
                  type="file"
                  {...registerProfile("avatar")}
                />
              </label>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box className={styles.setting__passwordSection}>
        <Box className={styles.setting__head}>
          <Typography className={styles.setting__headText}>
            Change Password
          </Typography>
        </Box>
        <Box className={styles.setting__passwordInput}>
          <Typography
            className={styles.setting__label}
            component={"label"}
            htmlFor="currentPassword"
          >
            Password *
          </Typography>
          <TextField
            register={registerPassword("currentPassword", {
              required: "password can't be empty",
            })}
            type="password"
            placeholder="Password"
            id={"currentPassword"}
          />
          {errorsPassword.currentPassword?.message && (
            <Typography className={styles.setting__errorMsg}>
              {errorsPassword.currentPassword.message}
            </Typography>
          )}
        </Box>
        <Box className={styles.setting__passwordInput}>
          <Typography
            className={styles.setting__label}
            component={"label"}
            htmlFor="newPassword1"
          >
            New Password *
          </Typography>
          <TextField
            register={registerPassword("newPassword", {
              required: "password can't be empty",
            })}
            type="password"
            placeholder="Password"
            id={"newPassword1"}
          />
          {errorsPassword.newPassword?.message && (
            <Typography className={styles.setting__errorMsg}>
              {errorsPassword.newPassword.message}
            </Typography>
          )}
        </Box>

        <Box className={styles.setting__passwordInput}>
          <Typography
            className={styles.setting__label}
            component={"label"}
            htmlFor="confirmPassword"
          >
            Confirm Password *
          </Typography>
          <TextField
            register={registerPassword("confirmPassword", {
              required: "password can't be empty",
            })}
            type="password"
            placeholder="Password"
            id={"confirmPassword"}
          />
          {errorsPassword.confirmPassword?.message && (
            <Typography className={styles.setting__errorMsg}>
              {errorsPassword.confirmPassword.message}
            </Typography>
          )}
        </Box>
        <Box className={styles.setting__passwordInput}>
          <Button
            text="Change Password"
            onClick={handleSubmitPassword(handleChangePassword)}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Settings;
