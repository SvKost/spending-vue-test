<script setup>
import IHeader from './components/IHeader.vue'
import ISidebar from './components/ISidebar.vue'
import IFooter from './components/IFooter.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen bg-gray-50">
    <IHeader />
    <div class="flex flex-1">
      <ISidebar />
      <main class="flex-1 p-6 relative">
        <router-view />
      </main>
    </div>
    <IFooter />
  </div>
</template>

//breadcrums TODO:
