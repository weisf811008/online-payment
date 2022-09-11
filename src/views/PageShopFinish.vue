<script setup>
import { useRouter, useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { usePaymentStore } from '../store/index'
import Button from '../components/button.vue'

const paymentStore = usePaymentStore()
const { stepPercentage } = storeToRefs(paymentStore)

const router = useRouter()
const route = useRoute()

const goNextPage = () => {
  router.push({ name: 'Home' })
  stepPercentage.value = 33
}

const code = `${new Date().getFullYear()}${
  new Date().getMonth() + 1
}${new Date().getDate()}${new Date().getHours()}${new Date().getMinutes()}${new Date().getSeconds()}`

const date = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${
  new Date().getDate() + 6
}-23:59:59`
</script>

<template>
  <div>
    <div class="header">
      <h2>您的訂單已成立</h2>
      <div class="line"></div>
    </div>
    <div class="finish">
      <p>付款超商：</p>
      <h1>{{ route.query.shopName }}</h1>
      <p>付款代碼：</p>
      <h1>{{ code }}</h1>
      <p>付款期限：</p>
      <h1>{{ date }}</h1>
      <span
        >* 請至您選擇之超商店內機台輸入代碼進行繳費，逾期訂單自動作廢。</span
      >
      <div class="button">
        <Button title="返回首頁" :handleClick="goNextPage" :nextStep="true" />
      </div>
    </div>
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
  margin-top: 80px;

  h1 {
    margin: 0 0 40px 0;
  }

  .button {
    text-align: right;
  }
}
</style>
