<script setup>
import { useTransactionsStore } from '../stores/useTransactionsStore'
import { computed, onMounted } from 'vue'

const store = useTransactionsStore()

const searchTransactions = async () => {
  store.fetchTopTransactions()
}

const topTenTransactions = computed(() => {
  return store.rawTransactions
    .slice()
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 10)
})

onMounted(() => {
  store.fetchRegions()
  store.fetchLastLoads()
})
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">
      Табличне представлення ТОП-10 транзакцій
    </h1>

    <div>
      <select
        v-if="!store.loading"
        v-model="store.selectedRegion"
        class="border p-2 rounded"
      >
        <option disabled selected>Оберіть регіон</option>
        <option
          v-for="region in store.regions"
          :key="region.regionCode"
          :value="region.regionCode"
        >
          {{ region.regionName }}
        </option>
      </select>

      <button
        @click="searchTransactions"
        class="ml-2 border rounded p-2"
        :disabled="store.loading"
      >
        Пошук
      </button>
    </div>

    <div v-if="store.loading">Завантаження...</div>
    <div v-else-if="store.error" class="text-red-500">
      Виникла помилка: {{ store.error.message }}
    </div>

    <!-- <div v-else> -->
    <div class="mt-4 text-gray-600">
      Всього знайдено транзакцій: {{ store.rawTransactions.length }}
    </div>

    <table class="table-auto w-full border-collapse border border-gray-300">
      <thead>
        <tr>
          <th class="border px-4 py-2">№</th>
          <th class="border px-4 py-2">ЄДРПОУ платника</th>
          <th class="border px-4 py-2">Назва платника</th>
          <th class="border px-4 py-2">Сума</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(transaction, index) in topTenTransactions"
          :key="transaction.id"
        >
          <td class="border px-4 py-2">{{ index + 1 }}</td>
          <td class="border px-4 py-2">{{ transaction.payer_edrpou }}</td>
          <td class="border px-4 py-2">{{ transaction.payer_name }}</td>
          <td class="border px-4 py-2">
            {{ new Intl.NumberFormat('uk-UA').format(transaction.amount) }} ₴
          </td>
        </tr>
      </tbody>
    </table>
    <!-- </div> -->
  </div>
</template>
