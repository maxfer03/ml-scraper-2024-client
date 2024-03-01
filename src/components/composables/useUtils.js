import { useDataStore } from '@/stores/data'
import { storeToRefs } from 'pinia'
import Dinero from 'dinero.js'

export default function useUtils() {
  const store = useDataStore()
  const { usdRate, searchInfo } = storeToRefs(store)

  const getCurrAppend = () => {
    switch (searchInfo.value.tld) {
      case 'ar':
        return 'ARS$'
      case 'br':
        return 'R$'
      case 'uy':
        return '$U'
      case 'cl':
        return 'CLP$'
      default:
        return '$'
    }
  }

  const dollarize = (crocantes, tld) => {
    const thisUsdRate = parseFloat(usdRate.value[tld])
    return crocantes / thisUsdRate
  }

  const pesify = (usdValue, tld) => {
    const thisUsdRate = parseFloat(usdRate.value[tld])
    return usdValue * thisUsdRate
  }

  const formatPrice = ({ raw, isUsd = false, inUsd = false, append = getCurrAppend() }) => {
    let valueToFormat = raw
    let finalAppend = append
    if (isUsd) {
      valueToFormat = pesify(raw, searchInfo.value.tld)
    }


    if (inUsd) {
      if (isUsd) {
        valueToFormat = dollarize(valueToFormat, searchInfo.value.tld)
      } else {
        valueToFormat = dollarize(raw, searchInfo.value.tld)
      }
      finalAppend = 'US$'
    }
    const finalValue = Number(valueToFormat.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    return finalAppend + ' ' + finalValue
  }

  return { formatPrice, dollarize, pesify, getCurrAppend }
}
