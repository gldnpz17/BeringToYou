import { DateTime } from "luxon"

const DateTimeUtil = {
  formatDateTime: (dateTimeStringInISO) => {
    return DateTime.fromISO(dateTimeStringInISO).toFormat('dd LLLL yyyy, T');
  }
}

export default DateTimeUtil;