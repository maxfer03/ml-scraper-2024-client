<template>
  <div v-if="products.length > 0" class="price-data">
    <div class="price-data-item">
      <div class="price">
        <span class="price-curr">
          {{ getHighestPrice(products)[0] }}
        </span>
        <span class="price-num">
          {{ getHighestPrice(products)[1] }}
        </span>
      </div>
      <span class="info">Highest Price</span>
    </div>
    <div class="price-data-item">
      <div class="price">
        <span class="price-curr">
          {{ getAveragePrice(products)[0] }}
        </span>
        <span class="price-num">
          {{ getAveragePrice(products)[1] }}
        </span>
      </div>
      <span class="info">Average Price</span>
    </div>
    <div class="price-data-item">
      <div class="price">
        <span class="price-curr">
          {{ getSmallestPrice(products)[0] }}
        </span>
        <span class="price-num">
          {{ getSmallestPrice(products)[1] }}
        </span>
      </div>
      <span class="info">Lowest Price</span>
    </div>

  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useDataStore } from '@/stores/data'
import useUtils from '@/components/composables/useUtils'


const store = useDataStore()

const { products, dollarized } = storeToRefs(store)

const { formatPrice } = useUtils()

const getAveragePrice = (arr) => {
  let sum = 0;
  let isUsd = false

  arr.forEach(element => {
    if (typeof element.final_price === 'number') {
      sum += element.final_price;
      isUsd = element.is_usd

    }
  });
  const average = sum / arr.length
  const formatted = formatPrice({ raw: average, isUsd: isUsd, inUsd: dollarized.value })
  return formatted.split(' ');
}

const getSmallestPrice = (arr) => {
  let smallest = Infinity;
  let isUsd = false
  arr.forEach(element => {
    if (typeof element.final_price === 'number' && element.final_price < smallest) {
      smallest = element.final_price;
      isUsd = element.is_usd
      console.log(element, smallest)
    }
  });
  const formatted = formatPrice({ raw: smallest, isUsd: isUsd, inUsd: dollarized.value })
  return formatted.split(' ')
}

const getHighestPrice = (arr) => {
  let highest = 0;
  let isUsd = false
  arr.forEach(element => {
    if (typeof element.final_price === 'number' && element.final_price > highest) {
      highest = element.final_price;
      isUsd = element.is_usd

    }
  });
  const formatted = formatPrice({ raw: highest, isUsd: isUsd, inUsd: dollarized.value })
  return formatted.split(' ')
}


</script>

<style lang="scss" scoped>
.price-data {
  @apply flex flex-col justify-center items-center gap-8 lg:flex-row;

  &-item {
    @apply w-[200px] flex flex-col items-center justify-center gap-2;

    .price {
      @apply flex flex-col gap-2 items-center;

      &-num {
        @apply text-4xl text-primary-500 text-center;
      }
    }
  }
}
</style>