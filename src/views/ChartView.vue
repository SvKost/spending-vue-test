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
  <div class="space-y-6">
    <PageHeader>Графічне представлення</PageHeader>

    <div
      v-if="isLoading"
      class="flex justify-center items-center bg-white rounded-lg shadow-sm p-12"
    >
      <div
        class="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"
      ></div>
    </div>

    <div
      v-else-if="store.error"
      class="bg-red-50 p-4 rounded-lg flex items-center"
    >
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

    <div>
      <BarChart />
    </div>
  </div>
</template>
