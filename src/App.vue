<script setup lang="ts">
import PageHeader from './components/PageHeader.vue'
import PageFooter from './components/PageFooter.vue'
</script>

<template>
  <PageHeader></PageHeader>
  <img src="./assets/img/npc-logo.png" width="120" height="120" />
  <div class="main-container ph3 ph5-l bg-white lh-copy f4">
    <router-view></router-view>
  </div>
  <PageFooter></PageFooter>
</template>
