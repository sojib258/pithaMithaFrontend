import Button from "@/components/atoms/button/Button";
import TextField from "@/components/atoms/textField/TextField";
import Stack from "@mui/material/Stack";
import styles from "./newsletterForm.module.scss";
interface newsLetterProps {
  customStyle?: object;
}
const NewsletterForm: React.FC<newsLetterProps> = ({ customStyle }) => {
  return (
    <>
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
        className={styles.newsLetterForm}
        style={customStyle}
      >
        <TextField type="email" placeholder="Enter your email" />
        <Button text="Subscribe" />
      </Stack>
    </>
  );
};

export default NewsletterForm;
