import { getRegionsData } from '../services/fetchData'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useTransactionsStore = defineStore('transactions', () => {
  const regions = ref(JSON.parse(localStorage.getItem('regions')) || [])
  const selectedRegion = ref('ALL')
  const activeRegion = ref('ALL')
  const sortOrder = ref('desc')
  const lastloads = ref([])
  const transactions = ref([])
  const topRegionTransactions = ref([])
  const topAllTransactions = ref([])
  const rawTransactions = ref([])
  const cachedTransactions = ref({})
  const isSearched = ref(false)
  const error = ref(null)
  const loading = ref(false)
  const currencyUnit = ref('грн')

  const lastTreasuryLoads = computed(() => {
    const treasuryData = lastloads.value.find(
      item => item.sourceName === 'ДЕРЖАВНА КАЗНАЧЕЙСЬКА СЛУЖБА УКРАЇНИ',
    )
    return treasuryData?.lastLoad || 'Немає даних'
  })

  const filteredTransactionsCount = computed(() => {
    if (!isSearched.value) return 0
    if (activeRegion.value === 'ALL') {
      return rawTransactions.value.length
    }
    return rawTransactions.value.filter(
      item => item.region_id === activeRegion.value,
    ).length
  })

  const setSelectedRegion = regionCode => {
    selectedRegion.value = regionCode
  }

  const setActiveRegion = regionCode => {
    activeRegion.value = regionCode
  }

  const calculateTopTransactions = () => {
    if (!isSearched.value) return

    const groupedTransactions = new Map()

    rawTransactions.value.forEach(transaction => {
      if (!groupedTransactions.has(transaction.region_id)) {
        groupedTransactions.set(transaction.region_id, [])
      }
      groupedTransactions.get(transaction.region_id).push(transaction)
    })

    topAllTransactions.value = rawTransactions.value
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 10)

    if (activeRegion.value === 'ALL') {
      topRegionTransactions.value = rawTransactions.value
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 10)
    } else {
      const regionTransactions =
        groupedTransactions.get(activeRegion.value) || []
      topRegionTransactions.value = regionTransactions
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 10)
    }
  }

  const topTransactions = computed(() => {
    if (!isSearched.value) return []

    const unitMultiplier =
      currencyUnit.value === 'тис'
        ? 1000
        : currencyUnit.value === 'млн'
          ? 1_000_000
          : 1

    const sortFn = (a, b) =>
      sortOrder.value === 'asc' ? a.amount - b.amount : b.amount - a.amount

    const transactions =
      activeRegion.value === 'ALL'
        ? topAllTransactions.value
        : topRegionTransactions.value

    return transactions
      .map(transaction => ({
        ...transaction,
        formattedAmount: (transaction.amount / unitMultiplier).toFixed(2),
      }))
      .sort(sortFn)
  })

  const fetchRegions = async () => {
    if (regions.value.length === 0) {
      loading.value = true
      error.value = null

      try {
        const response = await getRegionsData()

        if (!response.ok)
          throw new Error(`Failed to load regions data: ${response.status}`)

        const data = await response.json()
        regions.value = [{ regionCode: 'ALL', regionName: 'ВСІ' }, ...data]

        localStorage.setItem('regions', JSON.stringify(regions.value))
      } catch (err) {
        error.value = err.message
        regions.value = []
      } finally {
        loading.value = false
      }
    }
  }

  const fetchLastLoads = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await fetch(
        'https://api.spending.gov.ua/api/v2/api/transactions/lastload',
      )

      if (!response.ok)
        throw new Error(`Failed to load last date: ${response.status}`)

      lastloads.value = await response.json()
    } catch (err) {
      error.value = err.message
      lastloads.value = []
    } finally {
      loading.value = false
    }
  }

  const fetchTopTransactions = async () => {
    const date = lastTreasuryLoads.value

    if (cachedTransactions.value[date]) {
      rawTransactions.value = cachedTransactions.value[date]
      activeRegion.value = selectedRegion.value
      isSearched.value = true
      calculateTopTransactions()
      return
    }

    loading.value = true
    error.value = null
    rawTransactions.value = []

    try {
      const url = `https://api.spending.gov.ua/api/v2/api/transactions/?startdate=${date}&enddate=${date}`

      const response = await fetch(url, {
        headers: {
          Accept: 'text/csv, application/json',
        },
      })

      if (!response.ok)
        throw new Error(`Failed to load transactions: ${response.status}`)

      const data = await response.json()

      if (!Array.isArray(data) || data.length === 0) {
        throw new Error('No transactions found for the specified date')
      }

      const processedData = data.map(transaction => ({
        id: transaction.id,
        payer_edrpou: transaction.payer_edrpou || '',
        payer_name: transaction.payer_name || '',
        amount: parseFloat(transaction.amount) || 0,
        region_id: transaction.region_id || '',
      }))

      cachedTransactions.value[date] = processedData
      rawTransactions.value = processedData
      activeRegion.value = selectedRegion.value
      isSearched.value = true
      calculateTopTransactions()
    } catch (err) {
      error.value = err
      rawTransactions.value = []
      isSearched.value = false
    } finally {
      loading.value = false
    }
  }

  return {
    regions,
    rawTransactions,
    transactions,
    currencyUnit,
    topTransactions,
    filteredTransactionsCount,
    calculateTopTransactions,
    lastloads,
    selectedRegion,
    sortOrder,
    fetchRegions,
    fetchLastLoads,
    fetchTopTransactions,
    setSelectedRegion,
    setActiveRegion,
    lastTreasuryLoads,
    isSearched,
    error,
    loading,
  }
})
