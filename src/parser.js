export const getMonth = (date) => {
  var day = new Date(date).getMonth();
  switch (day) {
    case 0:
      return "Jan";
    case 1:
      return "Feb";
    case 2:
      return "Mar";
    case 3:
      return "Apr";
    case 4:
      return "May";
    case 5:
      return "June";
    case 6:
      return "July";
    case 7:
      return "Aug";
    case 8:
      return "Sep";
    case 9:
      return "Oct";
    case 10:
      return "Nov";
    case 11:
      return "Dec";
    default:
      break;
  }
};

export const To12Hours = (time) => {
  var d = time.split(":")[0];
  var mins = time.split(":")[1]
  var extra = d % 12;
  var hour = extra === 0 ? 12 : extra;
  var am = d >= 12 ? "PM" : "AM";
  var final = hour+":"+mins+" "+am
  return final
};

export const getWeekLong = (day) => {
  switch (day) {
    case "Mon":
      return "Monday";
    case "Tue":
      return "Tuesday";
    case "Wed":
      return "Wednesday";
    case "Thu":
      return "Thursday";
    case "Fri":
      return "Friday";
    case "Sat":
      return "Saturday";
    case "Sun":
      return "Sunday";
    default:
      break;
  }
}