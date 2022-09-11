<script setup>
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { usePaymentStore } from '../store/index'
import Button from '../components/button.vue'

const paymentStore = usePaymentStore()
const { stepPercentage } = storeToRefs(paymentStore)

const router = useRouter()

const goNextPage = () => {
  router.push({ name: 'Home' })
  stepPercentage.value = 33
}
</script>

<template>
  <div class="header">
    <h2>您的訂單已完成付款</h2>
    <div class="line"></div>
  </div>
  <div class="finish">
    <div class="circle"></div>
    <img src="../assets/img/finish.svg" alt="finish" />

    <p>稍後將寄送訂單詳細資訊至您的Email</p>
    <Button title="返回首頁" :handleClick="goNextPage" :nextStep="true" />
  </div>
</template>
<style lang="scss" scoped>
.header {
  text-align: center;

  .line {
    width: 250px;
    height: 20px;
    background-color: #b5ffe4;
    margin: -30px auto auto auto;
  }
}
.finish {
  text-align: center;

  .circle {
    margin: 80px;
    width: 200px;
    height: 200px;
    transform: translateX(60%);
    background-color: #b5ffe4;
    border-radius: 50%;
    position: absolute;
  }

  img {
    width: 200px;
    margin: 80px;
    position: relative;
  }

  p {
    margin-bottom: 40px;
  }
}
</style>
