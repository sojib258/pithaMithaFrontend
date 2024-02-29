"use client";
import styles from "./textField.module.scss";
interface textFieldProps {
  type: "text" | "number" | "email" | "password";
  placeholder?: string;
  onChange?: () => void;
  customStyle?: object;
}

const TextField: React.FC<textFieldProps> = ({
  type,
  placeholder,
  onChange,
  customStyle,
}) => {
  return (
    <input
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      className={styles.textField}
      style={customStyle}
    />
  );
};

export default TextField;
