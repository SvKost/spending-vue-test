<script setup>
import { useTransactionsStore } from '../stores/useTransactionsStore'
import { onMounted } from 'vue'

const store = useTransactionsStore()

const handleSearch = async () => {
  store.setActiveRegion(store.selectedRegion)
  await store.fetchTopTransactions()
}

const truncateText = text => {
  return text.length > 20 ? `${text.slice(0, 20)}...` : text
}

onMounted(async () => {
  await store.fetchRegions()
  await store.fetchLastLoads()
})
</script>

<template>
  <header class="bg-white rounded-lg shadow-sm p-6 mb-6 sm:p-4">
    <h1
      class="text-center font-bold mb-2 sm:mb-4 text-lg sm:text-xl md:text-2xl lg:text-3xl px-2 sm:px-4 md:px-6 lg:px-8 leading-snug sm:leading-normal mx-auto max-w-4xl"
    >
      <slot>{{ title }}</slot>
    </h1>

    <div
      class="space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between"
    >
      <div class="flex flex-wrap items-center gap-3">
        <label for="region-select" class="text-sm font-medium text-gray-700">
          Оберіть регіон
        </label>
        <div class="relative">
          <select
            id="region-select"
            v-if="!store.loading"
            v-model="store.selectedRegion"
            class="block w-full max-w-xs pl-3 pr-8 py-1 text-sm border focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 border-gray-200 rounded-md md:text-base md:py-2"
          >
            <option
              v-for="region in store.regions"
              :key="region.regionCode"
              :value="region.regionCode"
              class="truncate text-sm"
            >
              {{ truncateText(region.regionName) }}
            </option>
          </select>
          <div
            v-else
            class="h-10 w-full max-w-xs bg-gray-100 rounded-md animate-pulse"
          ></div>
        </div>

        <button
          @click="handleSearch"
          :disabled="store.loading"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          aria-label="Запустити пошук"
        >
          <svg
            v-if="store.loading"
            class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>{{ store.loading ? 'Завантаження...' : 'Пошук' }}</span>
        </button>
      </div>
    </div>

    <div class="mt-4">
      <div
        v-if="store.loading"
        class="bg-blue-50 text-blue-700 p-4 rounded-md flex items-center justify-center"
      >
        <svg class="animate-spin mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24">
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        Завантаження даних...
      </div>

      <div
        v-else-if="store.error"
        class="bg-red-50 text-red-700 p-4 rounded-md flex items-center"
      >
        <svg class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clip-rule="evenodd"
          />
        </svg>
        {{ store.error }}
      </div>

      <div
        v-else
        class="flex flex-col justify-start items-start sm:flex-row sm:items-center sm:justify-between text-sm text-gray-600 mt-4"
      >
        <div class="mb-2 sm:mb-0">
          Всього транзакцій по регіону:
          <span class="font-medium">{{ store.filteredTransactionsCount }}</span>
        </div>
        <div class="flex items-center gap-3">
          <label
            for="sort-select"
            class="text-sm font-medium text-gray-700"
          ></label>
          <select
            id="sort-select"
            v-model="store.sortOrder"
            class="block w-full pl-3 pr-10 py-2 text-base border focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 border-gray-200 sm:text-sm rounded-md"
          >
            <option value="desc">За спаданням</option>
            <option value="asc">За зростанням</option>
          </select>
        </div>
      </div>
    </div>
  </header>
</template>
