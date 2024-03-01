<template>
  <div class="search-bar-module">
    <div class="search">
      <div class="search-top">
        <span class="search-top-field">
          <i v-if="loadingProducts" class="search-top-field-spinner pi pi-spin pi-spinner" />
          <InputText @keydown.enter="search" v-model="query" placeholder="Search" />
        </span>
        <Dropdown class="domains" v-model="selectedDomain" :options="domains" optionLabel="name" />
        <Button @click="search" icon="pi pi-search" rounded size="small" />
      </div>
      <div class="search-btm">
        <Chips placeholder="Excluded words" class="excluded" v-model="excluded" separator="," />
      </div>
    </div>
    <div v-if="products.length > 0" class="search-data">
      <span v-if="loadingProducts">Looking at page {{ searchInfo.current_page }}</span>
      <span>{{ products.length }} item{{ products.length === 1 ? '' : 's' }} found!</span>
    </div>
    <div v-else-if="noItems && products.length === 0" class="search-data">
      Sorry! No items found
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import InputText from 'primevue/inputtext';
import axios from 'axios';
import { useDataStore } from '@/stores/data'
import { storeToRefs } from 'pinia'
import Dropdown from 'primevue/dropdown';
import Chips from 'primevue/chips';
const store = useDataStore()

const { mergeProducts, resetProducts, isLoadingProducts, resetSearchInfo } = store
const { products, query, loadingProducts, searchInfo } = storeToRefs(store)

const domains = ref([
  { name: 'Arg', code: 'ar' },
  { name: 'Uru', code: 'uy' },
  { name: 'Chi', code: 'cl' },
  { name: 'Bra', code: 'br' },

]);
const selectedDomain = ref(domains.value[0]);

const excluded = ref([])


const noItems = ref(false);

const resetToDefault = () => {
  noItems.value = false
  resetProducts()
  resetSearchInfo()
  isLoadingProducts(true)
}

const search = async () => {
  resetToDefault()
  let oopsError = 0
  while (oopsError === 0) {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/search`,
        {
          params:
          {
            query: query.value,
            tld: selectedDomain.value.code,
            page: searchInfo.value.current_page,
            exc: excluded.value
          }
        });
      mergeProducts(response.data.products)
      if (!searchInfo.value.total_pages && !searchInfo.value.url && !searchInfo.value.tld) {
        searchInfo.value.total_pages = response.data.info.total_pages
        searchInfo.value.url = response.data.info.url
        searchInfo.value.tld = response.data.info.tld
      }
      searchInfo.value.current_page++
    } catch (error) {
      noItems.value = true
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
    @apply flex flex-col items-center gap-2 max-w-[400px] lg:w-[400px];

    &-top {
      @apply w-full flex items-center gap-2;

      &-field {
        @apply relative;

        &-spinner {
          @apply absolute top-2/4 -mt-2 right-3 text-surface-400 dark:text-surface-600;
        }

        input {
          @apply w-[250px] pr-9
        }
      }

      .domains {
        @apply w-24;
      }
    }

    &-btm {
      @apply w-full;

      .excluded:deep() {
        ul {
          @apply p-2;
        }
      }
    }


  }

  .search-data {
    @apply min-h-[50px] mt-3 flex flex-col items-center justify-center gap-1;
  }

}
</style>