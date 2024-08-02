import Button from "@/components/atoms/button/Button";
import Box from "@mui/material/Box";
import styles from "./commentForm.module.scss";
const CommentForm = () => {
  return (
    <Box className={styles.comment}>
      <Box component={"label"} className={styles.comment__labelText}>
        Message
      </Box>
      <Box
        className={styles.comment__textBox}
        placeholder={"Write your comment here..."}
        component={"textarea"}
        rows={4}
      />
      <Button sx={{ marginTop: "12px" }} text="Post Comment" />
    </Box>
  );
};

export default CommentForm;
