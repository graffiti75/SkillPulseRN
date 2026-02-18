export const getDaysInMonth = (date) => {
	const year = date.getFullYear();
	const month = date.getMonth();
	const firstDay = new Date(year, month, 1);
	const lastDay = new Date(year, month + 1, 0);
	const daysInMonth = lastDay.getDate();
	const startingDay = firstDay.getDay();
	const today = new Date().toDateString();

	const days = [];
	for (let i = 0; i < startingDay; i++) {
		days.push({ day: '', empty: true });
	}
	for (let i = 1; i <= daysInMonth; i++) {
		const date = new Date(year, month, i);
		days.push({
			day: i,
			date,
			isToday: today === date.toDateString(),
			isSelected: false,
		});
	}
	return days;
};

export const createDateTime = (date, hours, minutes) => {
	const dateTime = new Date(date);
	dateTime.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0);
	return dateTime.toISOString();
};
