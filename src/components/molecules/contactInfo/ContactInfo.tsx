import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import styles from "./contactInfo.module.scss";

interface ContactInfoProps {
  iconSrc: string;
  headText: string;
  text: string;
}

const ContactInfo: React.FC<ContactInfoProps> = ({
  iconSrc,
  headText,
  text,
}) => {
  return (
    <Box className={styles.contact}>
      <Box className={styles.contact__infoIcon}>
        <Image
          className={styles.contact__iconImg}
          width={50}
          height={50}
          alt={"Icon"}
          src={iconSrc}
        />
      </Box>
      <Typography component={"h4"} className={styles.contact__heading}>
        {headText}
      </Typography>
      <Typography className={styles.contact__text}>{text}</Typography>
    </Box>
  );
};

export default ContactInfo;
