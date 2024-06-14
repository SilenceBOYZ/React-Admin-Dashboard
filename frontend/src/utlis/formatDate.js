function formatDate(date) {
  const format = new Date(date);
  return format.getDate() + "-" + (parseInt(format.getMonth()) + 1) + "-" + format.getFullYear();
}

function formatMonth(date) {
  const format = new Date(date);
  return (parseInt(format.getMonth()) + 1) + "-" + format.getFullYear();
}

function getAllMonthInYear(numberOfmonth = 12) {
  try {
    if (isNaN(numberOfmonth)) throw new Error("The values is not a number");
    if (!numberOfmonth) throw new Error("The values is undefined");
    else {
      let months = new Array(numberOfmonth);
      const date = new Date();
      for (let i = 0; i < months.length; i++) {
        months[i] = (i + 1) + "-" + date.getFullYear();
      }
      return months
    }
  } catch (error) {
    console.error(error.message);
  }
}

const year = new Date().getFullYear();

export { formatDate, getAllMonthInYear, formatMonth, year }
