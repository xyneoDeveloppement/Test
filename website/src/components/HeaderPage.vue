<template>
  <header class="header">
    <div class="container">
      <div class="logo">
        <router-link to="/">{{ title }}</router-link>
      </div>
      <nav class="navigation" :class="{ 'is-active': menuActive }">
        <router-link to="/" @click="closeMenu">Surveys</router-link>

        <button class="create-button" @click="openCreateDrawer">Create a Survey</button>
      </nav>
      <div class="menu-toggle" @click="toggleMenu">
        <span :class="{ 'active': menuActive }"></span>
        <span :class="{ 'active': menuActive }"></span>
        <span :class="{ 'active': menuActive }"></span>
      </div>
    </div>
  </header>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'HeaderPage',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      menuActive: false,
    };
  },
  methods: {
    ...mapActions(['openCreateDrawer']),
    toggleMenu() {
      this.menuActive = !this.menuActive;
    },
    closeMenu() {
      this.menuActive = false;
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.header {
  position: fixed;
  top: 0;
  width: 100%;
  height: 70px;
  background-color: #fff;
  border-bottom: 1px solid #eaeaea;
  z-index: 1000;
  display: flex;
  align-items: center;
  padding: 0 1rem;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Logo */
.logo a {
  font-size: 1.8rem;
  font-weight: bold;
  color: #333;
  text-decoration: none;
}

/* Navigation */
.navigation {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.navigation a {
  text-decoration: none;
  color: #333;
  font-size: 1rem;
  position: relative;
  padding: 0.5rem 0;
}

.navigation a::after {
  content: '';
  position: absolute;
  width: 0%;
  height: 2px;
  background: #3498db;
  left: 0;
  bottom: 0;
  transition: width 0.3s;
}

.navigation a:hover::after {
  width: 100%;
}

.create-button {
  padding: 0.5rem 1rem;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.create-button:hover {
  background-color: #2980b9;
}

.menu-toggle {
  display: none;
  flex-direction: column;
  cursor: pointer;
}

.menu-toggle span {
  width: 25px;
  height: 3px;
  background-color: #333;
  margin-bottom: 5px;
  border-radius: 3px;
  transition: all 0.3s;
}

.menu-toggle span.active:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}

.menu-toggle span.active:nth-child(2) {
  opacity: 0;
}

.menu-toggle span.active:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

@media (max-width: 768px) {
  .navigation {
    position: fixed;
    top: 70px;
    right: 0;
    background-color: #fff;
    flex-direction: column;
    width: 200px;
    height: calc(100% - 70px);
    padding-top: 1rem;
    transform: translateX(100%);
    transition: transform 0.3s ease-in-out;
  }

  .navigation.is-active {
    transform: translateX(0);
  }

  .navigation a {
    font-size: 1.2rem;
    padding: 1rem;
    width: 100%;
  }

  .navigation a::after {
    display: none;
  }

  .create-button {
    margin-top: 1rem;
    width: 80%;
  }

  .menu-toggle {
    display: flex;
  }

  .container {
    justify-content: space-between;
  }
}
</style>
