"use client";
import AdjustIcon from "@mui/icons-material/Adjust";
import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Stepper from "@mui/material/Stepper";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface SubmenuProps {
  items?: { id: number; text: string; link: string }[];
}

const Submenu: React.FC<SubmenuProps> = ({ items = [] }) => {
  const pathname = usePathname();
  const [activeStep, setActiveStep] = useState<number>(-1);

  // Set active step based on current path
  useEffect(() => {
    const currentStep = items.findIndex((item) => item.link === pathname);
    if (currentStep !== -1) {
      setActiveStep(currentStep);
    }
  }, [pathname, items]);

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  return (
    <Box
      sx={{ width: "100%", padding: "10px 0px" }}
      className={"salesDashboard"}
    >
      <Stepper orientation={"vertical"} nonLinear activeStep={activeStep}>
        {items.map((item, index) => (
          <Step key={item.id}>
            <Link href={item.link}>
              <StepButton
                icon={<AdjustIcon sx={{ fontSize: "16px", width: "1.5em" }} />}
                color="inherit"
                onClick={handleStep(index)}
              >
                {item.text}
              </StepButton>
            </Link>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default Submenu;
