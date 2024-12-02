<template>
  <div class="listing-survey">
    <h2>Discover Our Surveys</h2>
    <div v-if="isLoading" class="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else class="survey-list">
      <div class="survey-item" v-for="survey in surveys" :key="survey.id">
        <router-link :to="{ name: 'SurveyDetails', params: { id: survey.id } }" class="survey-link">
          <div class="image-wrapper">
            <img :src="defaultImage" alt="Survey Image">
          </div>
          <div class="survey-content">
            <h3>{{ survey.title }}</h3>
            <p>{{ survey.description }}</p>
          </div>
        </router-link>
        <button class="edit-button" @click="editSurvey(survey)">✏️</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'ListingSurvey',
  data() {
    return {
      defaultImage: require('@/assets/default-survey-image.jpg'),
      isLoading: true,
      error: null,
    };
  },
  computed: {
    ...mapGetters(['allSurveys']),
    surveys() {
      return this.allSurveys;
    },
  },
  created() {
    this.fetchSurveys()
      .then(() => {
        this.isLoading = false;
      })
      .catch((error) => {
        console.error('Error fetching surveys:', error);
        this.error = 'Unable to load surveys.';
        this.isLoading = false;
      });
  },
  methods: {
    ...mapActions(['fetchSurveys', 'setEditingSurvey']),
    editSurvey(survey) {
      this.setEditingSurvey(survey);
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&display=swap');

.listing-survey {
  padding: 1.5rem;
  font-family: 'Poppins', sans-serif;
  background-color: #f5f5f5;
}

.listing-survey h2 {
  text-align: center;
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.loading,
.error {
  text-align: center;
  font-size: 1rem;
  color: #777;
}

.survey-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.survey-item {
  position: relative;
  width: calc(25% - 1rem);
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.survey-item a {
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.image-wrapper {
  width: 100%;
  height: 120px;
  overflow: hidden;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.survey-content {
  padding: 0.8rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.survey-content h3 {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: #34495e;
}

.survey-content p {
  font-size: 0.9rem;
  color: #7f8c8d;
  flex-grow: 1;
}

.edit-button {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.edit-button:hover {
  transform: scale(1.05);
}

@media (max-width: 1200px) {
  .survey-item {
    width: calc(33.333% - 1rem);
  }
}

@media (max-width: 768px) {
  .survey-item {
    width: calc(50% - 1rem);
  }
}

@media (max-width: 480px) {
  .survey-item {
    width: 100%;
  }
}
</style>
