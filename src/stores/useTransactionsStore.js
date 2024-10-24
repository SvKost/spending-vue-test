import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useTransactionsStore = defineStore('transactions', () => {
  const regions = ref(JSON.parse(localStorage.getItem('regions')) || [])
  const selectedRegion = ref('ALL')
  const lastloads = ref([])
  const transactions = ref([])
  const rawTransactions = ref([])
  const error = ref(null)
  const loading = ref(false)

  const lastTreasuryLoads = computed(() => {
    const treasuryData = lastloads.value.find(
      item => item.sourceName === 'ДЕРЖАВНА КАЗНАЧЕЙСЬКА СЛУЖБА УКРАЇНИ',
    )
    return treasuryData?.lastLoad || 'Немає даних'
  })

  const topTransactions = computed(() => {
    let filteredTransactions = transactions.value

    if (selectedRegion.value !== 'ALL') {
      filteredTransactions = filteredTransactions.filter(
        item => item.region_id === selectedRegion.value,
      )
    }

    return filteredTransactions.sort((a, b) => b.amount - a.amount).slice(0, 10)
  })

  const fetchRegions = async () => {
    if (regions.value.length === 0) {
      loading.value = true

      try {
        const response = await fetch(
          'https://api.spending.gov.ua/api/v2/dictionaries/regions',
        )

        if (!response.ok) throw new Error('Failed to load data')

        regions.value = await response.json()
        regions.value.unshift({ regionCode: 'ALL', regionName: 'ВСІ' })

        localStorage.setItem('regions', JSON.stringify(regions.value))
      } catch (err) {
        error.value = err
      } finally {
        loading.value = false
      }
    }
  }

  const fetchLastLoads = async () => {
    loading.value = true

    try {
      const response = await fetch(
        'https://api.spending.gov.ua/api/v2/api/transactions/lastload',
      )

      if (!response.ok) throw new Error('Failed to load data')
      lastloads.value = await response.json()
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  const fetchTopTransactions = async () => {
    if (!lastTreasuryLoads.value) {
      error.value = new Error(
        'Не вдалося отримати дату останнього завантаження',
      )
      return
    }

    loading.value = true

    try {
      const date = lastTreasuryLoads.value

      const url = `https://api.spending.gov.ua/api/v2/api/transactions/?payers_edrpous=37567646&startdate=${date}&enddate=${date}`
      const response = await fetch(url)

      if (!response.ok) throw new Error('Failed to load transactions')

      const data = await response.json()
      rawTransactions.value = data
      console.log('Response data:', data)

      transactions.value = data.map(transaction => ({
        id: transaction.id,
        payer_edrpou: transaction.payer_edrpou,
        payer_name: transaction.payer_name,
        amount: transaction.amount || 0,
      }))

      console.log('maped:', transactions.value)
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  const setSelectedRegion = regionCode => {
    selectedRegion.value = regionCode
  }

  return {
    regions,
    rawTransactions,
    transactions: topTransactions,
    lastloads,
    selectedRegion,
    fetchRegions,
    fetchLastLoads,
    fetchTopTransactions,
    setSelectedRegion,
    lastTreasuryLoads,
    error,
    loading,
  }
})
