import Button from "@/components/atoms/button/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";
import styles from "./profile.module.scss";

type UserData = {
  firstName: string;
  lastName: string;
  profileImg: {
    width: number | null;
    height: number | null;
    url: string;
  };
};
interface ProfileProps {
  userData: UserData;
}

const Profile: React.FC<ProfileProps> = ({ userData }) => {
  const { width, height, url } = userData.profileImg;
  return (
    <Box className={styles.profile}>
      {url ? (
        <Image
          className={styles.profile__userImage}
          width={width ? width : 200}
          height={height ? height : 200}
          alt={"profile image"}
          src={url}
        />
      ) : (
        <Box className={styles.profile__userImageNone}>
          {userData.firstName.slice(0, 1).toUpperCase()}
        </Box>
      )}
      <Typography className={styles.profile__userName} variant="h2">
        {`${userData.firstName} ${userData.lastName}`}
      </Typography>
      <Typography className={styles.profile__userPosition}>
        {"Customer"}
      </Typography>
      <Link href={"/settings"}>
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
      </Link>
    </Box>
  );
};

export default Profile;
