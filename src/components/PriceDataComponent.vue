<template>
  <div v-if="products.length > 0" class="price-data">
    <div class="price-data-item">
      <span class="price">${{getHighestPrice(products)}}</span>
      <span class="info">Highest Price</span>
    </div>
    <div class="price-data-item">
      <span class="price">${{getAveragePrice(products)}}</span>
      <span class="info">Average Price</span>
    </div>
    <div class="price-data-item">
      <span class="price">${{getSmallestPrice(products)}}</span>
      <span class="info">Lowest Price</span>
    </div>
    
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useDataStore } from '@/stores/data'


const store = useDataStore()

const { products } = storeToRefs(store)

const getAveragePrice = (arr) => {
    let sum = 0;  
    arr.forEach(element => {
      if (typeof element.final_price === 'number') {
        sum += element.final_price;
      }
    });
    const average = sum / arr.length
    return formatPrice(average);
}

const getSmallestPrice = (arr) => {
    let smallest = Infinity;  
    arr.forEach(element => {
      if (typeof element.final_price === 'number' && element.final_price < smallest) {
        smallest = element.final_price;
      }
    });
    return formatPrice(smallest);
}

const getHighestPrice = (arr) => {
    let highest = 0;  
    arr.forEach(element => {
      if (typeof element.final_price === 'number' && element.final_price > highest) {
        highest = element.final_price;
      }
    });
    return formatPrice(highest);
}


</script>

<style lang="scss" scoped>
.price-data {
  @apply flex justify-center items-center gap-8;

  &-item {
    @apply w-[200px] flex flex-col items-center justify-center gap-2;
    .price {
      @apply text-4xl text-primary-500;
    }
  }
}
</style>