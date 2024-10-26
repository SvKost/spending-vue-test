<script setup lang="ts">
import { useTransactionsStore } from '../stores/useTransactionsStore'

const store = useTransactionsStore()

const handleUnitChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  store.currencyUnit = target.value
}
</script>

<template>
  <header class="bg-white border-b border-gray-200 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <h1 class="text-xl font-semibold text-gray-900">ТОП-10 транзакцій</h1>
        <div class="flex items-center space-x-4">
          <img src="#" alt="UK" class="w-6 h-6 rounded-full shadow-sm" />
          <div class="relative">
            <select
              id="currency-unit"
              @change="handleUnitChange"
              class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
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
