<template>
  <div class="search-bar-module" >
    <div class="search" >
      <InputText @keydown.enter="search" v-model="query" placeholder="Search" />
      <Button @click="search" icon="pi pi-search"  rounded size="small"/>
    </div>
    <SpinnerComponent v-if="loadingProducts" />
    <div v-if="products.length > 0" class="search-data">
      <span v-if="loadingProducts">page {{ searchInfo.current_page }} of {{ searchInfo.total_pages }}</span>
      <span>{{ products.length }} item{{products.length === 1 ? '' : 's'}} found!</span>
    </div>
  </div>
</template>

<script setup>
import InputText from 'primevue/inputtext';
import SpinnerComponent from './utility/SpinnerComponent.vue';
import TableComponent from './TableComponent.vue';
import axios from 'axios';
import { useDataStore } from '@/stores/data'
import { storeToRefs } from 'pinia'

const store = useDataStore()

const {mergeProducts, resetProducts, isLoadingProducts, resetSearchInfo} = store
const { products, query, loadingProducts, searchInfo } = storeToRefs(store)

const search = async () => {
  resetProducts()
  resetSearchInfo()
  isLoadingProducts(true)
  let oopsError = 0
  while (oopsError === 0) {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/search`,
       { 
        params: 
        { 
          query: query.value,
          page: searchInfo.value.current_page
        } 
      });
      console.log(response)
      mergeProducts(response.data.products)
      if(!searchInfo.value.total_pages && !searchInfo.value.url) {
        searchInfo.value.total_pages = response.data.info.total_pages
        searchInfo.value.url = response.data.info.url
      }
      searchInfo.value.current_page++
    } catch (error) {
      oopsError = 1
      console.error(error);
    }
  }
  isLoadingProducts(false)
}

</script>

<style lang="scss" scoped>
.search-bar-module {
  @apply flex flex-col items-center gap-2;
  .search {
    @apply flex items-center gap-2;

    button {
      @apply w-full
    }

  }

  .search-data {
    @apply mt-3 flex flex-col items-center gap-1;
  }

}
</style>