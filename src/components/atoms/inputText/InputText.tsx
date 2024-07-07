"use client";
import useResponsive from "@/hooks/useResponsive";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { ChangeEvent } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import styles from "./inputText.module.scss";

interface InputTextProps {
  label?: string;
  onChange?: (value: string) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  value?: string | number;
  type?: "text" | "email" | "password" | "number";
  customStyle?: object;
  sx?: object;
  icon?: boolean;
  placeholder?: string;
  register?: UseFormRegisterReturn;
  multiline?: boolean;
  rows?: number;
  showPasswordIcon?: boolean;
  showPassword?: boolean;
  togglePasswordVisibility?: () => void;
}

const InputText: React.FC<InputTextProps> = ({
  value,
  type,
  label,
  icon = false,
  onChange,
  onBlur,
  onFocus,
  customStyle,
  placeholder,
  register,
  multiline = false,
  rows = 1,
  sx,
  showPasswordIcon = false,
  showPassword,
  togglePasswordVisibility,
}) => {
  const { downSmScreen } = useResponsive();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <>
      <Box
        sx={customStyle}
        className={`${styles.inputText} ${icon && "inputTextIcon"} ${
          downSmScreen && "inputTextSmallScreen"
        } inputText`}
      >
        <TextField
          label={label}
          variant="outlined"
          onChange={handleChange}
          onBlur={onBlur}
          onFocus={onFocus}
          value={value}
          type={type}
          size="small"
          fullWidth={true}
          placeholder={placeholder}
          multiline={multiline}
          rows={rows}
          {...register}
          sx={sx}
        />
        {icon && (
          <Box
            className={`${styles.inputText__searchIcon} ${
              downSmScreen && styles.inputText__searchIcon_smallScreen
            }`}
          >
            <svg
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.16667 16.3333C12.8486 16.3333 15.8333 13.3486 15.8333 9.66667C15.8333 5.98477 12.8486 3 9.16667 3C5.48477 3 2.5 5.98477 2.5 9.66667C2.5 13.3486 5.48477 16.3333 9.16667 16.3333Z"
                stroke="#1A1A1A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17.4999 18L13.8749 14.375"
                stroke="#1A1A1A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Box>
        )}
        {showPasswordIcon && (
          <Box
            className={`${styles.inputText__eyeIcon} ${
              downSmScreen && styles.inputText__eyeIcon_smallScreen
            }`}
            onClick={togglePasswordVisibility}
            style={{ cursor: "pointer" }}
          >
            {showPassword ? (
              <VisibilityOffIcon sx={{ color: "#4d4d4d" }} />
            ) : (
              <VisibilityIcon sx={{ color: "#4d4d4d" }} />
            )}
          </Box>
        )}
      </Box>
    </>
  );
};

export default InputText;
