<template>
  <q-layout view="hHh LpR lFr">

    <q-header class="bg-primary text-white">
      <q-toolbar class="flex justify-between items-center q-py-sm">
        <section class="flex items-center q-gutter-md">
          <q-btn flat @click="sidebar = !sidebar" round dense icon="menu" />
          <h1 class="layout-title">SGBR</h1>
        </section>

        <section class="flex items-center xs-hide">
          <span class="text-h6 text-weight-bold q-px-md">Felipe Barreto</span>
          <q-avatar class="q-pa-none" icon="person" font-size="100%" color="white" text-color="black" />
        </section>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="sidebar" show-if-above side="left" bordered class="bg-primary text-white q-pa-md">
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
.layout-title {
  font: 700 30px "Poppins", sans-serif;
}
</style>