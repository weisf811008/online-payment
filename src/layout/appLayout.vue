<script setup>
import { ref } from 'vue'
import OrderInfo from '../components/orderInfo.vue'
import Step from '../components/step.vue'
</script>
<template>
  <div class="main">
    <div>
      <OrderInfo />
    </div>
    <div>
      <Step />
      <div class="payment">
        <router-view />
      </div>
      <footer></footer>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.main {
  display: flex;
  justify-content: center;

  .payment {
    width: 100%;
    height: 100%;
    max-height: 680px;
    padding: 40px;
  }
}
footer {
  height: 100px;
  bottom: 0;
  background-image: url('../assets/img/footer-background.svg');
}
</style>
