<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="w-64 bg-gray-500">
    <nav class="flex flex-col justify-start px-1">
      <RouterLink to="/">Головна</RouterLink>
      <RouterLink to="/graphics">Графічне представлення</RouterLink>
      <RouterLink to="/tables">Табличне представлення</RouterLink>
    </nav>
  </div>
</template>
