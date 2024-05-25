const timeFormat = (publishedAt: string) => {
  const currentDate = new Date();
  const historyDate = new Date(publishedAt);

  const timeDifferenceInSec = Math.floor(
    (currentDate.getTime() - historyDate.getTime()) / 1000
  );
  const minute = Math.floor(timeDifferenceInSec / 60);
  const hours = Math.floor(minute / 60);
  const days = Math.floor(hours / 24);
  const month = Math.floor(days / 30);
  const year = Math.floor(days / 365.3);

  if (timeDifferenceInSec < 60) {
    return `${timeDifferenceInSec} second${
      timeDifferenceInSec !== 1 ? "s" : ""
    } ago`;
  } else if (minute < 60) {
    return `${minute} minute${minute !== 1 ? "s" : ""} ago`;
  } else if (hours < 24) {
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  } else if (days < 30) {
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  } else if (month < 12) {
    return `${month} month${month !== 1 ? "s" : ""} ago`;
  } else {
    return `${year} year${year !== 1 ? "s" : ""} ago`;
  }
};

export default timeFormat;
