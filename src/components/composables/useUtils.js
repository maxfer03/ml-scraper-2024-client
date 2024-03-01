import { useDataStore } from '@/stores/data'
import { storeToRefs } from 'pinia'


export default function useUtils() {
  const store = useDataStore()
  const { usdRate, searchInfo } = storeToRefs(store)

  const dollarize = (crocantes, tld) => {
    const thisUsdRate = parseFloat(usdRate.value[tld])
    return crocantes / thisUsdRate
  }

  const pesify = (usdValue, tld) => {
    const thisUsdRate = parseFloat(usdRate.value[tld])
    return usdValue * thisUsdRate
  }

  const formatPrice = ({raw, isUsd = false, inUsd = false, append = '$'}) => {
    let valueToFormat = raw
    let finalAppend = append
    if (isUsd) {
      valueToFormat = pesify(raw, searchInfo.value.tld)
    }

    
    if (inUsd) {
      if(isUsd) {
        valueToFormat = dollarize(valueToFormat, searchInfo.value.tld)
      } else {
        valueToFormat = dollarize(raw, searchInfo.value.tld)
      }
      finalAppend = 'U$D '
    }
    return (finalAppend || '') + Number(valueToFormat.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  return { formatPrice, dollarize }
}
