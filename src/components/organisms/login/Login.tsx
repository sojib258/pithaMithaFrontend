"use client";
import InputText from "@/components/atoms/inputText/InputText";
import ToasterMsg from "@/components/atoms/toastMsg/Toaster";
import useResponsive from "@/hooks/useResponsive";
import { setAuth } from "@/store/feature/auth/AuthSlice";
import { fetchUserData } from "@/store/feature/user/UserSlice";
import { RootState } from "@/store/store";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import AtomButton from "../../atoms/button/Button";
import styles from "./login.module.scss";
type FormFields = {
  eamilOrUserName: string;
  password: string;
};

const Login = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormFields>();

  useEffect(() => {
    if (isAuthenticated) {
      return router.push("/dashboard");
    }
  });

  const { downSmScreen } = useResponsive();

  const handleLoginData: SubmitHandler<FormFields> = async (
    formData: FormFields
  ) => {
    try {
      setLoading(true);
      const responsePromise = axios.post(
        `${process.env.NEXT_PUBLIC_API_KEY}/auth/local`,
        {
          identifier: formData.eamilOrUserName,
          password: formData.password,
        }
      );

      toast.promise(responsePromise, {
        loading: "Trying to login...",
        success: "Login successfull!",
        error: (error: any) => {
          return `${error?.response?.data?.error?.message}`;
        },
      });

      const response = await responsePromise;

      Cookies.set("myAppAuthToken", response.data.jwt, { expires: 7 });
      dispatch(setAuth({ user: response.data.user, token: response.data.jwt }));
      dispatch((await fetchUserData()) as any);

      setLoading(false);
      router.push("/dashboard");
    } catch (error: any) {
      setLoading(false);
      if (error?.response?.data?.error?.status === 400) {
        setError("password", {
          message: "Invalid Username or Password",
        });
      }
    }
  };

  return (
    <>
      <Toaster />
      <Box
        className={`${styles.login} ${
          downSmScreen && "login__smallScreen"
        } login`}
      >
        <Box className={styles.login__form} component={"form"}>
          <Typography className={styles.login__text}>Sign In</Typography>
          <FormGroup className={styles.login__inputItem}>
            <InputText
              type="text"
              label="Email Or Username"
              register={register("eamilOrUserName", {
                required: "this field is required",
              })}
            />
            {errors.eamilOrUserName && (
              <Typography className={styles.login__errorMsg}>
                {errors.eamilOrUserName.message}
              </Typography>
            )}
          </FormGroup>
          <FormGroup className={styles.login__inputItem}>
            <InputText
              type="password"
              label="Password"
              register={register("password", {
                required: "password is required",
                minLength: {
                  value: 6,
                  message: "password length min 6 character",
                },
              })}
            />
            {errors.password && (
              <Typography className={styles.login__errorMsg}>
                {errors.password.message}
              </Typography>
            )}
          </FormGroup>

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
            disabled={loading}
            onClick={handleSubmit(handleLoginData)}
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
            <Link href={"/sign-up"}>
              <Button className={styles.login__registerBtn}>Register</Button>
            </Link>
          </Typography>
        </Box>
      </Box>
      <ToasterMsg />
    </>
  );
};

export default Login;
