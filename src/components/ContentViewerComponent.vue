<template>
  <div class="content-viewer" >
    <div class="search" >
        <InputText v-model="query" placeholder="Search" />
      <Button @click="search" label="Search"  rounded size="small"/>
    </div>
    <div v-if="products.length > 0" class="products-visualizer">
      <span>{{ products.length }} item{{products.length === 1 ? '' : 's'}} found!</span>
      <div class="files">
        <Button @click="downloadCSV"  label="Download CSV file" rounded size="small"/>
        <Button @click="downloadXLSX"  label="Download XLSX file" rounded size="small"/>
      </div>
      <!-- <ul>
        <li v-for="product, idx in products" :key="`prod-${idx}`">
          <a :href="product.url" target="_blank" >
            {{ product.title }}
          </a>
          <span>$ {{ product.final_price }}</span>
        </li>
      </ul> -->
    </div>
  </div>
</template>

<script setup>
import InputText from 'primevue/inputtext';
import * as XLSX from 'xlsx/xlsx.mjs';
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
  link.setAttribute('download', `${query.value}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const downloadXLSX = () => {
  // Create a worksheet
  const ws = XLSX.utils.json_to_sheet(products.value);
  // Create a workbook
  const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Generate a blob
    const blob = XLSX.write(wb, { bookType: 'xlsx', mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Create a download link and trigger the download
    const url = window.URL.createObjectURL(new Blob([blob], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'output.xlsx';
    a.click();
    window.URL.revokeObjectURL(url);
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