<template>
  <div v-if="datasetByBrand.datasets[0].data.length > 0" class="brand-pie-chart"
    ref="chartContainer"
    >
    <Panel
    header="Most Popular Brands"
    >
      <Chart
      ref="chart"
      type="pie"
      :data="datasetByBrand"
      :options="pieChartOptions"
      />
    </Panel>
  </div>
</template>

<script setup>
import Chart from 'primevue/chart';
import { useDataStore } from '@/stores/data'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref, watch } from 'vue';
import Panel from 'primevue/panel';



const store = useDataStore()
const { products } = storeToRefs(store)

const chart = ref(null);
const chartContainer = ref(null);

const datasetByBrand = computed(() => {
  const prods = products.value
  let byBrand = {}
  for(let i of prods) {
    console.log(i.brand)
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
.brand-pie-chart {
  @apply w-full max-w-[70%]
}
</style>