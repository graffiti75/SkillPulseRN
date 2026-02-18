import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../config';
import { validateCredentials } from './authValidation';
import { getAuthErrorMessage } from './authErrors';

/**
 * Sign in with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<{success: boolean, user?: Object, error?: string}>}
 */
export const login = async (email, password) => {
	const validation = validateCredentials(email, password);
	if (!validation.isValid) return { success: false, error: validation.error };

	try {
		const userCredential = await signInWithEmailAndPassword(auth, email, password);
		return { success: true, user: userCredential.user };
	} catch (error) {
		console.error('Login error:', error);
		return { success: false, error: getAuthErrorMessage(error.code) };
	}
};

/**
 * Create a new user account
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<{success: boolean, user?: Object, error?: string}>}
 */
export const signUp = async (email, password) => {
	const validation = validateCredentials(email, password);
	if (!validation.isValid) return { success: false, error: validation.error };

	try {
		const userCredential = await createUserWithEmailAndPassword(auth, email, password);
		return { success: true, user: userCredential.user };
	} catch (error) {
		console.error('Sign up error:', error);
		return { success: false, error: getAuthErrorMessage(error.code) };
	}
};

/**
 * Sign out the current user
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export const logout = async () => {
	try {
		await signOut(auth);
		return { success: true };
	} catch (error) {
		console.error('Logout error:', error);
		return { success: false, error: getAuthErrorMessage(error.code) };
	}
};

/**
 * Subscribe to auth state changes
 * @param {Function} callback - Callback function receiving user object
 * @returns {Function} Unsubscribe function
 */
export const onAuthChange = (callback) => {
	return onAuthStateChanged(auth, callback);
};
