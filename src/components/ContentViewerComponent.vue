<template>
  <div class="content-viewer" >
    <div class="search" >
      <InputText v-model="query" placeholder="Search" />
      <Button @click="search" label="Search"  rounded size="small"/>
    </div>
    <SpinnerComponent v-if="loading" />
    <div v-if="products.length > 0" class="products-visualizer">
      <span v-if="loading">page {{ reqInfo.current_page }} of {{ reqInfo.total_pages }}</span>
      <span>{{ products.length }} item{{products.length === 1 ? '' : 's'}} found!</span>
      <TableComponent :data="products"/>
    </div>
  </div>
</template>

<script setup>
import InputText from 'primevue/inputtext';
import SpinnerComponent from './utility/SpinnerComponent.vue';
import TableComponent from './TableComponent.vue';
import { ref } from 'vue';
import axios from 'axios';

const query = ref('')
const loading = ref(false)

const reqInfo = ref ({
  current_page: 0,
  total_pages: null,
  url: ''
})
const products = ref([])

const search = async () => {
  products.value = []
  reqInfo.value = {
  current_page: 0,
  total_pages: null,
  url: ''
}
  loading.value = true
  let oopsError = 0
  while (oopsError === 0) {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/search`,
       { 
        params: 
        { 
          query: query.value,
          page: reqInfo.value.current_page
        } 
      });
      console.log(response)
      products.value = [...products.value, ...response.data.products]
      if(!reqInfo.value.total_pages) {
        reqInfo.value.total_pages = response.data.info.total_pages
      }
      reqInfo.value.current_page++
    } catch (error) {
      oopsError = 1
      console.error(error); // Handle the error here
    }
    // counter++;
  }
  loading.value = false
}

</script>

<style lang="scss" scoped>
.content-viewer {
  @apply py-5 flex flex-col items-center;
  .search {
    @apply flex flex-col items-center gap-2;

    button {
      @apply w-full
    }

  }

  .products-visualizer {
    @apply flex flex-col items-center gap-2 mt-2;

    .files {
      @apply flex gap-2
    }
  }

}
</style>