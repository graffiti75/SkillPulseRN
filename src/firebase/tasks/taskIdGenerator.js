import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../config';
import { TASKS_COLLECTION } from './constants';

export const generateTaskId = async (startTime) => {
	const date = new Date(startTime);
	const datePrefix = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(
		2,
		'0'
	)}${String(date.getDate()).padStart(2, '0')}`;

	const snapshot = await getDocs(query(collection(db, TASKS_COLLECTION), orderBy('id', 'desc')));

	const maxNumber = snapshot.docs.reduce((max, doc) => {
		const id = doc.data().id;
		if (id?.startsWith(`${datePrefix}_`)) {
			const num = parseInt(id.split('_')[1], 10) || 0;
			return num > max ? num : max;
		}
		return max;
	}, 0);

	return `${datePrefix}_${String(maxNumber + 1).padStart(2, '0')}`;
};
