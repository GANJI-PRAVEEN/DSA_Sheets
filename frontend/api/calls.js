
const baseUrl = import.meta.env.VITE_API_URL;

// Reusable headers for authenticated requests
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Signup - Public API
export const createUserAPI = async ({ name, email, password }) => {
  try {
    const response = await fetch(`${baseUrl}/api/dsa-sheets/create-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    return await response.json();
  } catch (networkError) {
    console.error("Network error while calling createUserAPI:", networkError);
    throw networkError;
  }
};

// Login - Public API
export const userLoginAPI = async ({ email, password }) => {
  const res = await fetch(`${baseUrl}/api/dsa-sheets/user-login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  return await res.json();
};

// Google Login - Public API
export const googleLoginAPI = async ({ credential }) => {
  if (!baseUrl) {
    throw new Error("API base URL is not configured.");
  }

  const res = await fetch(`${baseUrl}/api/dsa-sheets/google-login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ credential }),
  });

  let data = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    return {
      success: false,
      status: res.status,
      message: data?.message || `Google login failed (HTTP ${res.status}).`,
      ...(data || {}),
    };
  }

  return data || { success: false, message: "Invalid server response." };
};

// Retrieve topics - Public API
export const retrieveTopicsAPI = async ({ sheetId }) => {
  const res = await fetch(`${baseUrl}/api/dsa-sheets/retrieveTopics`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sheetId }),
  });

  return await res.json();
};

// Fetch sheets - Public API
export const fetchSheetsAPI = async () => {
  const res = await fetch(`${baseUrl}/api/dsa-sheets/fetch-sheets`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await res.json();
};

// Mark problem solved/unsolved - Protected API
export const assignUpdateProblemStatusAPI = async ({
  topicId,
  problemId,
  sheetId,
  status,
}) => {
  const res = await fetch(`${baseUrl}/api/dsa-sheets/assignProblemSolved`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ sheetId, topicId, problemId, status }),
  });

  return await res.json();
};

// Retrieve user's solved problems - Protected API
export const fetchUserSolvedProblems = async ({
  sheetId,
  topicId,
}) => {
  const res = await fetch(`${baseUrl}/api/dsa-sheets/retrieveUserProgress`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ sheetId, topicId }),
  });

  return await res.json();
};

// Retrieve topic-wise solved problems - Protected API
export const fetchTopicWiseProblemsSolved = async ({ sheetId }) => {
  const res = await fetch(
    `${baseUrl}/api/dsa-sheets/retrieveTopicWiseSolvedProblems`,
    {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ sheetId }),
    }
  );

  return await res.json();
};

// Fetch problems - Public API
export const fetchProblemsAPI = async ({ topicId, sheetId }) => {
  const res = await fetch(`${baseUrl}/api/dsa-sheets/fetch-problems`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ topicId, sheetId }),
  });

  return await res.json();
};
