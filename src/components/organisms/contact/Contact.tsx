import ContactForm from "@/components/molecules/contactForm/ContactForm";
import ContactInfo from "@/components/molecules/contactInfo/ContactInfo";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import styles from "./contact.module.scss";

const Contact = () => {
  const infoItem = [
    {
      id: 1,
      iconSrc: "/icons/contact/Map.svg",
      headText: "Our Address",
      text: "Dhaka, Bangladesh",
    },
    {
      id: 2,
      iconSrc: "/icons/contact/Email.svg",
      headText: "Send your message",
      text: "sojibsrd85@gmail.com",
    },
    {
      id: 3,
      iconSrc: "/icons/contact/PhoneCall.svg",
      headText: "Contact Me",
      text: "+8801720046642",
    },
  ];

  return (
    <Box className={styles.contact}>
      <Typography className={styles.contact__text}>Contact Us</Typography>
      <Grid spacing={{ xs: 0, md: 2 }} container>
        <Grid className={styles.contact__gridItemFirst} item xs={12} md={4}>
          <Box className={styles.contact__leftContent}>
            {infoItem.map((item) => (
              <ContactInfo
                key={item.id}
                headText={item.headText}
                iconSrc={item.iconSrc}
                text={item.text}
              />
            ))}
          </Box>
        </Grid>
        <Grid className={styles.contact__gridItemSecond} item xs={12} md={8}>
          <Box className={styles.contact__rightContent}>
            <Box className={styles.contact__message}>
              <Typography className={styles.contact__head} component={"h2"}>
                Get in touch
              </Typography>
              <Typography className={styles.contact__para} component={"h2"}>
                Want to get in touch? We&apos;d love to hear from you.
                Here&apos;s how you can reach us...
              </Typography>
            </Box>
            <ContactForm />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Contact;
