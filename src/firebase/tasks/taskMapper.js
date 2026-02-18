export const mapDocumentToTask = (doc) => {
	try {
		const { id, description, timestamp, startTime, endTime } = doc.data();
		return id && description && timestamp && startTime && endTime
			? { id, description, timestamp, startTime, endTime }
			: null;
	} catch (error) {
		console.error('Error mapping document to task:', error);
		return null;
	}
};
