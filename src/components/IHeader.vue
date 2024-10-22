<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="w-full bg-gray-200">
    <nav class="flex justify-center">
      <RouterLink to="/">Головна</RouterLink>
      <RouterLink to="/graphics">Графічне представлення</RouterLink>
      <RouterLink to="/tables">Табличне представлення</RouterLink>
    </nav>
  </div>
</template>
