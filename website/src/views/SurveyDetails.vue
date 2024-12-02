<template>
  <div class="survey-details">
    <div v-if="isLoading" class="loading">Loading survey...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="survey" class="content">
      <h2>{{ survey.title }}</h2>

      <form @submit.prevent="submitResponses" v-if="!hasResponded">
        <div v-for="question in survey.questions" :key="question.id" class="question-item">
          <label :for="`question-${question.id}`">{{ question.text }}</label>
          <input type="text" :id="`question-${question.id}`" v-model="responses[question.id]" required />
        </div>
        <button type="submit" class="submit-button" :disabled="isSubmitting">
          {{ isSubmitting ? 'Submitting...' : 'Submit' }}
        </button>
      </form>

      <div v-else class="thank-you-message">
        <h3>Thank you for responding to this survey!</h3>
      </div>

      <div class="responses-section">
        <h3>Other Users' Responses</h3>
        <div v-for="question in survey.questions" :key="question.id" class="response-item">
          <h4>{{ question.text }}</h4>
          <ul>
            <li v-for="answer in question.answers" :key="answer.id">{{ answer.response }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'SurveyDetails',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      responses: {},
      isSubmitting: false,
      hasResponded: false,
      isLoading: true,
      error: null,
    };
  },
  computed: {
    ...mapGetters(['currentSurvey']),
    survey() {
      return this.currentSurvey;
    },
  },
  created() {
    this.fetchSurvey();
    this.checkLocalStorage();
  },
  methods: {
    ...mapActions(['fetchSurveyById', 'addAnswerToQuestion']),

    async fetchSurvey() {
      try {
        await this.fetchSurveyById(this.id);
        this.initializeResponses();
        this.isLoading = false;
      } catch (error) {
        console.error('Error fetching the survey:', error);
        this.error = 'Unable to load the survey.';
        this.isLoading = false;
      }
    },

    checkLocalStorage() {
      const respondedSurveys = JSON.parse(localStorage.getItem('respondedSurveys')) || {};
      if (respondedSurveys[this.id]) {
        this.hasResponded = true;
        this.responses = respondedSurveys[this.id];
      }
    },

    initializeResponses() {
      if (!this.hasResponded && this.survey && this.survey.questions) {
        this.survey.questions.forEach(question => {
          this.responses[question.id] = '';
        });
      }
    },

    async submitResponses() {
      this.isSubmitting = true;
      try {
        console.log('Starting submission...');

        const promises = [];
        for (const question of this.survey.questions) {
          const responseText = this.responses[question.id];
          if (responseText.trim() !== '') {
            console.log(`Submitting response for question ID: ${question.id}`);
            promises.push(
              this.addAnswerToQuestion({
                surveyId: this.survey.id,
                questionId: question.id,
                responseText,
              })
            );
          } else {
            console.log(`No response provided for question ID: ${question.id}`);
          }
        }

        console.log('Awaiting all API calls...');
        await Promise.all(promises);
        console.log('All API calls completed.');

        try {
          console.log('Storing responses in localStorage...');
          const respondedSurveys = JSON.parse(localStorage.getItem('respondedSurveys')) || {};
          respondedSurveys[this.id] = { ...this.responses };
          localStorage.setItem('respondedSurveys', JSON.stringify(respondedSurveys));
          console.log('Responses stored in localStorage.');
        } catch (storageError) {
          console.error('Error storing responses in localStorage:', storageError);
          throw new Error('Error storing responses locally.');
        }

        this.hasResponded = true;
        this.isSubmitting = false;

        console.log('Submission successful. Showing success alert.');
        alert('Your responses have been successfully submitted!');
      } catch (error) {
        console.error('Error submitting responses:', error);
        alert('An error occurred while submitting your responses. Please try again.');
        this.isSubmitting = false;
      }
    },

    resetResponses() {
      const respondedSurveys = JSON.parse(localStorage.getItem('respondedSurveys')) || {};
      delete respondedSurveys[this.id];
      localStorage.setItem('respondedSurveys', JSON.stringify(respondedSurveys));

      this.hasResponded = false;
      this.responses = {};
      this.initializeResponses();
    },

    formatDate(date) {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    },
  },
  watch: {
    survey(newSurvey) {
      if (newSurvey && !this.hasResponded) {
        this.survey.questions.forEach(question => {
          if (!(question.id in this.responses)) {
            this.responses[question.id] = '';
          }
        });
      }
    },
  },
};
</script>

<style scoped>
.survey-details {
  margin: 0 5% 0 5%;
  padding: 2rem;
  font-family: 'Poppins', sans-serif;
  background-color: #f9f9f9;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.loading,
.error {
  text-align: center;
  font-size: 1.2rem;
  color: #777;
}

.survey-details h2 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #2c3e50;
}

.question-item {
  margin-bottom: 1rem;
}

.question-item label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #34495e;
}

.question-item input {
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid #bdc3c7;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.question-item input:focus {
  border-color: #3498db;
  outline: none;
}

.submit-button {
  display: block;
  margin: 2rem auto 0;
  padding: 0.7rem 2rem;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #2980b9;
}

.thank-you-message {
  text-align: center;
  margin-top: 2rem;
  padding: 2rem;
  background-color: #2ecc71;
  color: #fff;
  border-radius: 8px;
}

.reset-button {
  margin-top: 1rem;
  padding: 0.5rem 1.5rem;
  background-color: #e67e22;
  color: #fff;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.reset-button:hover {
  background-color: #d35400;
}

.responses-section {
  margin-top: 3rem;
}

.responses-section h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.response-item {
  margin-bottom: 2rem;
}

.response-item h4 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #34495e;
}

.response-item ul {
  list-style-type: disc;
  padding-left: 1.5rem;
}

.response-item ul li {
  margin-bottom: 0.5rem;
  color: #7f8c8d;
}

.success-message,
.error-message {
  margin-top: 1rem;
  padding: 0.8rem;
  border-radius: 4px;
  text-align: center;
}

.success-message {
  background-color: #2ecc71;
  color: #fff;
}

.error-message {
  background-color: #e74c3c;
  color: #fff;
}
</style>
