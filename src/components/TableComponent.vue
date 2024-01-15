<template>
  <DataTable class="table" :value="data" paginator :rows="25" :rowsPerPageOptions="[5, 10, 20, 50]"
  scrollable scrollHeight="400px" size="small"
  >
    <template #header>
      <div class="table-header" >
        <Button icon="pi pi-external-link" @click="downloadCSV" label="CSV" />
        <Button icon="pi pi-external-link" @click="downloadXLSX" label="XLSX" />
      </div>
    </template>
    <Column class="col" field="title" header="Title" sortable style="width: 70%"></Column>
    <Column class="col" field="brand" header="Brand" sortable style="width: 10%"></Column>
    <Column class="col" field="final_price" header="Price" sortable style="width: 10%"></Column>
    <Column class="col" field="url" header="Link" style="width: 10%">
      <template #body="slotProps">
          <a class="link" :href="slotProps.data.url" target="_blank" >Link</a>
      </template>
    </Column>
  </DataTable>
</template>

<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import * as XLSX from 'xlsx/xlsx.mjs';

const props = defineProps(['data'])

function convertToCSV(arr) {
  const array = [Object.keys(arr[0])].concat(arr);

  return array.map(it => {
    return Object.values(it).toString();
  }).join('\n');
}

function downloadCSV() {
  const csvData = convertToCSV(props.data);
  const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', `${'data'}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const downloadXLSX = () => {
  // Create a worksheet
  const ws = XLSX.utils.json_to_sheet(props.data);
  // Create a workbook
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  // Generate a binary string
  const binaryString = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

  // Convert binary string to character codes
  const binaryArray = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    binaryArray[i] = binaryString.charCodeAt(i);
  }

  // Create a blob from the binary array
  const blob = new Blob([binaryArray], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

  // Create a download link and trigger the download
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${'data'.replace(' ', "_")}.xlsx`;
  a.click();
  window.URL.revokeObjectURL(url);
}

</script>

<style lang="scss" scoped>
.table {
  @apply w-[1000px];

  &-header {
    @apply flex gap-3;
  }

  

  .row-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>