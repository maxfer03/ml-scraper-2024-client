<template>
  <div class="box-container">
    <div v-if="header" class="box-container-header">
      {{ header }}
    </div>
    <div class="box-container-content" >
      <slot/>
    </div>
  </div>
</template>

<script setup>
defineProps(['header'])
</script>

<style lang="scss" scoped>
.box-container {
  @apply bg-surface-0 dark:bg-surface-800 text-surface-700 dark:text-white/80
  ;

  &-header {
    @apply h-[61px] font-semibold border-b border-surface-300 dark:border-surface-600 py-3.5 px-3
    flex items-center;
    ;
  }
  &-content {
    @apply py-3.5 px-3;
  }
}
</style>