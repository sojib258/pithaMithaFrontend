"use client";
import InputText from "@/components/atoms/inputText/InputText";
import ToasterMsg from "@/components/atoms/toastMsg/Toaster";
import useResponsive from "@/hooks/useResponsive";
import { RootState } from "@/store/store";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import AtomButton from "../../atoms/button/Button";
import styles from "./register.module.scss";

type FormFields = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: number;
  password: string;
  confirmPassword: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_KEY;

const Register = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm<FormFields>();
  const { downSmScreen } = useResponsive();
  const dispatch = useDispatch();

  const handleRegisterForm: SubmitHandler<FormFields> = async (
    formData: FormFields
  ) => {
    if (formData.password === formData.confirmPassword) {
      try {
        setLoading(true);
        const responsePromise = axios.post(`${API_URL}/auth/local/register`, {
          firstName: formData.firstName,
          lastName: formData.lastName,
          username: formData.username,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
        });

        toast.promise(responsePromise, {
          loading: "Trying to register...",
          success: "Register successfull!",
          error: (error: any) => {
            return `${error?.response?.data?.error?.message}`;
          },
        });

        await responsePromise;

        setLoading(false);
        router.push("/login");
      } catch (error: any) {
        setLoading(false);
        if (error?.response?.data?.error?.status === 400) {
          setError("password", {
            message: "Invalid Username or Password",
          });
        }
      }
    } else {
      setError("confirmPassword", {
        message: "Your password did not matched",
      });
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      return router.push("/dashboard");
    }
  });
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        handleSubmit(handleRegisterForm)();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleSubmit, handleRegisterForm]);

  return (
    <>
      <Box
        className={`${styles.register} ${
          downSmScreen && "register__smallScreen"
        } register`}
      >
        <Box className={styles.register__form} component={"form"}>
          <Typography className={styles.register__text}>
            Create Account
          </Typography>

          <Box sx={{ display: "flex" }}>
            <FormGroup
              sx={{ marginRight: "10px" }}
              className={styles.register__inputItem}
            >
              <InputText
                type="text"
                label="First Name *"
                register={register("firstName", {
                  required: "first name is required",
                  minLength: {
                    value: 3,
                    message: "length min 3 character",
                  },
                })}
              />
              {errors.firstName && (
                <Typography className={styles.register__errorMsg}>
                  {errors.firstName.message}
                </Typography>
              )}
            </FormGroup>

            <FormGroup className={styles.register__inputItem}>
              <InputText
                type="text"
                label="Last Name"
                register={register("lastName")}
              />
              {errors.lastName && (
                <Typography className={styles.register__errorMsg}>
                  {errors.lastName.message}
                </Typography>
              )}
            </FormGroup>
          </Box>

          <FormGroup className={styles.register__inputItem}>
            <InputText
              type="text"
              label="User Name *"
              register={register("username", {
                required: "username is required",
                minLength: {
                  value: 5,
                  message: "min length 5 character",
                },
              })}
            />
            {errors.username && (
              <Typography className={styles.register__errorMsg}>
                {errors.username.message}
              </Typography>
            )}
          </FormGroup>

          <FormGroup className={styles.register__inputItem}>
            <InputText
              type="number"
              label="Phone *"
              register={register("phone", {
                required: "phone number is required",
                minLength: {
                  value: 10,
                  message: "min length 10 character",
                },
              })}
            />
            {errors.phone && (
              <Typography className={styles.register__errorMsg}>
                {errors.phone.message}
              </Typography>
            )}
          </FormGroup>

          <FormGroup className={styles.register__inputItem}>
            <InputText
              type="email"
              label="Email *"
              register={register("email", {
                required: "email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address",
                },
              })}
            />
            {errors.email && (
              <Typography className={styles.register__errorMsg}>
                {errors.email.message}
              </Typography>
            )}
          </FormGroup>
          <FormGroup className={styles.register__inputItem}>
            <InputText
              type={showPassword ? "text" : "password"}
              label="Password *"
              register={register("password", {
                required: "password is required",
                minLength: {
                  value: 6,
                  message: "password length min 6 character",
                },
              })}
              showPasswordIcon={true}
              showPassword={showPassword}
              togglePasswordVisibility={() => setShowPassword(!showPassword)}
            />
            {errors.password && (
              <Typography className={styles.register__errorMsg}>
                {errors.password.message}
              </Typography>
            )}
          </FormGroup>
          <FormGroup className={styles.register__inputItem}>
            <InputText
              type={showConfirmPassword ? "text" : "password"}
              label="Confirm Password *"
              register={register("confirmPassword", {
                required: "confirm password is required",
              })}
              showPasswordIcon={true}
              showPassword={showConfirmPassword}
              togglePasswordVisibility={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
            />
            {errors.confirmPassword && (
              <Typography className={styles.register__errorMsg}>
                {errors.confirmPassword.message}
              </Typography>
            )}
          </FormGroup>
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
            onClick={handleSubmit(handleRegisterForm)}
          />
          <Typography className={styles.register__haveAccount}>
            Already have account?
            <Link href={"/login"}>
              <Button className={styles.register__loginBtn}>Login</Button>
            </Link>
          </Typography>
        </Box>
      </Box>
      <ToasterMsg />
    </>
  );
};

export default Register;
