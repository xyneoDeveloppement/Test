<template>
  <div class="drawer-overlay" @click.self="closeDrawer">
    <div class="drawer">
      <button class="close-button" @click="closeDrawer">&times;</button>
      <h2>Edit Survey</h2>
      
      <div class="survey-title">
        <h3>Survey Title</h3>
        <p>{{ survey.title }}</p>
      </div>
      
      <div class="questions-section">
        <h3>Questions</h3>
        <ul class="questions-list">
          <li v-for="question in survey.questions" :key="question.id">
            {{ question.text }}
            <button class="delete-question-button" @click="deleteQuestion(question.id)">🗑️</button>
          </li>
        </ul>
        
        <form @submit.prevent="addQuestion">
          <div class="form-group">
            <label for="newQuestion">Add a New Question</label>
            <input type="text" id="newQuestion" v-model="newQuestion" required />
          </div>
          <button type="submit" class="add-button" :disabled="isAdding">
            {{ isAdding ? 'Adding...' : 'Add Question' }}
          </button>
        </form>
      </div>
      
      <button class="delete-survey-button" @click="initiateDeleteSurvey" :disabled="isDeletingSurvey">
        {{ isDeletingSurvey ? 'Deleting...' : 'Delete Survey' }}
      </button>
      
      <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      
      <div v-if="showConfirmDeleteSurvey" class="confirm-overlay" @click.self="cancelDeleteSurvey">
        <div class="confirm-box">
          <p>Are you sure you want to delete this survey? This action is irreversible.</p>
          <button @click="deleteSurveyMethod" class="confirm-button">Yes, Delete</button>
          <button @click="cancelDeleteSurvey" class="cancel-button">No, Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'DrawerEditSurvey',
  props: {
    survey: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      newQuestion: '',
      isAdding: false,
      isDeletingSurvey: false,
      showConfirmDeleteSurvey: false,
      successMessage: '',
      errorMessage: '',
    };
  },
  methods: {
    ...mapActions(['addQuestionToSurvey', 'deleteSurvey']),
    
    closeDrawer() {
      this.$emit('close-drawer');
      this.resetForm();
    },
    
    async addQuestion() {
      if (!this.newQuestion.trim()) {
        this.errorMessage = 'The question cannot be empty.';
        return;
      }
      this.isAdding = true;
      this.successMessage = '';
      this.errorMessage = '';
      try {
        await this.addQuestionToSurvey({
          surveyId: this.survey.id,
          text: this.newQuestion,
        });
        this.newQuestion = '';
        this.successMessage = 'Question added successfully!';
      } catch (error) {
        console.error('Error adding question:', error);
        this.errorMessage = 'Error adding the question. Please try again.';
      } finally {
        this.isAdding = false;
      }
    },
    
    async deleteQuestion(questionId) {
      if (!confirm('Are you sure you want to delete this question?')) {
        return;
      }
      try {
        await this.$store.dispatch('deleteQuestion', { surveyId: this.survey.id, questionId });
        this.successMessage = 'Question deleted successfully!';
      } catch (error) {
        console.error('Error deleting question:', error);
        this.errorMessage = 'Error deleting the question. Please try again.';
      }
    },
    
    initiateDeleteSurvey() {
      this.showConfirmDeleteSurvey = true;
    },
    
    cancelDeleteSurvey() {
      this.showConfirmDeleteSurvey = false;
    },
    
    async deleteSurveyMethod() {
      this.isDeletingSurvey = true;
      this.successMessage = '';
      this.errorMessage = '';
      try {
        await this.deleteSurvey(this.survey.id);
        this.successMessage = 'Survey deleted successfully!';
        this.closeDrawer();
      } catch (error) {
        console.error('Error deleting survey:', error);
        this.errorMessage = 'Error deleting the survey. Please try again.';
      } finally {
        this.isDeletingSurvey = false;
        this.showConfirmDeleteSurvey = false;
      }
    },
    
    resetForm() {
      this.newQuestion = '';
      this.isAdding = false;
      this.isDeletingSurvey = false;
      this.showConfirmDeleteSurvey = false;
      this.successMessage = '';
      this.errorMessage = '';
    },
  },
};
</script>

<style scoped>
.drawer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: flex-end;
  z-index: 1001;
}

.drawer {
  background-color: #fff;
  width: 400px;
  max-width: 90%;
  height: 100%;
  padding: 2rem;
  position: relative;
  overflow-y: auto;
  box-shadow: -2px 0 5px rgba(0,0,0,0.3);
  animation: slideIn 0.3s forwards;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #777;
}

.close-button:hover {
  color: #333;
}

.drawer h2,
.drawer h3 {
  margin-bottom: 1rem;
  color: #2c3e50;
}

.survey-title {
  margin-bottom: 1rem;
}

.survey-title p {
  font-size: 1rem;
  color: #34495e;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #34495e;
  font-weight: 600;
}

.form-group input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #bdc3c7;
  border-radius: 4px;
  font-size: 1rem;
}

.add-button,
.delete-survey-button {
  padding: 0.6rem 1rem;
  margin-top: 1.5rem;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.add-button:hover,
.delete-survey-button:hover {
  background-color: #2980b9;
}

.add-button:disabled,
.delete-survey-button:disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
}

.questions-section {
  margin-top: 2rem;
}

.questions-list {
  list-style: none;
  padding-left: 0;
  margin-top: 1rem;
}

.questions-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ecf0f1;
  padding: 0.5rem;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

.delete-question-button {
  background-color: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.3rem 0.6rem;
  cursor: pointer;
  font-size: 0.8rem;
  transition: background-color 0.3s;
}

.delete-question-button:hover {
  background-color: #c0392b;
}

.success-message {
  margin-top: 1rem;
  padding: 0.5rem;
  background-color: #2ecc71;
  color: #fff;
  border-radius: 4px;
  text-align: center;
}

.error-message {
  margin-top: 1rem;
  padding: 0.5rem;
  background-color: #e74c3c;
  color: #fff;
  border-radius: 4px;
  text-align: center;
}

/* Finalize Button */
.finalize-button {
  width: 100%;
  margin-top: 1rem;
}

/* Delete Survey Button */
.delete-survey-button {
  background-color: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.6rem 1rem;
  transition: background-color 0.3s;
}

.delete-survey-button:hover {
  background-color: #c0392b;
}

.confirm-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1002;
}

.confirm-box {
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
}

.confirm-button,
.cancel-button {
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.confirm-button {
  background-color: #2ecc71;
  color: #fff;
}

.confirm-button:hover {
  background-color: #27ae60;
}

.cancel-button {
  background-color: #e74c3c;
  color: #fff;
}

.cancel-button:hover {
  background-color: #c0392b;
}

@media (max-width: 480px) {
  .drawer {
    width: 100%;
  }
}
</style>
