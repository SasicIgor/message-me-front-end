export const formatMsgDate = (date: string) => {
  //make date object
  const dateObj = new Date(date);
  //get h and m | add 0 in front of single digits
  const minutes = `${dateObj.getMinutes() < 10 ? `0${dateObj.getMinutes()}` : `${dateObj.getMinutes()}`}`;
  const hours = `${dateObj.getHours() < 10 ? `0${dateObj.getHours()}` : `${dateObj.getHours()}`}`;

  const time = `${hours}:${minutes}`;
  const msgDate = `${dateObj.getDate()}-${dateObj.getMonth() + 1}-${dateObj.getFullYear()}`;
  return { time, msgDate };
};

const dayBefore = () => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date;
};

const opt: Intl.DateTimeFormatOptions = {
  month: "long",
  day: "numeric",
};

export const formatDateForDisplay = (date: string) => {
  const msgDate = new Date(date);
  const today = new Date();
  const yesterday = dayBefore();

  //next three variables are just formated dates from above

  const m = msgDate.toLocaleDateString("en-US", opt);
  const t = today.toLocaleDateString("en-US", opt);
  const y = yesterday.toLocaleDateString("en-US", opt);

  if (m == t) return "Today";
  if (m == y) return "Yesterday";
  return m;
};
