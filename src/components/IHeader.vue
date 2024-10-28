<script setup lang="ts">
import { useTransactionsStore } from '../stores/useTransactionsStore'

const emit = defineEmits(['toggleSidebar'])

const store = useTransactionsStore()

const handleUnitChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  store.currencyUnit = target.value
}
</script>

<template>
  <header
    class="w-full bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm"
  >
    <div class="w-full px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16 w-full mx-auto">
        <div class="flex items-center gap-4">
          <button
            @click="emit('toggleSidebar')"
            class="lg:hidden flex justify-center items-center w-8 h-8 text-gray-500 hover:bg-gray-100 rounded-md"
            aria-label="Відкрити/закрити меню"
          >
            <span class="sr-only">Відкрити/закрити меню</span>
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <h1 class="text-lg sm:text-xl font-semibold text-gray-900">
            ТОП-10 транзакцій
          </h1>
        </div>
        <div class="flex items-center space-x-2 sm:space-x-4">
          <button
            class="flex justify-center items-center w-10 h-8 rounded-md border border-gray-200 text-sm"
          >
            UK
          </button>
          <div class="relative">
            <select
              id="currency-unit"
              @change="handleUnitChange"
              class="block h-8 pl-2 text-sm border focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 border-gray-200 rounded-md cursor-pointer"
            >
              <option value="грн">грн</option>
              <option value="тис">тис грн</option>
              <option value="млн">млн грн</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
