<template>
<DataTable :value="data" paginator :rows="25" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="width: 1000px"
scrollable scrollHeight="400px"
>
    <Column field="title" header="Title" sortable style="width: 25%"></Column>
    <Column field="brand" header="Brand" sortable style="width: 25%"></Column>
    <Column field="final_price" header="Price" sortable style="width: 25%"></Column>
    <Column field="url" header="Link">
        <template #body="slotProps">
            <a :href="slotProps.data.url" target="_blank" >Link</a>
        </template>
    </Column>
</DataTable>
</template>

<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

defineProps(['data'])

</script>

<style lang="scss" scoped>

</style>