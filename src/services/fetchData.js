import axiosInstance from './axiosInstance'

export const getRegionsData = async () => {
  const response = await axiosInstance.get('/dictionaries/regions')

  return response.data
}

export const getLastLoads = async () => {
  const response = await axiosInstance.get('/api/transactions/lastload')

  return response.data
}

export const getTransactionsPerDay = async (startDate, endDate) => {
  const response = await axiosInstance.get(`/transactions`, {
    params: {
      startdate: startDate,
      enddate: endDate,
    },
    headers: {
      Accept: 'text/csv, application/json',
    },
  })

  return response.data
}
