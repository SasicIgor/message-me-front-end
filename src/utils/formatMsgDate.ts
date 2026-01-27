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
