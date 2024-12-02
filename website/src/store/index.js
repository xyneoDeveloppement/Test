import { createStore } from 'vuex';
import api from '@/services/api';

export default createStore({
  state: {
    surveys: [],
    currentSurvey: null,
    editingSurvey: null,
    isCreateDrawerOpen: false,
  },
  mutations: {
    setSurveys(state, surveys) {
      state.surveys = surveys;
    },
    addSurvey(state, survey) {
      state.surveys.unshift(survey);
    },
    addQuestion(state, { surveyId, question }) {
      const survey = state.surveys.find(s => s.id === surveyId);
      if (survey) {
        if (!survey.questions) {
          survey.questions = [];
        }
        survey.questions.push(question);
      }
    },
    removeSurvey(state, surveyId) {
      state.surveys = state.surveys.filter(survey => survey.id !== surveyId);
    },
    removeQuestion(state, { surveyId, questionId }) {
      const survey = state.surveys.find(s => s.id === surveyId);
      if (survey && survey.questions) {
        survey.questions = survey.questions.filter(q => q.id !== questionId);
      }
    },
    setCurrentSurvey(state, survey) {
      state.currentSurvey = survey;
    },
    clearCurrentSurvey(state) {
      state.currentSurvey = null;
    },
    setEditingSurvey(state, survey) {
      state.editingSurvey = survey;
    },
    clearEditingSurvey(state) {
      state.editingSurvey = null;
    },
    openCreateDrawer(state) {
      state.isCreateDrawerOpen = true;
    },
    closeCreateDrawer(state) {
      state.isCreateDrawerOpen = false;
    },
    updateSurveyAnswers(state, { surveyId, questionId, answer }) {
      console.log('Updating survey answers:', surveyId, questionId, answer);
      const survey = state.surveys.find(s => s.id === surveyId);
      if (survey && survey.questions) {
        const question = survey.questions.find(q => q.id === questionId);
        if (question) {
          if (!question.answers) {
            question.answers = [];
          }
          if (answer && answer.response) { // Assuming 'response' is a field
            question.answers.push(answer);
            console.log('Answer added to question:', question);
          } else {
            console.warn('Invalid answer format:', answer);
          }
        } else {
          console.warn(`Question ID ${questionId} not found in survey ID ${surveyId}`);
        }
      } else {
        console.warn(`Survey ID ${surveyId} not found`);
      }
      if (state.currentSurvey && state.currentSurvey.id === surveyId) {
        const currentQuestion = state.currentSurvey.questions.find(q => q.id === questionId);
        if (currentQuestion) {
          if (!currentQuestion.answers) {
            currentQuestion.answers = [];
          }
          if (answer && answer.response) {
            currentQuestion.answers.push(answer);
            console.log('Answer added to currentSurvey question:', currentQuestion);
          } else {
            console.warn('Invalid answer format in currentSurvey:', answer);
          }
        } else {
          console.warn(`Current question ID ${questionId} not found in survey ID ${surveyId}`);
        }
      }
    },
  },
  actions: {
    async fetchSurveys({ commit }) {
      try {
        const response = await api.getSurveys();
        commit('setSurveys', response.data);
      } catch (error) {
        console.error('Error fetching surveys:', error);
        throw error;
      }
    },
    async createSurvey({ commit }, title) {
      try {
        const response = await api.createSurvey(title);
        commit('addSurvey', response.data);
        return response.data;
      } catch (error) {
        console.error('Error creating survey:', error);
        throw error;
      }
    },
    async addQuestionToSurvey({ commit }, { surveyId, text }) {
      try {
        const response = await api.addQuestionToSurvey(surveyId, text);
        commit('addQuestion', { surveyId, question: response.data });
        return response.data;
      } catch (error) {
        console.error('Error adding question:', error);
        throw error;
      }
    },
    async deleteSurvey({ commit }, surveyId) {
      try {
        await api.deleteSurvey(surveyId);
        commit('removeSurvey', surveyId);
      } catch (error) {
        console.error('Error deleting survey:', error);
        throw error;
      }
    },
    async deleteQuestion({ commit }, { surveyId, questionId }) {
      try {
        await api.deleteQuestion(questionId);
        commit('removeQuestion', { surveyId, questionId });
      } catch (error) {
        console.error('Error deleting question:', error);
        throw error;
      }
    },
    async fetchSurveyById({ commit }, surveyId) {
      try {
        const response = await api.getSurveyById(surveyId);
        commit('setCurrentSurvey', response.data);
      } catch (error) {
        console.error('Error fetching survey:', error);
        throw error;
      }
    },
    async addAnswerToQuestion({ commit }, { surveyId, questionId, responseText }) {
      try {
        const response = await api.addAnswerToQuestion(questionId, responseText);
        console.log('API addAnswerToQuestion response:', response.data);
        commit('updateSurveyAnswers', { surveyId, questionId, answer: response.data });
        return response.data;
      } catch (error) {
        console.error('Error adding answer:', error);
        throw error;
      }
    },
    setCurrentSurvey({ commit }, survey) {
      commit('setCurrentSurvey', survey);
    },
    clearCurrentSurvey({ commit }) {
      commit('clearCurrentSurvey');
    },
    setEditingSurvey({ commit }, survey) {
      commit('setEditingSurvey', survey);
    },
    clearEditingSurvey({ commit }) {
      commit('clearEditingSurvey');
    },
    openCreateDrawer({ commit }) {
      commit('openCreateDrawer');
    },
    closeCreateDrawer({ commit }) {
      commit('closeCreateDrawer');
    },
  },
  getters: {
    allSurveys: (state) => state.surveys,
    currentSurvey: (state) => state.currentSurvey,
    editingSurvey: (state) => state.editingSurvey,
    isCreateDrawerOpen: (state) => state.isCreateDrawerOpen,
  },
  modules: {},
});
