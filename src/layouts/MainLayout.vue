<template>
  <q-layout view="hHh LpR lFr">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar class="flex justify-between items-center q-py-sm">
        <section class="flex items-center">
          <q-btn flat @click="sidebar = !sidebar" round dense icon="menu" class="md-hide" />
          <img class="app-logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png">
        </section>

        <section class="flex items-center">
          <span class="text-h6 text-weight-bold q-px-md">Felipe Barreto</span>
          <q-avatar class="q-pa-none" icon="person" font-size="100%" color="white" text-color="black" />
        </section>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="sidebar" show-if-above side="left" bordered class="bg-indigo-10 text-white q-pa-md">
      <q-list>
        <template v-for="(item, index) in menu" :key="index">
          <q-item clickable :to="item.route" exact active-class="bg-blue-10 text-white">
            <q-item-section avatar>
              <q-icon :name="item.icon" />
            </q-item-section>
            <q-item-section>
              {{ item.label }}
            </q-item-section>
          </q-item>
        </template>
      </q-list>
    </q-drawer>

    <q-page-container>
      <q-page padding>
        <router-view />
      </q-page>
    </q-page-container>

  </q-layout>
</template>

<script setup lang="ts">
// Core
import { ref } from 'vue';

defineOptions({
  name: 'MainLayout'
});

const menu = [
  {
    icon: 'dashboard',
    label: 'Home',
    route: '/'
  },
  {
    icon: 'group',
    label: 'Favoritos',
    route: '/favoritos'
  },
  {
    icon: 'takeout_dining',
    label: 'Categorias',
    route: '/categorias'
  },
  {
    icon: 'person',
    label: 'Sobre',
    route: '/sobre'
  }
]

const sidebar = ref(false);
</script>

<style scoped lang="scss">
.app-logo {
  max-width: 120px;
}
</style>