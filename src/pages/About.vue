<template>
  <main class="about-page">
    <h1 class="title">Sobre</h1>
    <p class="subtitle">Olá, me chamo Felipe Barreto, desenvolvedor frontend com aproximadamente cinco anos de experiência. Minha especialidade é Vue.js, mas me adapto facilmente a outras stacks frontend. Atualmente, estou buscando expandir meus conhecimentos para outras áreas do desenvolvimento, sempre focado em aprender e evoluir na minha carreira.</p>
    <h2 class="project_title">O projeto</h2>
    <p class="project_info">
      O desafio consiste na criação de uma aplicação que realize consultas no endpoint do giphy e mostre os mais variados giphys para os usuários, permitindo que eles possam favoritar seus preferidos, remover os favoritados anteriormente, buscar pelos temos de seu interesse e até filtrar por categorias.
    </p>
    <section clas>

    </section>
  </main>
</template>

<script setup lang="ts">
defineOptions({
  name: 'About'
});
</script>

<style lang="scss" scoped>
.about-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  .title {
    font: 500 42px "Poppins", sans-serif;
  }

  .subtitle {
    font: 400 18px "Poppins", sans-serif;
  }

  .project_title {
    display: flex;
    align-self: flex-start;
    font: 500 25px "Poppins", sans-serif;
  }
  .project_info {
    display: flex;
    align-self: flex-start;
    font: 400 18px "Poppins", sans-serif;
  }
}
</style>