<script setup>
import { useTransactionsStore } from '../stores/useTransactionsTableStore'
import { onMounted } from 'vue'

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
      Табличне представлення ТОП-10 транзакцій
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
        Немає даних для відображення
      </div>

      <div v-else class="overflow-x-auto">
        <table
          class="table-auto w-full border-collapse border rounded border-gray-300"
        >
          <thead class="rounded">
            <tr class="rounded">
              <th class="border px-4 py-2">№</th>
              <th class="border px-4 py-2">ЄДРПОУ платника</th>
              <th class="border px-4 py-2">Назва платника</th>
              <th class="border px-4 py-2">Сума</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(transaction, index) in store.topTransactions"
              :key="transaction.id"
              class="hover:bg-gray-50"
            >
              <td class="border px-4 py-2">{{ index + 1 }}</td>
              <td class="border px-4 py-2">{{ transaction.payer_edrpou }}</td>
              <td class="border px-4 py-2">{{ transaction.payer_name }}</td>
              <td class="border px-4 py-2">
                {{ new Intl.NumberFormat('uk-UA').format(transaction.amount) }}
                ₴
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </div>
</template>
