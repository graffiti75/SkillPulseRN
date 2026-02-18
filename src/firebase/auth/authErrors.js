/**
 * Convert Firebase auth error codes to user-friendly messages
 * @param {string} errorCode - Firebase error code
 * @returns {string} User-friendly error message
 */
export const getAuthErrorMessage = (errorCode) => {
	const errorMessages = {
		'auth/email-already-in-use': 'This email is already registered. Please log in instead.',
		'auth/invalid-email': 'Please enter a valid email address.',
		'auth/operation-not-allowed':
			'Email/password accounts are not enabled. Please contact support.',
		'auth/weak-password': 'Password is too weak. Please use at least 6 characters.',
		'auth/user-disabled': 'This account has been disabled. Please contact support.',
		'auth/user-not-found': 'No account found with this email. Please sign up first.',
		'auth/wrong-password': 'Incorrect password. Please try again.',
		'auth/invalid-credential': 'Invalid email or password. Please check your credentials.',
		'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
		'auth/network-request-failed': 'Network error. Please check your internet connection.',
		'auth/app-not-authorized': 'App not authorized. Please contact support.',
	};

	return errorMessages[errorCode] || 'An error occurred. Please try again.';
};
