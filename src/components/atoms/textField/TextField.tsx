"use client";
import { UseFormRegisterReturn } from "react-hook-form";
import styles from "./textField.module.scss";
interface textFieldProps {
  type: "text" | "number" | "email" | "password";
  placeholder?: string;
  onChange?: () => void;
  customStyle?: object;
  id?: string;
  register?: UseFormRegisterReturn;
}

const TextField: React.FC<textFieldProps> = ({
  type,
  placeholder,
  onChange,
  customStyle,
  id,
  register,
}) => {
  return (
    <input
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      className={styles.textField}
      style={customStyle}
      id={id}
      {...register}
    />
  );
};

export default TextField;
