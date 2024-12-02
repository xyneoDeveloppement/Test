import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to create a survey
export const createSurvey = (title) => {
  return apiClient.post('/surveys', { title });
};

// Function to add a question to a survey
export const addQuestionToSurvey = (surveyId, text) => {
  return apiClient.post(`/questions/survey/${surveyId}`, { text });
};

// Function to get all surveys
export const getSurveys = () => {
  return apiClient.get('/surveys');
};

// Function to get a survey by ID
export const getSurveyById = (surveyId) => {
  return apiClient.get(`/surveys/${surveyId}`);
};

// Function to delete a survey
export const deleteSurvey = (surveyId) => {
  return apiClient.delete(`/surveys/${surveyId}`);
};

// Function to delete a question
export const deleteQuestion = (questionId) => {
  return apiClient.delete(`/questions/${questionId}`);
};

// Function to add an answer to a question
export const addAnswerToQuestion = (questionId, response) => {
  return apiClient.post(`/questions/${questionId}/answers`, { response });
};

export default {
  createSurvey,
  addQuestionToSurvey,
  getSurveys,
  getSurveyById,
  deleteSurvey,
  deleteQuestion,
  addAnswerToQuestion,
};
