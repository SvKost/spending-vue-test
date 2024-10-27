<script setup lang="ts">
import { useTransactionsStore } from '../stores/useTransactionsStore'

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
        <h1 class="text-xl font-semibold text-gray-900">ТОП-10 транзакцій</h1>
        <div class="flex items-center space-x-4">
          <button
            class="flex justify-center items-center w-12 h-9 rounded-md border border-gray-200"
          >
            UK
          </button>
          <div class="relative">
            <select
              id="currency-unit"
              @change="handleUnitChange"
              class="block h-9 pl-3 text-base border focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 border-gray-200 sm:text-sm rounded-md cursor-pointer"
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
