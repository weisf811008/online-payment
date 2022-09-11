<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { ElNotification } from 'element-plus'
import { usePaymentStore } from '../store/index'
import Button from '../components/button.vue'

const paymentStore = usePaymentStore()
const { stepPercentage } = storeToRefs(paymentStore)

const router = useRouter()
const formDataRef = ref('')
const payMethods = ref('')
const formData = reactive({
  back: '',
  email: '',
  check: false,
})

const backList = reactive([
  {
    code: '004',
    name: '臺灣銀行',
  },
  {
    code: '007',
    name: '第一銀行',
  },
  {
    code: '012',
    name: '台北富邦',
  },
  {
    code: '013',
    name: '國泰世華',
  },
  {
    code: '021',
    name: '花旗銀行',
  },
])

const rules = reactive({
  bank: [{ required: true, message: '不得為空', trigger: 'change' }],
  email: [
    { required: true, message: '不得為空', trigger: 'blur' },
    {
      type: 'email',
      message: '請輸入正確的Email地址',
      trigger: 'blur',
    },
  ],
  check: [{ required: true, message: '請確認後勾選', trigger: 'blur' }],
})

const goPrePage = () => {
  router.go(-1)
  stepPercentage.value = 33
}

const goNextPage = (formRef) => {
  formRef.validate((valid, fields) => {
    if (valid) {
      try {
        if (formData.check === false) {
          ElNotification({
            title: '錯誤',
            message: '再次確認尚未勾選',
            type: 'error',
          })
        } else {
          ElNotification({
            title: '成功',
            message: '您的訂單已完成付款',
            type: 'success',
          })
          router.push({ name: 'Finish' })
          stepPercentage.value = 100
        }
      } catch (e) {
        console.error(e)
        ElNotification({
          title: '失敗',
          message: '訂單未成立',
          type: 'error',
        })
      }
    }
  })
}
</script>

<template>
  <div class="header">
    <h2>STEP2. 填寫付款資訊</h2>
    <div class="line"></div>
    <h4>Web ATM / ATM</h4>
  </div>
  <el-form
    ref="formDataRef"
    :model="formData"
    :rules="rules"
    status-icon
    hide-required-asterisk
  >
    <el-form-item label="付款銀行" prop="bank" class="row">
      <div>
        <el-select v-model="formData.bank" placeholder="請選擇">
          <el-option
            v-for="back in backList"
            :value="back.name"
            :label="back.name"
            :key="`select-back-${back.code}`"
          />
        </el-select>
      </div>
    </el-form-item>
    <p>
      1. 請準備晶片經融卡 +
      晶片讀卡機，我們將引導您至指定金融機構之網路ATM進行交易手續。
    </p>
    <p>
      2.
      持對應機構之金融卡可享免跨行轉帳手續費，若無以上金融機構發行之金融卡，可自由選擇其一金融機構進行後續交易流程。
    </p>
    <el-form-item label="填寫付款人信箱：" prop="email" class="row">
      <div>
        <el-input v-model="formData.email" class="largeInput" />
      </div>
    </el-form-item>
    <el-form-item label="" prop="check">
      <el-checkbox
        v-model="formData.check"
        label="請再次確認「訂單資訊」與「付款資訊」付款完成後將發送通知信至您的Email信箱"
        name="type"
        width="200"
      />
    </el-form-item>
    <router-link to="#"
      >&nbsp;&nbsp;&nbsp;&nbsp;第三方支付金流平台服務條款</router-link
    >
    <div class="buttons">
      <Button title="回上一步" :handleClick="goPrePage" :nextStep="false" />
      <Button
        title="確認付款"
        :handleClick="() => goNextPage(formDataRef)"
        :nextStep="true"
      />
    </div>
  </el-form>
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

.row {
  display: block;

  .largeInput {
    width: 600px;
    height: 35px;
    margin: 0 10px 0 0;
  }
}

.router-link-active {
  color: #969696;
  text-decoration: none;
}

.buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>
