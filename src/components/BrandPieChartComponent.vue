<template>
  <BoxContainer v-if="datasetByBrand.datasets[0].data.length > 0" header="Brands" class="brand-pie-chart-box" >
      <div class="brand-pie-chart"
        ref="chartContainer"
        >
          <Chart
          ref="chart"
          type="pie"
          :data="datasetByBrand"
          :options="pieChartOptions"
          />
      </div>
    </BoxContainer>
</template>

<script setup>
import Chart from 'primevue/chart';
import { useDataStore } from '@/stores/data'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue';
import BoxContainer from "@/components/containers/BoxContainer.vue"


const store = useDataStore()
const { products } = storeToRefs(store)

const chart = ref(null);
const chartContainer = ref(null);

const datasetByBrand = computed(() => {
  const prods = products.value
  let byBrand = {}
  for(let i of prods) {
    if(i.brand) {
      byBrand[i.brand] ? byBrand[i.brand]++ : byBrand[i.brand] = 1
    }
  }

  let byBrandArray = Object.entries(byBrand);
  byBrandArray.sort((a, b) => b[1] - a[1]);
  byBrandArray = byBrandArray.slice(0, 10);


  let sortedByBrand = {};
  for(let i of byBrandArray) {
      sortedByBrand[i[0]] = i[1];
  }


  const byBrandKeys = Object.keys(sortedByBrand)
  const byBrandValues = Object.values(sortedByBrand)

  const final = {
  datasets: [{
      data: byBrandValues,
    }],
    labels: byBrandKeys
  }

  return final
})


const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'left',
      },
      // title: {
      //   display: true,
      //   text: 'Chart.js Pie Chart'
      // }
    }
}
</script>

<style lang="scss" scoped>
.brand-pie-chart-box {
      @apply max-w-[400px];
    }
</style>