const timeFormat = (seconds: number): string => {
  const days = Math.floor(seconds / (3600 * 24));
  const hrs = Math.floor((seconds % (3600 * 24)) / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (days > 0) {
    return `${days}d : ${hrs}h : ${mins}m : ${secs}s`;
  } else if (hrs > 0) {
    return `${hrs}h : ${mins}m : ${secs}s`;
  } else if (mins > 0) {
    return `${mins}m : ${secs}s`;
  } else {
    return `${secs} seconds`;
  }
};

export default timeFormat;
