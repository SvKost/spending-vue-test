<script setup>
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'
import { useTransactionsStore } from '../stores/useTransactionsStore'
import { computed, ref } from 'vue'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const store = useTransactionsStore()
const selectedBar = ref(null)

const chartData = computed(() => {
  const transactions = store.topTransactions.slice(0, 10)

  return {
    labels: transactions.map(
      t =>
        `${t.payer_name.slice(0, 30)}${t.payer_name.length > 30 ? '...' : ''} (${t.payer_edrpou || 'Не знайдено'})`,
    ),
    datasets: [
      {
        label: 'Сума транзакції',
        data: transactions.map(t =>
          parseFloat(t.formattedAmount.replace(/\s/g, '')),
        ),
        backgroundColor: transactions.map((_, index) =>
          selectedBar.value === index
            ? 'rgba(59, 130, 246, 0.8)'
            : 'rgba(59, 130, 246, 0.5)',
        ),
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 2,
        borderRadius: 6,
        hoverBackgroundColor: 'rgba(59, 130, 246, 0.7)',
      },
    ],
  }
})

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  onResize: chart => {
    chart.resize()
  },
  plugins: {
    legend: {
      display: true,
      position: 'top',
      labels: {
        font: {
          size: 14,
          family: "'Inter', sans-serif",
        },
        padding: 20,
      },
    },
    tooltip: {
      enabled: true,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleFont: {
        size: 14,
        family: "'Inter', sans-serif",
      },
      bodyFont: {
        size: 13,
        family: "'Inter', sans-serif",
      },
      padding: 12,
      callbacks: {
        label: context => {
          const value = context.raw
          return `Сума: ${new Intl.NumberFormat('uk-UA').format(value)} ${store.currencyUnitSuffix}`
        },
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(0, 0, 0, 0.1)',
      },
      title: {
        display: true,
        text: 'млн грн',
        font: {
          size: 12,
          family: "'Inter', sans-serif",
        },
        padding: 10,
      },
      ticks: {
        callback: value => {
          const valueInMillions =
            (value *
              (store.currencyUnit === 'тис'
                ? 1000
                : store.currencyUnit === 'млн'
                  ? 1000000
                  : 1)) /
            1_000_000
          return valueInMillions.toFixed(1)
        },
        stepSize: 0.5,
        min: -1,
        max: 1.5,
      },
    },
    x: {
      grid: {
        display: false,
      },
      ticks: {
        maxRotation: 45,
        minRotation: 45,
      },
    },
  },
  onClick: (_, elements) => {
    if (elements.length > 0) {
      selectedBar.value = elements[0].index
    } else {
      selectedBar.value = null
    }
  },
  animation: {
    duration: 750,
    easing: 'easeInOutQuart',
  },
}))
</script>

<template>
  <div
    class="bg-white rounded-lg shadow-sm p-4 sm:p-6 md:p-8 h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]"
  >
    <Bar
      id="my-chart-id"
      :data="chartData"
      :options="chartOptions"
      class="h-full"
    />
  </div>
</template>
