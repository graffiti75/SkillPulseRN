export const MONTH_NAMES = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

export const generateFilename = (year, month, extension) => {
    const monthName = MONTH_NAMES[month - 1];
    return `tasks_${monthName}_${year}.${extension}`;
};
