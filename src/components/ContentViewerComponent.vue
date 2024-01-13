<template>
  <div class="content-viewer" >
    <div class="search" >
      <input v-model="query" type="text" />
      <button @click="search" >Search</button>
    </div>
    <div v-if="products.length > 0" class="products-visualizer">
      <button @click="downloadCSV" >Download CSV file</button>
      <ul>
        <li v-for="product, idx in products" :key="`prod-${idx}`">
          <a :href="product.url" target="_blank" >
            {{ product.title }}
          </a>
          <span>$ {{ product.final_price }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
const query = ref('')
const products = ref([])

const search = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/search`, { params: { query: query.value } });
    products.value = response.data
  } catch (error) {
    console.error(error); // Handle the error here
  }
}

function convertToCSV(arr) {
  const array = [Object.keys(arr[0])].concat(arr);

  return array.map(it => {
    return Object.values(it).toString();
  }).join('\n');
}

function downloadCSV() {
  const csvData = convertToCSV(products.value);
  const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', 'data.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}




</script>

<style lang="scss" scoped>
.content-viewer {
  @apply py-5 flex flex-col items-center;
  .search {
    @apply flex flex-col items-center gap-2;
    input {
      @apply border-2;
    }
    
  }

  button {
      @apply w-full bg-black/15 p-1 rounded-md
  }
}
</style>