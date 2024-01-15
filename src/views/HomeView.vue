<template>
  <div class="home-view"> 
    <h1 class="title" >MercadoLibre Scraper</h1>
  <SearchBarComponentComponent/>
  <TableComponent/>
  <div class="promo">
    By <a class="link" href="https://www.linkedin.com/in/maxfarenas/" target="_blank" >Max Fernandez</a>
  </div>
  </div>
</template>

<script setup>
import SearchBarComponentComponent from "@/components/SearchBarComponent.vue"
import TableComponent from "@/components/TableComponent.vue"

</script>

<style lang="scss" scoped >
.home-view {
  @apply flex flex-col py-5 gap-5 items-center;
  .title {
    @apply text-primary-500;
  }
  .promo {
    @apply absolute bottom-5;
  }
}
</style>