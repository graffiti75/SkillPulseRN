const ERROR_MESSAGES = {
    "permission-denied": "You do not have permission to perform this action.",
    unavailable: "Service is temporarily unavailable. Please try again.",
    "not-found": "The requested document was not found.",
    "already-exists": "A document with this ID already exists.",
    "resource-exhausted": "Quota exceeded. Please try again later.",
    cancelled: "Operation was cancelled.",
    "data-loss": "Data loss occurred. Please contact support.",
    unauthenticated: "You must be logged in to perform this action.",
};

export const getFirestoreErrorMessage = (error) =>
    ERROR_MESSAGES[error.code] ||
    error.message ||
    "An error occurred. Please try again.";
