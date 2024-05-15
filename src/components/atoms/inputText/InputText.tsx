"use client";
import useResponsive from "@/hooks/useResponsive";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
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
  icon?: boolean;
  placeholder?: string;
  register?: UseFormRegisterReturn;
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
}) => {
  const { downSmScreen } = useResponsive();
  const handleChange = () => {
    if (onChange) {
      onChange;
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
          {...register}
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
        {type === "password" && (
          <Box
            className={`${styles.inputText__eyeIcon} ${
              downSmScreen && styles.inputText__eyeIcon_smallScreen
            }`}
          >
            <svg
              width="20"
              height="15"
              viewBox="0 0 20 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.66669 7.50033C1.66669 7.50033 4.69669 1.66699 10 1.66699C15.3034 1.66699 18.3334 7.50033 18.3334 7.50033C18.3334 7.50033 15.3034 13.3337 10 13.3337C4.69669 13.3337 1.66669 7.50033 1.66669 7.50033Z"
                stroke="#1A1A1A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 10C10.663 10 11.2989 9.73661 11.7678 9.26777C12.2366 8.79893 12.5 8.16304 12.5 7.5C12.5 6.83696 12.2366 6.20107 11.7678 5.73223C11.2989 5.26339 10.663 5 10 5C9.33696 5 8.70107 5.26339 8.23223 5.73223C7.76339 6.20107 7.5 6.83696 7.5 7.5C7.5 8.16304 7.76339 8.79893 8.23223 9.26777C8.70107 9.73661 9.33696 10 10 10Z"
                stroke="#1A1A1A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Box>
        )}
      </Box>
    </>
  );
};

export default InputText;
