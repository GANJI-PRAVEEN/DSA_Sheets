const baseUrl = import.meta.env.VITE_API_URL

export const createUserAPI = async ({ name, email, password }) => {
  try {
    const response = await fetch(`${baseUrl}/api/dsa-sheets/create-user`, {
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

export const userLoginAPI = async ({
  email,
  password
}) => {
  const res = await fetch(`${baseUrl}/api/dsa-sheets/user-login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  return data;
}

export const retrieveTopicsAPI = async ({sheetId}) => {
  console.log("calls ",sheetId)
  const res = await fetch(`${baseUrl}/api/dsa-sheets/retrieveTopics`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body:JSON.stringify({sheetId:sheetId})
  });
  const data = await res.json();
  return data;
}

export const fetchSheetsAPI = async() => {
  const res = await fetch(`${baseUrl}/api/dsa-sheets/fetch-sheets`,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  return data;
}

export const assignUpdateProblemStatusAPI = async ({
  userId,
  topicId,
  problemId,
  sheetId,
  status
}) => {
  const res = await fetch(`${baseUrl}/api/dsa-sheets/assignProblemSolved`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sheetId:sheetId,userId: userId, topicId: topicId, problemId: problemId, status: status }),
  });
  const data = await res.json();
  return data;
}

export const fetchUserSolvedProblems = async ({
  sheetId,
  userId,
  topicId
}) => {
  const res = await fetch(`${baseUrl}/api/dsa-sheets/retrieveUserProgress`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sheetId: sheetId, userId: userId, topicId: topicId }),
  });
  const data = await res.json();
  return data;
}

export const fetchTopicWiseProblemsSolved = async ({
  sheetId,
  userId
}) => {
  const res = await fetch(`${baseUrl}/api/dsa-sheets/retrieveTopicWiseSolvedProblems`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sheetId:sheetId,userId: userId }),
  });
  const data = await res.json();
  return data;
}

export const fetchProblemsAPI = async({
  topicId,
  sheetId
}) => {
  const res = await fetch(`${baseUrl}/api/dsa-sheets/fetch-problems`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({topicId,sheetId}),
  });
  const data = await res.json();
  return data;
}