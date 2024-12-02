<template>
  <div id="app">
    <HeaderPage title="SilentOpinions" @open-create-drawer="openCreateDrawer" />
    <DrawerCreateSurvey v-if="isCreateDrawerOpen" @close-drawer="closeCreateDrawer" />
    <DrawerEditSurvey v-if="editingSurvey" :survey="editingSurvey" @close-drawer="closeEditDrawer" />
    <main class="main-content">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import HeaderPage from './components/HeaderPage.vue';
import DrawerCreateSurvey from './components/DrawerCreateSurvey.vue';
import DrawerEditSurvey from './components/DrawerEditSurvey.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'App',
  components: {
    HeaderPage,
    DrawerCreateSurvey,
    DrawerEditSurvey,
  },
  computed: {
    ...mapGetters(['editingSurvey', 'isCreateDrawerOpen']),
  },
  methods: {
    ...mapActions(['openCreateDrawer', 'closeCreateDrawer', 'clearEditingSurvey']),
    closeEditDrawer() {
      this.clearEditingSurvey();
    },
  },
};
</script>

<style>


* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body,
#app {
  height: 100%;
}

:root {
  --primary-color: #4285f4;
  --secondary-color: #34a853;
  --error-color: #ea4335;
  --background-color: #f1f3f4;
  --text-color: #202124;
  --border-color: #dadce0;
  --input-background: #fff;
  --button-color: #4285f4;
  --button-hover-color: #357ae8;
  --success-color: #34a853;
  --font-family: 'Poppins', sans-serif;
}

body {
  font-family: var(--primary-font);
  color: var(--primary-color);
  background-color: var(--background-color);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.main-content {
  margin-top: var(--header-height);
  min-height: calc(100% - var(--header-height));
  padding: 1rem;
}

/* Liens */
a {
  color: inherit;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

/* Autres styles globaux */
</style>
