<script setup>
import { useTransactionsStore } from '../stores/useTransactionsStore'
import { onMounted } from 'vue'
import BarChart from '../components/BarChart.vue'
import PageHeader from '../components/PageHeader.vue'

const store = useTransactionsStore()

onMounted(async () => {
  await store.fetchRegions()
  await store.fetchLastLoads()
})
</script>

<template>
  <PageHeader> Графічне представлення ТОП-10 транзакцій </PageHeader>

  <BarChart />
</template>
