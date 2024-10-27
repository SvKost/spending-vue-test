<script setup>
import PageHeader from '../components/PageHeader.vue'
import { useTransactionsStore } from '../stores/useTransactionsStore'
import { onMounted } from 'vue'

const store = useTransactionsStore()

onMounted(async () => {
  await store.fetchRegions()
  await store.fetchLastLoads()
})

const formatAmount = amount => {
  const formattedNumber = amount
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    .replace('.', ',')
  return `${formattedNumber} ${store.currencyUnitSuffix}`
}
</script>

<template>
  <PageHeader> Табличне представлення</PageHeader>

  <div class="bg-white rounded-lg shadow overflow-hidden">
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16"
            >
              №
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              ЄДРПОУ платника
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Назва платника
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Сума
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr
            v-for="(transaction, index) in store.topTransactions"
            :key="transaction.id"
            class="hover:bg-gray-50 transition-colors duration-150"
          >
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ index + 1 }}
            </td>
            <td
              class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
            >
              {{ transaction.payer_edrpou }}
            </td>
            <td class="px-6 py-4 text-sm text-gray-900">
              {{ transaction.payer_name }}
            </td>
            <td
              class="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900"
            >
              {{ formatAmount(transaction.formattedAmount) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      v-if="store.topTransactions.length === 0"
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
        Немає даних для відображення
      </h3>
      <p class="mt-1 text-sm text-gray-500">
        Наразі список транзакцій порожній
      </p>
    </div>
  </div>
</template>
