import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { ReactNode } from "react";
import styles from "./filterAccordion.module.scss";
interface FilterAccordionProps {
  title: string;
  children: ReactNode;
}

const FilterAccordion: React.FC<FilterAccordionProps> = ({
  children,
  title,
}) => {
  return (
    <Box className={styles.accordion}>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
          className={styles.accordion__title}
        >
          {title}
        </AccordionSummary>
        <AccordionDetails>{children}</AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default FilterAccordion;
