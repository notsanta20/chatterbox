import { format } from "date-fns";

function convertTime(time: string) {
  const date = format(time, "h:mm");
  return date;
}

export default convertTime;
