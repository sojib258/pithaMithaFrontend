import Footer from "@/components/organisms/footer/Footer";
import Header from "@/components/organisms/header/Header";
import Newsletter from "@/components/organisms/newsLetter/NewsLetter";
import Box from "@mui/material/Box";
import { ReactNode } from "react";
import styles from "./defaultTemplate.module.scss";

interface DefaultTemplateProps {
  children?: ReactNode;
}
7;
const DefaultTemplate: React.FC<DefaultTemplateProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      {/* NewsLetter Area */}
      <Box component={"section"} className={styles.newsLetter}>
        <Box className={styles.newsLetter__wrapper}>
          <Newsletter />
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default DefaultTemplate;
