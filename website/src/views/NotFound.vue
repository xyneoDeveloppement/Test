<template>
  <div class="notfound-container">
    <div class="content">
      <h1>404</h1>
      <p>Oops! The page you are looking for does not exist.</p>
      <router-link to="/" class="home-button">Return to Home</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

.notfound-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f5f6fa;
  font-family: 'Poppins', sans-serif;
}

.content {
  text-align: center;
}

.content h1 {
  font-size: 10rem;
  margin: 0;
  color: #2f3640;
  animation: float 3s ease-in-out infinite;
}

.content p {
  font-size: 1.5rem;
  color: #353b48;
  margin-bottom: 2rem;
}

.home-button {
  padding: 1rem 2rem;
  background-color: #40739e;
  color: #fff;
  text-decoration: none;
  border-radius: 50px;
  transition: background-color 0.3s ease;
}

.home-button:hover {
  background-color: #487eb0;
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0px);
  }
}

@media (max-width: 768px) {
  .content h1 {
    font-size: 6rem;
  }

  .content p {
    font-size: 1.2rem;
  }
}
</style>
