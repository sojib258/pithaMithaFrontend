"use client";
import Button from "@/components/atoms/button/Button";
import { RootState } from "@/store/store";
import Box from "@mui/material/Box";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import styles from "./commentForm.module.scss";
const API_URL = process.env.NEXT_PUBLIC_API_KEY;
interface CommentFormProps {
  blogId: number;
}
const CommentForm: React.FC<CommentFormProps> = ({ blogId }) => {
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { isAuthenticated, token, userId } = useSelector(
    (state: RootState) => state.auth
  );

  const handlePostComment = async () => {
    try {
      if (isAuthenticated) {
        if (commentText) {
          setLoading(true);
          const headers = {
            Authorization: `Bearer ${token}`,
          };
          const postResponse = axios.post(
            `${API_URL}/comments`,
            {
              data: {
                comment: commentText,
                users_permissions_user: userId,
                blog: blogId,
              },
            },
            { headers }
          );

          toast.promise(postResponse, {
            loading: "Posting comment...",
            success: "Post Successfull!",
            error: (error: any) => {
              return `${error?.response?.data?.error?.message}`;
            },
          });

          await postResponse;
          console.log("ReRendering from inside function");
          setLoading(false);
          setCommentText("");
          router.refresh();
        } else {
          alert("Comment can not be empty!");
        }
      } else {
        toast.error("You have to login first");
        return;
      }
    } catch (error) {
      setLoading(false);
      console.error("Error from posting comment");
    }
  };

  const handleTextareaBox = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    setCommentText(event.target.value);
  };

  console.log("ReRendering");

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
        onChange={(e) => handleTextareaBox(e)}
        value={commentText}
      />
      <Button
        disabled={loading}
        onClick={handlePostComment}
        sx={{ marginTop: "12px" }}
        text="Post Comment"
      />
    </Box>
  );
};

export default CommentForm;
