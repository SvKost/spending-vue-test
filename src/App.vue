<script setup>
import IHeader from './components/IHeader.vue'
import ISidebar from './components/ISidebar.vue'
import IFooter from './components/IFooter.vue'
import IBreadcrumbs from './components/IBreadcrumbs.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen bg-gray-50">
    <IHeader @toggle-sidebar="$refs.sidebar.toggleSidebar()" />
    <div class="flex flex-1">
      <ISidebar ref="sidebar" />
      <main class="flex-1 p-4 relative">
        <IBreadcrumbs />
        <router-view />
      </main>
    </div>
    <IFooter />
  </div>
</template>
