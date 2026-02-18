/**
 * Format a date string for display
 * @param {string} isoString - ISO date string
 * @returns {string} Formatted date string
 */
export const formatDate = (isoString) => {
	if (!isoString) return '';
	try {
		const date = new Date(isoString);
		return date.toLocaleString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		});
	} catch {
		return isoString;
	}
};

/**
 * Convert tasks array to CSV format
 * @param {Array} tasks - Array of task objects
 * @returns {string} CSV formatted string
 */
export const tasksToCSV = (tasks) => {
	if (!tasks || tasks.length === 0) {
		return 'id,description,timestamp,startTime,endTime\n';
	}

	const headers = ['id', 'description', 'timestamp', 'startTime', 'endTime'];
	const headerRow = headers.join(',');

	const rows = tasks.map((task) => {
		return headers
			.map((header) => {
				let value = task[header] || '';
				if (typeof value === 'string') {
					value = value.replace(/"/g, '""');
					if (value.includes(',') || value.includes('\n') || value.includes('"')) {
						value = `"${value}"`;
					}
				}
				return value;
			})
			.join(',');
	});

	return [headerRow, ...rows].join('\n');
};

/**
 * Convert tasks array to formatted CSV with readable dates
 * @param {Array} tasks - Array of task objects
 * @returns {string} CSV formatted string with readable dates
 */
export const tasksToFormattedCSV = (tasks) => {
	if (!tasks || tasks.length === 0) {
		return 'ID,Description,Created At,Start Time,End Time\n';
	}

	const headerRow = 'ID,Description,Created At,Start Time,End Time';

	const rows = tasks.map((task) => {
		const id = task.id || '';
		const description = (task.description || '').replace(/"/g, '""');
		const timestamp = formatDate(task.timestamp);
		const startTime = formatDate(task.startTime);
		const endTime = formatDate(task.endTime);

		return `${id},"${description}",${timestamp},${startTime},${endTime}`;
	});

	return [headerRow, ...rows].join('\n');
};
