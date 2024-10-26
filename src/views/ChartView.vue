<script setup>
import { useTransactionsStore } from '../stores/useTransactionsTableStore'
import { onMounted } from 'vue'
import BarChart from '../components/BarChart.vue'

const store = useTransactionsStore()

const handleSearch = async () => {
  await store.fetchTopTransactions()
}

onMounted(async () => {
  await store.fetchRegions()
  await store.fetchLastLoads()
})
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">
      Графічне представлення ТОП-10 транзакцій
    </h1>

    <div class="flex items-center gap-2">
      <p>Оберіть регіон</p>
      <select
        v-if="!store.loading"
        v-model="store.selectedRegion"
        class="border p-2 rounded"
      >
        <option
          v-for="region in store.regions"
          :key="region.regionCode"
          :value="region.regionCode"
        >
          {{ region.regionName }}
        </option>
      </select>

      <button
        @click="handleSearch"
        class="border rounded p-2 hover:bg-gray-100"
        :disabled="store.loading"
      >
        <span v-if="store.loading">Завантаження...</span>
        <span v-else>Пошук</span>
      </button>
    </div>

    <div v-if="store.loading" class="text-center py-4">Завантаження...</div>

    <div
      v-else-if="store.error"
      class="bg-red-50 text-red-600 p-4 rounded mb-4"
    >
      {{ store.error }}
    </div>

    <template v-else>
      <div class="flex justify-between mb-2">
        <div class="mt-4 text-gray-600">
          Всього транзакцій по регіону:
          {{ store.filteredTransactionsCount }}
        </div>

        <div class="flex justify-center items-center gap-2">
          <p>Сортувати</p>
          <select v-model="store.sortOrder" class="border p-2 rounded">
            <option value="desc">За спаданням</option>
            <option value="asc">За зростанням</option>
          </select>
        </div>
      </div>

      <div
        v-if="store.rawTransactions.length === 0"
        class="text-center py-4 text-gray-500"
      >
        Оберіть регіон і натисніть Пошук для відображення даних
      </div>
    </template>
  </div>

  <BarChart />
</template>
