<script setup>
import PageHeader from '../components/PageHeader.vue'
import { useTransactionsStore } from '../stores/useTransactionsStore'
import { onMounted } from 'vue'

const store = useTransactionsStore()

onMounted(async () => {
  await store.fetchRegions()
  await store.fetchLastLoads()
})
const isSmallScreen = () => {
  return window.innerWidth < 640
}

const formatAmount = amount => {
  const formattedNumber = amount
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    .replace('.', ',')

  return isSmallScreen()
    ? formattedNumber
    : `${formattedNumber} ${store.currencyUnitSuffix}`
}
</script>

<template>
  <PageHeader>Табличне представлення</PageHeader>
  <div class="bg-white rounded-lg shadow overflow-hidden">
    <div class="overflow-x-auto">
      <table
        class="min-w-full table-auto divide-y divide-gray-200 text-xs sm:text-sm"
      >
        <thead class="bg-gray-50">
          <tr>
            <th
              scope="col"
              class="px-1 sm:px-2 py-1 sm:py-2 text-left font-medium text-gray-500 uppercase tracking-wider text-xs sm:text-sm"
            >
              №
            </th>
            <th
              scope="col"
              class="px-1 sm:px-2 py-1 sm:py-2 text-left font-medium text-gray-500 uppercase tracking-wider text-xs sm:text-sm"
            >
              ЄДРПОУ платника
            </th>
            <th
              scope="col"
              class="px-1 sm:px-2 py-1 sm:py-2 text-left font-medium text-gray-500 uppercase tracking-wider text-xs sm:text-sm"
            >
              Назва платника
            </th>
            <th
              scope="col"
              class="px-1 sm:px-2 py-1 sm:py-2 text-right font-medium text-gray-500 uppercase tracking-wider text-xs sm:text-sm"
            >
              Сума
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr
            v-for="(transaction, index) in store.topTransactions"
            :key="transaction.id"
            class="hover:bg-gray-50"
          >
            <td
              class="px-1 sm:px-2 py-1 sm:py-2 text-gray-500 text-xs sm:text-sm"
            >
              {{ index + 1 }}
            </td>
            <td
              class="px-1 sm:px-2 py-1 sm:py-2 text-gray-900 text-xs sm:text-sm whitespace-nowrap"
            >
              {{ transaction.payer_edrpou }}
            </td>
            <td
              class="px-1 sm:px-2 py-1 sm:py-2 text-gray-900 text-xs sm:text-sm"
            >
              {{ transaction.payer_name }}
            </td>
            <td
              class="px-1 sm:px-2 py-1 sm:py-2 text-right text-gray-900 text-xs sm:text-sm whitespace-nowrap"
            >
              {{ formatAmount(transaction.formattedAmount) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      v-if="store.topTransactions.length === 0"
      class="text-center py-8 sm:py-12 px-4 sm:px-6 text-gray-500"
    >
      <svg
        class="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-gray-400"
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
      <h3 class="mt-2 text-xs sm:text-sm font-medium text-gray-900">
        Тут будуть відображені дані
      </h3>
    </div>
  </div>
</template>
