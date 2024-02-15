<template>
  <div class="home-view"> 
    <h1 class="title" >MercadoLibre Scraper</h1>
  <SearchBarComponentComponent/>
  <PriceDataComponent/>
  <div class="dashboard" >
    <BrandPieChartComponent/>
    <TableComponent/>
  </div>
  </div>
</template>

<script setup>
import SearchBarComponentComponent from "@/components/SearchBarComponent.vue"
import TableComponent from "@/components/TableComponent.vue"
import PriceDataComponent from "@/components/PriceDataComponent.vue"
import BrandPieChartComponent from "@/components/BrandPieChartComponent.vue"
</script>

<style lang="scss" scoped >
.home-view {
  @apply flex flex-col py-5 gap-5 items-center;
  .title {
    @apply text-primary-500;
  }
  .dashboard {
    @apply flex items-center flex-col gap-5 lg:flex-row lg:items-start;

    
  }
}
</style>