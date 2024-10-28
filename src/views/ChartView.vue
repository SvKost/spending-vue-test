<script setup>
import { useTransactionsStore } from '../stores/useTransactionsStore'
import { onMounted, ref } from 'vue'
import BarChart from '../components/BarChart.vue'
import PageHeader from '../components/PageHeader.vue'

const store = useTransactionsStore()
const isLoading = ref(true)

onMounted(async () => {
  try {
    await Promise.all([store.fetchRegions(), store.fetchLastLoads()])
  } catch (error) {
    console.error('Failed to fetch data:', error)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <PageHeader>Графічне представлення</PageHeader>

  <div class="bg-white rounded-lg shadow overflow-hidden">
    <div class="overflow-x-auto">
      <div v-if="isLoading" class="flex justify-center items-center p-12">
        <div
          class="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"
        ></div>
      </div>

      <div v-else-if="store.error" class="bg-red-50 p-4 flex items-center">
        <svg
          class="h-5 w-5 text-red-400 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clip-rule="evenodd"
          />
        </svg>
        {{ store.error }}
      </div>

      <div
        v-else-if="store.topTransactions.length === 0"
        class="text-center py-12 px-6 text-gray-500"
      >
        <svg
          class="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">
          Тут будуть виведені дані для відображення
        </h3>
      </div>

      <div
        v-else
        class="w-full min-h-[400px] sm:min-h-[450px] md:min-h-[500px] lg:min-h-[600px] p-4"
      >
        <BarChart />
      </div>
    </div>
  </div>
</template>
