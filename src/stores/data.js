import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useDataStore = defineStore('data', () => {
  const query = ref('')
  const loadingProducts = ref(false)
  const searchInfo = ref({
    current_page: 0,
    total_pages: null,
    url: null,
    tld: null
  })
  const products = ref([])

  const usdRate = ref({
    br: '1',
    cl: '1',
    uy: '1',
    ar: '1',
  })

  const dollarized = ref(false);

  const switchCurrency = () => {
    dollarized.value = !dollarized.value
  }

  const updateUsdRate = (obj) => {
    usdRate.value = { ...usdRate.value, ...obj }
  }

  function mergeProducts(arr) {
    products.value = [...products.value, ...arr]
  }

  function resetProducts() {
    products.value = []
  }

  const isLoadingProducts = (value) => {
    loadingProducts.value = value
  }

  const resetSearchInfo = () => {
    searchInfo.value = {
      current_page: 0,
      total_pages: null,
      url: '',
      tld: null

    }
  }

  return { query, loadingProducts, searchInfo, products, usdRate, dollarized, switchCurrency, updateUsdRate, mergeProducts, resetProducts, isLoadingProducts, resetSearchInfo }
})
