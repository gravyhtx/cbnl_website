import { ReactNode } from "react"
import { checkType } from "../../utils/validation";

const Time = (
  date: Date,
  children: ReactNode | string
) => {
  const newDate = checkType(date, 'date') ? date.toDateString() : new Date(date).toDateString();
  return (
    <time dateTime={newDate}>{children}</time>
  )
}

export default Time;