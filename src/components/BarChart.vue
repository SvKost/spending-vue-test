<script>
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
import { computed } from 'vue'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  setup() {
    const store = useTransactionsStore()

    const chartData = computed(() => {
      const transactions = store.topTransactions.slice(0, 10)

      return {
        labels: transactions.map(
          t => `${t.payer_name} (${t.payer_edrpou || 'Not found'})`,
        ),
        datasets: [
          {
            label: 'Сума транзакції',
            data: transactions.map(t => t.formattedAmount),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      }
    })

    const chartOptions = {
      responsive: true,
      plugins: {
        legend: { display: true },
        tooltip: { enabled: true },
      },
    }
    return {
      chartData,
      chartOptions,
    }
  },
}
</script>

<template>
  <Bar id="my-chart-id" :data="chartData" :options="chartOptions" />
</template>
