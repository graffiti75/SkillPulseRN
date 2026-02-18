const DEFAULT_SUGGESTIONS_LIMIT = 10;

const normalizeText = (text) => text.toLowerCase().trim();

const matchesQuery = (description, query) => {
	const normalizedDescription = normalizeText(description);
	const normalizedQuery = normalizeText(query);
	return normalizedDescription.startsWith(normalizedQuery);
};

const getUniqueDescriptions = (tasks) => [...new Set(tasks.map((task) => task.description))];

const filterByQuery = (descriptions, query) => {
	if (!query || query.trim() === '') {
		return descriptions;
	}
	return descriptions.filter((desc) => matchesQuery(desc, query));
};

const limitResults = (items, limit) => items.slice(0, limit);

export const extractSuggestions = (
	tasks,
	query = '',
	suggestionsLimit = DEFAULT_SUGGESTIONS_LIMIT
) => {
	const uniqueDescriptions = getUniqueDescriptions(tasks);
	const filteredDescriptions = filterByQuery(uniqueDescriptions, query);
	const ret = limitResults(filteredDescriptions, suggestionsLimit);
	console.log(`extractSuggestions: ${ret}`);
	return ret;
};
