
/**
 * Send a POST request to the backend to create a new user.
 *
 * @param {object} userInfo - Object containing name, email and password.
 * @param {string} userInfo.name
 * @param {string} userInfo.email
 * @param {string} userInfo.password
 * @returns {Promise<object>} Parsed JSON response from the server.
 * @throws {Error} When network request fails or server returns non-OK status.
 */
export const createUserAPI = async ({ name, email, password }) => {
  const baseUrl = import.meta.env.VITE_API_URL;
  if (!baseUrl) {
    const msg = 'VITE_API_URL is not defined. Please check your .env file and restart the dev server.';
    console.error(msg);
    throw new Error(msg);
  }
  const url = `${baseUrl.replace(/\/+$/, '')}/create-user`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    // Response might not contain valid JSON if status is not OK; capture text first
    const text = await response.text();

    if (!response.ok) {
      const message = text || response.statusText;
      const error = new Error(`Request failed with status ${response.status}: ${message}`);
      error.status = response.status;
      throw error;
    }

    try {
      return JSON.parse(text);
    } catch (parseError) {
      console.error('Failed to parse JSON from createUserAPI response:', parseError, 'raw text:', text);
      throw parseError;
    }
  } catch (networkError) {
    // this will catch fetch errors such as network failure, CORS, etc.
    console.error('Network error while calling createUserAPI:', networkError);
    throw networkError;
  }
};