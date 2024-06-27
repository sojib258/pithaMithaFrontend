import timeFormat from "@/utils/timeFormat";
import { useEffect, useState } from "react";

interface ResponseTimeProps {
  startTime: string;
  onElapsedTimeUpdate: (value: number) => void;
  sx?: object;
}

const ResponseTime: React.FC<ResponseTimeProps> = ({
  startTime,
  onElapsedTimeUpdate,
}) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const orderCreatedTime = new Date(startTime).getTime();
      const elapsed = Math.floor((now - orderCreatedTime) / 1000);

      setElapsedTime(elapsed);
      onElapsedTimeUpdate(elapsed);
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, isRunning, elapsedTime, onElapsedTimeUpdate]);

  return <>{timeFormat(elapsedTime)}</>;
};

export default ResponseTime;
