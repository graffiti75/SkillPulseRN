/**
 * Validate email and password inputs
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {{isValid: boolean, error?: string}}
 */
export const validateCredentials = (email, password) => {
    if (!email?.trim())
        return { isValid: false, error: "Email cannot be empty" };
    if (!password?.trim())
        return { isValid: false, error: "Password cannot be empty" };
    return { isValid: true };
};
