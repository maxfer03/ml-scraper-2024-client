import { useDataStore } from '@/stores/data'
import { storeToRefs } from 'pinia'


export default function useUtils() {
  const store = useDataStore()
  const { usdRate, searchInfo} = storeToRefs(store)
  const dollarize = (crocantes, tld) => {
    const thisUsdRate = parseFloat(usdRate.value[tld])
    return crocantes / thisUsdRate
  }
  const formatPrice = (raw, append = '$') => {
    const rawUsd = dollarize(raw, searchInfo.value.tld)
    return (append || '') + Number(rawUsd.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  return { formatPrice, dollarize }
}
