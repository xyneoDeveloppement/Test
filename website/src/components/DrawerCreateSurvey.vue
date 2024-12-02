<template>
  <div class="drawer-overlay" @click.self="closeDrawer">
    <div class="drawer">
      <button class="close-button" @click="closeDrawer">&times;</button>
      <h2>Create a survey</h2>
      
      <form v-if="!surveyId" @submit.prevent="createSurveyMethod">
        <div class="form-group">
          <label for="title">Survey title</label>
          <input type="text" id="title" v-model="surveyTitle" required />
        </div>
        <button type="submit" class="submit-button" :disabled="isSubmitting">
          {{ isSubmitting ? 'Création...' : 'Créer Enquête' }}
        </button>
      </form>
      
      <div v-else class="questions-section">
        <h3>Add Questions</h3>
        <form @submit.prevent="addQuestion">
          <div class="form-group">
            <label for="question">Question</label>
            <input type="text" id="question" v-model="newQuestion" required />
          </div>
          <button type="submit" class="add-button" :disabled="isAdding">
            {{ isAdding ? 'Adding...' : 'Add Question' }}
          </button>
        </form>
        <ul class="questions-list">
          <li v-for="(q, index) in questions" :key="index">{{ q }}</li>
        </ul>
        <button class="finalize-button" @click="initiateFinalizeSurvey" :disabled="isFinalizing">
          {{ isFinalizing ? 'Finalizing...' : 'Finalize Survey' }}
        </button>
      </div>
      
      <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      
      <div v-if="showConfirmFinalize" class="confirm-overlay" @click.self="cancelFinalize">
        <div class="confirm-box">
          <p>Are you sure you want to complete this survey?</p>
          <button @click="finalizeSurvey" class="confirm-button">Yes</button>
          <button @click="cancelFinalize" class="cancel-button">No</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'DrawerCreateSurvey',
  data() {
    return {
      surveyTitle: '',
      surveyId: null,
      newQuestion: '',
      questions: [],
      isSubmitting: false,
      isAdding: false,
      isFinalizing: false,
      showConfirmFinalize: false,
      successMessage: '',
      errorMessage: '',
    };
  },
  methods: {
    ...mapActions(['createSurvey', 'addQuestionToSurvey']),
    closeDrawer() {
      this.$emit('close-drawer');
      this.resetForm();
    },
    async createSurveyMethod() {
      this.isSubmitting = true;
      this.successMessage = '';
      this.errorMessage = '';
      try {
        const newSurvey = await this.createSurvey(this.surveyTitle);
        this.surveyId = newSurvey.id;
        this.successMessage = 'Survey successfully created! You can now add questions.';
        this.surveyTitle = '';
      } catch (error) {
        console.error('Error when creating the survey:', error);
        this.errorMessage = 'Error creating survey. Please try again.';
      } finally {
        this.isSubmitting = false;
      }
    },
    async addQuestion() {
      if (!this.surveyId) {
        this.errorMessage = 'Please create a survey before adding questions.';
        return;
      }
      if (!this.newQuestion.trim()) {
        this.errorMessage = 'The question cannot be empty.';
        return;
      }
      this.isAdding = true;
      this.successMessage = '';
      this.errorMessage = '';
      try {
        const addedQuestion = await this.addQuestionToSurvey({
          surveyId: this.surveyId,
          text: this.newQuestion,
        });
        this.questions.push(addedQuestion.text); 
        this.newQuestion = '';
        this.successMessage = 'Question successfully added!';
      } catch (error) {
        console.error('Error adding question :', error);
        this.errorMessage = 'Error adding question. Please try again.';
      } finally {
        this.isAdding = false;
      }
    },
    initiateFinalizeSurvey() {
      this.showConfirmFinalize = true;
    },
    async finalizeSurvey() {
      this.isFinalizing = true;
      this.successMessage = '';
      this.errorMessage = '';
      try {
        this.successMessage = 'Survey successfully completed!';
        this.closeDrawer();
      } catch (error) {
        console.error('Error when finalizing the survey:', error);
        this.errorMessage = 'Error while finalizing the survey. Please try again.';
      } finally {
        this.isFinalizing = false;
        this.showConfirmFinalize = false;
      }
    },
    cancelFinalize() {
      this.showConfirmFinalize = false;
    },
    resetForm() {
      this.surveyTitle = '';
      this.surveyId = null;
      this.newQuestion = '';
      this.questions = [];
      this.isSubmitting = false;
      this.isAdding = false;
      this.isFinalizing = false;
      this.showConfirmFinalize = false;
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

.submit-button,
.add-button,
.finalize-button {
  padding: 0.6rem 1rem;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.submit-button:hover,
.add-button:hover,
.finalize-button:hover {
  background-color: #2980b9;
}

.submit-button:disabled,
.add-button:disabled,
.finalize-button:disabled {
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
  background-color: #ecf0f1;
  padding: 0.5rem;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  color: #2c3e50;
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

.finalize-button {
  width: 100%;
  margin-top: 1rem;
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
