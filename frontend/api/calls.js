
export const createUserAPI = async ({ name, email, password }) => {
  const baseUrl = import.meta.env.VITE_API_URL;
  if (!baseUrl) {
    const msg = 'VITE_API_URL is not defined. Please check your .env file and restart the dev server.';
    console.error(msg);
    throw new Error(msg);
  }
  const url = `${baseUrl}/api/dsa-sheets/create-user`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await response.json();
    return data;
  } catch (networkError) {
    console.error('Network error while calling createUserAPI:', networkError);
    throw networkError;
  }
};