import { Typography } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import styles from "./radio.module.scss";

interface RadioAtomProps {
  label: string;
  value: string;
  checked?: boolean;
  count?: number;
  onChange: (value: string) => void;
}

const RadioAtom: React.FC<RadioAtomProps> = ({
  label,
  value,
  checked,
  onChange,
  count,
}) => {
  const handleChange = () => {
    onChange(value);
  };

  return (
    <>
      <FormControlLabel
        className={`radioAtom ${styles.radioAtom}`}
        value={value}
        control={<Radio size="small" />}
        label={
          <>
            {label}
            {count !== undefined && (
              <Typography
                className={styles.radioAtom__count}
                component={"span"}
              >
                ({count})
              </Typography>
            )}
          </>
        }
        checked={checked}
        onChange={handleChange}
      />
    </>
  );
};

export default RadioAtom;
