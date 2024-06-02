"use client";
import Button from "@/components/atoms/button/Button";
import TextField from "@/components/atoms/textField/TextField";
import ToasterMsg from "@/components/atoms/toastMsg/Toaster";
import AvatarUplaod from "@/components/molecules/avatarUploadDialog/UploadDialog";
import { fetchUserData } from "@/store/feature/user/UserSlice";
import { RootState } from "@/store/store";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
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

const API_URL = process.env.NEXT_PUBLIC_API_KEY;

const Settings = () => {
  const {
    profileImg,
    firstName,
    lastName,
    username,
    email,
    phone,
    id: userId,
  } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();

  // This is for update profile information
  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: errorsProfile },
    reset: profileReset,
  } = useForm<ProfileUpdateFields>();

  // This is for update password
  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    reset: passwordReset,
    setError,
    formState: { errors: errorsPassword },
  } = useForm<ChangePasswordFields>();

  // This is for open the profile image upload dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleDialogOpen = () => {
    setDialogOpen(!dialogOpen);
  };

  const [isUpadateUser, setIsUpdateUser] = useState(false);
  const [loading, setLoading] = useState(false);

  // This function is for when update the user info then component will be re-render
  const handleUpdateUser = () => {
    setIsUpdateUser(!isUpadateUser);
  };

  const handleLoading = (value: boolean) => {
    setLoading(value);
  };

  const jwtToken = Cookies.get("myAppAuthToken");
  const headers = {
    Authorization: `Bearer ${jwtToken}`,
  };

  // This function is for change profile information
  const handleProfileUpdate: SubmitHandler<ProfileUpdateFields> = async (
    data
  ) => {
    try {
      setLoading(true);
      const responsePromise = axios.put(
        `${API_URL}/users/${userId}`,
        {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phoneNumber,
        },
        {
          headers,
        }
      );

      toast.promise(
        responsePromise,
        {
          loading: "Updating Profile Info...",
          success: "Update Completed",
          error: (error: any) => {
            return `${error?.response?.data?.error?.message}`;
          },
        },
        {
          error: {
            duration: 5000,
          },
        }
      );

      await responsePromise;
      handleUpdateUser();

      profileReset({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
      });
    } catch (error: any) {
      setLoading(false);
    }
  };

  // This function is for update or change password
  const handleChangePassword: SubmitHandler<ChangePasswordFields> = async (
    data
  ) => {
    if (data.newPassword === data.confirmPassword) {
      try {
        setLoading(true);
        const responsePromise = axios.post(
          `${API_URL}/auth/change-password`,
          {
            currentPassword: data.currentPassword,
            password: data.newPassword,
            passwordConfirmation: data.confirmPassword,
          },
          { headers }
        );

        toast.promise(responsePromise, {
          loading: "Updating Password...",
          success: "Update Completed",
          error: (error: any) => {
            return `${error?.response?.data?.error?.message}`;
          },
        });

        await responsePromise;
        handleUpdateUser();
        passwordReset({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        setError("confirmPassword", {
          message: error?.response?.data?.error?.message,
        });
      }
    } else {
      setError("confirmPassword", {
        message: "Your password did not matched",
      });
    }
  };

  useEffect(() => {
    dispatch(fetchUserData() as any);
  }, [dispatch, isUpadateUser, userId]);

  const { width, height, url } = profileImg;
  return (
    <>
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
                    placeholder={firstName}
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
                    placeholder={lastName}
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
                    Email *
                  </Typography>
                  <TextField
                    register={registerProfile("email", {
                      required: "email can't be empty",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "invalid email address",
                      },
                    })}
                    type="email"
                    id="email"
                    placeholder={email}
                  />
                  {errorsProfile.email?.message && (
                    <Typography className={styles.setting__errorMsg}>
                      {errorsProfile.email.message}
                    </Typography>
                  )}
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
                        value: 10,
                        message: "Phone number must be at least 10 digits long",
                      },
                    })}
                    type="number"
                    id="phoneNumber"
                    placeholder={phone?.toString()}
                  />
                  {errorsProfile.phoneNumber?.message && (
                    <Typography className={styles.setting__errorMsg}>
                      {errorsProfile.phoneNumber.message}
                    </Typography>
                  )}
                </Box>
                <Button
                  disabled={loading}
                  sx={{ marginTop: "20px" }}
                  text="Save Changes"
                  onClick={handleSubmitProfile(handleProfileUpdate)}
                />
              </Box>
            </Grid>
            <Grid order={{ xs: 1, lg: 2 }} item xs={12} lg={5}>
              <Box className={styles.setting__rightItem}>
                {url ? (
                  <Image
                    className={styles.setting__profileImg}
                    width={width ? width : 250}
                    height={height ? height : 250}
                    alt={"Profile Image"}
                    src={profileImg.url}
                  />
                ) : (
                  <Avatar className={styles.setting__profileImgNone}>
                    {firstName.slice(0, 1).toUpperCase()}
                    {lastName && lastName.slice(0, 1).toUpperCase()}
                  </Avatar>
                )}
                <Button
                  onClick={handleDialogOpen}
                  text={url ? "Change Image" : "Upload Image"}
                />
              </Box>
              {dialogOpen && (
                <AvatarUplaod
                  userId={userId}
                  open={dialogOpen}
                  handleOpen={handleDialogOpen}
                  handleUpdateUser={handleUpdateUser}
                  handleLoading={handleLoading}
                  loading={loading}
                />
              )}
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
              Current Password *
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
      <ToasterMsg />
    </>
  );
};

export default Settings;
