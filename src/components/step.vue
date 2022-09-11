<script setup>
import { storeToRefs } from 'pinia'
import { usePaymentStore } from '../store/index'

const paymentStore = usePaymentStore()
const { stepPercentage } = storeToRefs(paymentStore)
</script>

<template>
  <div class="demo-progress">
    <el-progress :percentage="stepPercentage" />
  </div>
</template>

<style lang="scss" scoped>
.demo-progress {
  width: 660px;
  margin: 40px 0;
}
</style>
