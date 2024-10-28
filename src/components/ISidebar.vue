<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const isOpen = ref(false)

const toggleSidebar = () => {
  isOpen.value = !isOpen.value
}

const closeSidebar = () => {
  isOpen.value = false
}

defineExpose({
  toggleSidebar,
})

const links = [
  { to: '/', text: 'Головна' },
  { to: '/tables', text: 'Табличне представлення' },
  { to: '/graphics', text: 'Графічне представлення' },
]
</script>

<template>
  <div
    v-if="isOpen"
    @click="closeSidebar"
    class="fixed inset-0 bg-black bg-opacity-50 transition-opacity lg:hidden z-40"
  ></div>

  <aside
    :class="[
      'lg:relative lg:block',
      'bg-white border-r border-gray-200',
      'transition-transform duration-300 ease-in-out',
      'fixed inset-y-0 left-0 z-50 w-64',
      isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
    ]"
  >
    <div class="flex justify-end p-4 lg:hidden">
      <button
        @click="closeSidebar"
        class="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-600 hover:bg-gray-100 rounded-md"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <nav class="flex flex-col py-4">
      <RouterLink
        v-for="(link, index) in links"
        :key="index"
        :to="link.to"
        :class="[
          'px-6 py-2 text-sm font-medium transition-colors duration-200',
          $route.path === link.to
            ? 'text-blue-600 bg-blue-50'
            : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50',
        ]"
        @click="closeSidebar"
      >
        {{ link.text }}
      </RouterLink>
    </nav>
  </aside>
</template>
