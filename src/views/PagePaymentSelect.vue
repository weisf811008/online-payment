<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { ElNotification } from 'element-plus'
import { usePaymentStore } from '../store/index'
import Button from '../components/button.vue'

const paymentStore = usePaymentStore()
const { stepPercentage } = storeToRefs(paymentStore)

const router = useRouter()
const payment = ref('')

const handleSelectPayment = (e) => {
  payment.value = e.target.value
}

const goNextPage = () => {
  if (payment.value == '' || null) {
    ElNotification({
      title: '錯誤',
      message: '您尚未選擇付款方式',
      type: 'error',
    })
  }
  if (payment.value == 'creditCard') {
    router.push({ name: 'CreaditCardInfo' })
    stepPercentage.value = 67
  } else if (payment.value == 'atm') {
    router.push({ name: 'AtmInfo' })
    stepPercentage.value = 67
  } else if (payment.value == 'shop') {
    router.push({ name: 'ShopInfo' })
    stepPercentage.value = 67
  }
}
</script>

<template>
  <div class="header">
    <h2>STEP1. 選擇付款方式</h2>
    <div class="line"></div>
  </div>
  <div class="img-group">
    <button
      id="creditCard"
      class="items img-creditCard"
      @click="handleSelectPayment"
      value="creditCard"
    >
      <label for="creditCard">信用卡/金融卡</label>
    </button>

    <button
      id="unionpay"
      class="items img-unionpay"
      @click="handleSelectPayment"
      value="creditCard"
    >
      <label for="unionpay">銀聯卡</label>
    </button>
    <button
      id="shop"
      class="items img-shop"
      @click="handleSelectPayment"
      value="shop"
    >
      <label for="shop">超商付款</label>
    </button>
    <button
      id="webAtm"
      class="items img-WebAtm"
      @click="handleSelectPayment"
      value="atm"
    >
      <label for="webAtm">Web ATM</label>
    </button>
    <button
      id="atm"
      class="items img-atm"
      @click="handleSelectPayment"
      value="atm"
    >
      <label for="atm">ATM轉帳</label>
    </button>
  </div>
  <div class="next-button">
    <Button title="下一步" :handleClick="goNextPage" :nextStep="true" />
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
.img-group {
  margin-top: 100px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
  vertical-align: bottom;

  .items {
    width: 160px;
    height: 140px;
    margin: 10px;
    border: 0;
    border-radius: 5px;
    position: relative;
    background-color: rgba(0, 0, 0, 0.08);
    background-repeat: no-repeat;
    background-size: 80px 80px;
    background-position: center;

    &:hover {
      background-color: #36b996;
      color: white;
    }

    &:focus {
      background-color: #36b996;
      color: white;
    }
  }

  label {
    width: 160px;
    position: absolute;
    bottom: 15px;
    transform: translateX(-50%);
  }

  .img-creditCard {
    background-image: url('../assets/img/credit-card.svg');
  }

  .img-unionpay {
    background-image: url('../assets/img/unionpay.svg');
  }

  .img-shop {
    background-image: url('../assets/img/shop.svg');
  }

  .img-WebAtm {
    background-image: url('../assets/img/web-atm.svg');
  }

  .img-atm {
    background-image: url('../assets/img/atm.svg');
  }
}

.next-button {
  text-align: right;
}
</style>
