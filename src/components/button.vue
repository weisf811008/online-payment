<script setup>
const props = defineProps({
  title: String,
  handleClick: Function,
  nextStep: Boolean,
})
</script>

<template>
  <button
    type="button"
    :class="props.nextStep ? 'isNext' : 'isPre'"
    @click="handleClick()"
  >
    {{ title }}
  </button>
</template>
<style lang="scss" scoped>
button {
  width: 90px;
  height: 40px;
  border: 0;
  border-radius: 5px;
  justify-content: end;

  &:hover {
    cursor: pointer;
  }
}
.isNext {
  background-color: #36b996;
  color: white;
  &:hover {
    opacity: 0.8;
  }
}

.isPre {
  background-color: #d5f5e9;
  color: #5e5e5e;
  &:hover {
    opacity: 0.8;
  }
}
</style>
