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
import { computed, ref, onMounted, onUnmounted, watch } from 'vue'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const store = useTransactionsStore()
const selectedBar = ref(null)
const currentScreenSize = ref('lg')
const chartRef = ref(null)
const containerRef = ref(null)

const updateChart = () => {
  if (chartRef.value?.chart) {
    chartRef.value.chart.update('none')
  }
}

const truncateText = (text, edrpou, screenSize) => {
  const limits = {
    sm: 15,
    md: 20,
    lg: 30,
  }
  const limit = limits[screenSize] || limits.lg
  const truncatedName =
    text.slice(0, limit) + (text.length > limit ? '...' : '')
  return `${truncatedName} (${edrpou || 'Не знайдено'})`
}

const updateScreenSize = () => {
  const width = window.innerWidth
  const newSize = width < 640 ? 'sm' : width < 768 ? 'md' : 'lg'
  if (newSize !== currentScreenSize.value) {
    currentScreenSize.value = newSize
    updateChart()
  }
}

const debounce = (fn, ms) => {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, args), ms)
  }
}

const debouncedUpdateScreenSize = debounce(updateScreenSize, 250)

const resizeObserver = new ResizeObserver(entries => {
  for (const entry of entries) {
    if (entry.target === containerRef.value) {
      updateChart()
    }
  }
})

onMounted(() => {
  updateScreenSize()
  window.addEventListener('resize', debouncedUpdateScreenSize)

  if (containerRef.value) {
    resizeObserver.observe(containerRef.value)
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', debouncedUpdateScreenSize)
  resizeObserver.disconnect()
})

watch(currentScreenSize, () => {
  updateChart()
})

const chartData = computed(() => {
  const transactions = store.topTransactions.slice(0, 10)

  return {
    labels: transactions.map(t =>
      truncateText(t.payer_name, t.payer_edrpou, currentScreenSize.value),
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
  resizeDelay: 0,
  plugins: {
    legend: {
      display: currentScreenSize.value !== 'sm',
      position: 'top',
      labels: {
        boxWidth: currentScreenSize.value === 'sm' ? 10 : 40,
        font: {
          size: currentScreenSize.value === 'sm' ? 12 : 14,
          family: "'Inter', sans-serif",
        },
        padding: currentScreenSize.value === 'sm' ? 10 : 20,
      },
    },
    tooltip: {
      enabled: true,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleFont: {
        size: currentScreenSize.value === 'sm' ? 12 : 14,
        family: "'Inter', sans-serif",
      },
      bodyFont: {
        size: currentScreenSize.value === 'sm' ? 11 : 13,
        family: "'Inter', sans-serif",
      },
      padding: currentScreenSize.value === 'sm' ? 8 : 12,
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
        display: currentScreenSize.value !== 'sm',
        text: 'млн грн',
        font: {
          size: currentScreenSize.value === 'sm' ? 10 : 12,
          family: "'Inter', sans-serif",
        },
        padding: currentScreenSize.value === 'sm' ? 5 : 10,
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
        font: {
          size: currentScreenSize.value === 'sm' ? 10 : 12,
        },
      },
    },
    x: {
      grid: {
        display: false,
      },
      ticks: {
        maxRotation: currentScreenSize.value === 'sm' ? 65 : 45,
        minRotation: currentScreenSize.value === 'sm' ? 65 : 45,
        font: {
          size: currentScreenSize.value === 'sm' ? 10 : 12,
        },
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
    duration: 500,
    easing: 'easeInOutQuart',
  },
}))
</script>

<template>
  <div ref="containerRef" class="w-full h-[400px] sm:h-[500px] md:h-[600px]">
    <Bar
      ref="chartRef"
      id="my-chart-id"
      :data="chartData"
      :options="chartOptions"
      class="w-full h-full"
    />
  </div>
</template>
