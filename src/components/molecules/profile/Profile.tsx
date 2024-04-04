import Button from "@/components/atoms/button/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import styles from "./profile.module.scss";

interface ProfileProps {
  imgSrc: string;
  name: string;
  position: string;
}

const Profile: React.FC<ProfileProps> = ({ imgSrc, name, position }) => {
  return (
    <Box className={styles.profile}>
      <Image
        className={styles.profile__userImage}
        width={100}
        height={100}
        alt={"profile image"}
        src={imgSrc}
      />
      <Typography className={styles.profile__userName} variant="h2">
        {name}
      </Typography>
      <Typography className={styles.profile__userPosition}>
        {position}
      </Typography>
      <Button
        sx={{
          backgroundColor: "transparent!important",
          boxShadow: "none",
          color: "#00b207!important",
          padding: "2px 8px!important",
          fontSize: "1rem!important",
          "&:hover": {
            textDecoration: "underline",
            boxShadow: "none!important",
          },
        }}
        text="Edit Profile"
      />
    </Box>
  );
};

export default Profile;
