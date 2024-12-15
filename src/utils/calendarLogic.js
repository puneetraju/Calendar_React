import dayjs from "dayjs";

/**
 * Generates the days for a given month, including leading and trailing empty cells for alignment.
 * @param {string} month - The month as MM (01-12).
 * @param {string} year - The year as YYYY.
 * @returns {Array} - Array of days (including null for empty cells).
 */
export const getDaysInMonth = (month, year) => {
  const firstDayOfMonth = dayjs(`${year}-${month}-01`);
  const daysInMonth = firstDayOfMonth.daysInMonth();

  // Find how many empty cells are needed for the first row
  const startDayOfWeek = firstDayOfMonth.day(); // 0 = Sunday, 1 = Monday, ...
  const daysArray = [];

  // Add leading nulls for empty cells
  for (let i = 0; i < startDayOfWeek; i++) {
    daysArray.push(null); // Null represents an empty cell
  }

  // Add the actual days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    daysArray.push(firstDayOfMonth.date(day));
  }

  // Add trailing nulls to complete the last row
  const totalCells = daysArray.length;
  const trailingNulls = (7 - (totalCells % 7)) % 7; // Fill the remaining cells to make full weeks
  for (let i = 0; i < trailingNulls; i++) {
    daysArray.push(null);
  }

  return daysArray;
};

/**
 * Gets the formatted month and year for display purposes.
 * @param {object} currentDate - Day.js object representing the current date.
 * @returns {object} - Object containing month and year.
 */
export const getMonthYear = (currentDate) => {
  return {
    month: currentDate.format("MMMM"),
    year: currentDate.format("YYYY"),
  };
};

