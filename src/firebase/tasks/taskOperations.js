import {
	collection,
	doc,
	getDocs,
	setDoc,
	updateDoc,
	deleteDoc,
	query,
	where,
} from 'firebase/firestore';
import { db } from '../config';
import { TASKS_COLLECTION } from './constants';
import { generateTaskId } from './taskIdGenerator';
import { getFirestoreErrorMessage } from './errorHandler';

/**
 * Find task document by ID and user
 * @param {string} taskId - The task ID
 * @param {string} userEmail - The current user's email
 * @returns {Promise<string|null>} The Firestore document ID or null if not found
 */
const findTaskDoc = async (taskId, userEmail) => {
	if (!userEmail) {
		throw new Error('User email is required');
	}

	const snapshot = await getDocs(
		query(
			collection(db, TASKS_COLLECTION),
			where('id', '==', taskId),
			where('userId', '==', userEmail)
		)
	);
	return snapshot.empty ? null : snapshot.docs[0].id;
};

/**
 * Add a new task for the current user
 * @param {string} userEmail - The current user's email
 * @param {string} description - Task description
 * @param {string} startTime - Task start time
 * @param {string} endTime - Task end time
 * @returns {Promise<{ success: boolean, task?: Object, error?: string }>}
 */
export const addTask = async (userEmail, description, startTime, endTime) => {
	try {
		if (!userEmail) {
			return { success: false, error: 'User email is required' };
		}

		const taskId = await generateTaskId(startTime);
		const task = {
			id: taskId,
			userId: userEmail,
			description,
			timestamp: new Date().toISOString(),
			startTime,
			endTime,
		};
		await setDoc(doc(db, TASKS_COLLECTION, taskId), task);
		return { success: true, task };
	} catch (error) {
		console.error('Error adding task:', error);
		return { success: false, error: getFirestoreErrorMessage(error) };
	}
};

/**
 * Update an existing task for the current user
 * @param {string} userEmail - The current user's email
 * @param {string} taskId - The task ID to update
 * @param {string} description - Updated description
 * @param {string} startTime - Updated start time
 * @param {string} endTime - Updated end time
 * @returns {Promise<{ success: boolean, error?: string }>}
 */
export const updateTask = async (userEmail, taskId, description, startTime, endTime) => {
	try {
		if (!userEmail) {
			return { success: false, error: 'User email is required' };
		}

		const documentId = await findTaskDoc(taskId, userEmail);
		if (!documentId) return { success: false, error: 'Task not found' };
		await updateDoc(doc(db, TASKS_COLLECTION, documentId), {
			description,
			startTime,
			endTime,
		});
		return { success: true };
	} catch (error) {
		console.error('Error updating task:', error);
		return { success: false, error: getFirestoreErrorMessage(error) };
	}
};

/**
 * Delete a task for the current user
 * @param {string} userEmail - The current user's email
 * @param {string} taskId - The task ID to delete
 * @returns {Promise<{ success: boolean, error?: string }>}
 */
export const deleteTask = async (userEmail, taskId) => {
	try {
		if (!userEmail) {
			return { success: false, error: 'User email is required' };
		}

		const documentId = await findTaskDoc(taskId, userEmail);
		if (!documentId) return { success: false, error: 'Task not found' };

		await deleteDoc(doc(db, TASKS_COLLECTION, documentId));
		return { success: true };
	} catch (error) {
		console.error('Error deleting task:', error);
		return { success: false, error: getFirestoreErrorMessage(error) };
	}
};
