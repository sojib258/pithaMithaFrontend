"use client";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import styles from "./contactForm.module.scss";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = (data: object) => {
    // Form handle here
    console.log("Data", data);
  };

  return (
    <Box className={styles.contact}>
      <form onSubmit={handleSubmit((data) => handleFormSubmit(data))}>
        <Box className={styles.contact__firstTwoField}>
          <Box className={styles.contact__inputGroup}>
            <input
              className={`${styles.contact__input} ${styles.contact__nameField}`}
              type="text"
              placeholder="Your Name..."
              {...register("name", { required: "Your name required" })}
            />
            {typeof errors.name?.message === "string" && (
              <Typography
                component={"span"}
                className={styles.contact__errorMsg}
              >
                {errors.name.message}
              </Typography>
            )}
          </Box>
          <Box className={styles.contact__inputGroup}>
            <input
              className={`${styles.contact__input} ${styles.contact__emailField}`}
              type="email"
              placeholder="Email..."
              {...register("email", { required: "Your email required" })}
            />
            {typeof errors.email?.message === "string" && (
              <Typography
                component={"span"}
                className={styles.contact__errorMsg}
              >
                {errors.email.message}
              </Typography>
            )}
          </Box>
        </Box>
        <Box className={styles.contact__inputGroupSubject}>
          <input
            className={styles.contact__input}
            type="text"
            placeholder="Subject..."
            {...register("subject", {
              required: "Your subject required",
            })}
          />
          {typeof errors.subject?.message === "string" && (
            <Typography className={styles.contact__errorMsg}>
              {errors.subject.message}
            </Typography>
          )}
        </Box>
        <Box className={styles.contact__inputGroupTextArea}>
          <textarea
            className={styles.contact__input}
            cols={4}
            rows={10}
            placeholder="Message..."
            {...register("message", {
              required: "Your message required",
            })}
          ></textarea>
          {typeof errors.message?.message === "string" && (
            <Typography className={styles.contact__errorMsg}>
              {errors.message.message}
            </Typography>
          )}
        </Box>
        <input
          type="submit"
          value={"Send Message"}
          className={styles.contact__btn}
        />
      </form>
    </Box>
  );
};

export default ContactForm;
