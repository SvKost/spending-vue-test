<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <aside class="bg-white border-r border-gray-200">
    <nav class="flex flex-col py-4">
      <RouterLink
        v-for="(link, index) in [
          { to: '/', text: 'Головна' },
          { to: '/tables', text: 'Табличне представлення' },
          { to: '/graphics', text: 'Графічне представлення' },
        ]"
        :key="index"
        :to="link.to"
        :class="[
          'px-6 py-2 text-sm font-medium transition-colors duration-200',
          $route.path === link.to
            ? 'text-blue-600 bg-blue-50'
            : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50',
        ]"
      >
        {{ link.text }}
      </RouterLink>
    </nav>
  </aside>
</template>
