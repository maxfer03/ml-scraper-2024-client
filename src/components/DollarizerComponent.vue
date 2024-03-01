<template>
  <Button class="dollarizer" :class="{ active: dollarized }" icon="pi pi-money-bill" @click="switchCurrency"
    :label="label" />
</template>
<script setup>
import { computed } from 'vue';
import { useDataStore } from '@/stores/data'
import { storeToRefs } from 'pinia'
import useUtils from '@/components/composables/useUtils'
const store = useDataStore()

const { getCurrAppend } = useUtils()
const { dollarized } = storeToRefs(store)
const { switchCurrency } = store


const label = computed(() => {
  return dollarized.value ? "U$D" : getCurrAppend()
})

</script>

<style lang="scss" scoped >
.dollarizer {
  @apply w-24;

  &:not(.active) {
    @apply text-surface-700 ring-1 ring-surface-200 bg-surface-0 hover:bg-surface-200 dark:text-white/80 dark:ring-surface-700 dark:bg-surface-900 dark:hover:bg-surface-600/80
  }
}
</style>