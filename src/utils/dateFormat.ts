const dateFormat = (utcTimeString: string) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
  const date = new Date(utcTimeString);
  const month = date.getMonth();
  const tarikh = date.getDate();
  const year = date.getFullYear();

  let hh = date.getHours();
  const mm = date.getMinutes();
  const ss = date.getSeconds();

  const ext = hh > 11 ? "PM" : "AM";
  if (hh === 0) {
    hh = 12;
  }
  return {
    date: `${tarikh}-${months[month]}-${year}`,
    time: `${hh > 12 ? hh - 12 : hh}:${mm}:${ss} ${ext}`,
  };
};

export default dateFormat;
