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
const formDataRef = ref(null)
const payMethods = ref('')
const formData = reactive({
  payMethods: 'payInFull',
  creditCardNum1: '',
  creditCardNum2: '',
  creditCardNum3: '',
  creditCardNum4: '',
  month: '',
  year: '',
  backThree: '',
  email: '',
  check: false,
})

const rules = ref({
  creditCardNum1: [
    { required: true, message: '不得為空', trigger: ['blur', 'change'] },
    {
      min: 4,
      message: '應為4個字元的數字',
      trigger: 'blur',
    },
  ],
  creditCardNum2: [
    { required: true, message: '不得為空', trigger: 'blur' },
    {
      min: 4,
      message: '應為4個字元的數字',
      trigger: 'blur',
    },
  ],
  creditCardNum3: [
    { required: true, message: '不得為空', trigger: 'blur' },
    {
      min: 4,
      message: '應為4個字元的數字',
      trigger: 'blur',
    },
  ],
  creditCardNum4: [
    { required: true, message: '不得為空', trigger: 'blur' },
    {
      min: 4,
      message: '應為4個字元的數字',
      trigger: 'blur',
    },
  ],
  month: [
    { required: true, message: '不得為空', trigger: 'blur' },
    {
      min: 2,
      message: '應為2個字元的數字',
      trigger: 'blur',
    },
  ],
  year: [
    { required: true, message: '不得為空', trigger: 'blur' },
    {
      min: 4,
      message: '應為4個字元的數字',
      trigger: 'blur',
    },
  ],
  backThree: [
    { required: true, message: '不得為空', trigger: 'blur' },
    {
      min: 3,
      message: '應為3個字元的數字',
      trigger: 'blur',
    },
  ],
  email: [
    { required: true, message: '不得為空', trigger: 'blur' },
    {
      type: 'email',
      message: '請輸入正確的Email地址',
      trigger: 'blur',
    },
  ],
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
    <h4>信用卡/金融卡/銀聯卡</h4>
  </div>
  <el-form
    ref="formDataRef"
    :model="formData"
    :rules="rules"
    status-icon
    hide-required-asterisk
  >
    <el-form-item>
      <el-radio-group v-model="formData.payMethods">
        <el-radio label="payInFull">一次付清</el-radio>
        <el-radio label="payOnInstallment">分期付款</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="信用卡號：" class="rows">
      <div class="creditCardNum">
        <el-form-item label="" prop="creditCardNum1">
          <el-input
            v-model="formData.creditCardNum1"
            maxlength="4"
            class="medianInput"
          />
        </el-form-item>
        -&nbsp;&nbsp;
        <el-form-item label="" prop="creditCardNum2">
          <el-input
            v-model="formData.creditCardNum2"
            maxlength="4"
            class="medianInput"
          />
        </el-form-item>
        -&nbsp;&nbsp;
        <el-form-item label="" prop="creditCardNum3">
          <el-input
            v-model="formData.creditCardNum3"
            maxlength="4"
            class="medianInput"
          />
        </el-form-item>
        -&nbsp;&nbsp;
        <el-form-item label="" prop="creditCardNum4">
          <el-input
            v-model="formData.creditCardNum4"
            maxlength="4"
            class="medianInput"
          />
        </el-form-item>
        <img src="../assets/img/visa.svg" alt="visa" />
        <img src="../assets/img/mastercard.svg" alt="mastercard" />
        <img src="../assets/img/jcb.svg" alt="jcb" />
      </div>
    </el-form-item>
    <el-form-item label="有效年月：" class="rows">
      <el-form-item label="" prop="month">
        <el-input v-model="formData.month" maxlength="2" class="medianInput" />
      </el-form-item>
      &nbsp;/&nbsp;&nbsp;
      <el-form-item label="" prop="year">
        <el-input v-model="formData.year" maxlength="4" class="medianInput" />年
      </el-form-item>
    </el-form-item>
    <el-form-item label="背後末三碼：" prop="backThree" class="rows">
      <div class="backNum">
        <el-input
          v-model="formData.backThree"
          maxlength="3"
          class="medianInput"
        />
        <img src="../assets/img/back-three.svg" alt="背後末三碼" />
      </div>
    </el-form-item>
    <el-form-item label="填寫付款人信箱：" prop="email" class="rows">
      <el-input
        v-model.trim="formData.email"
        maxlength="255"
        class="largeInput"
      />
    </el-form-item>
    <el-form-item label="" prop="check">
      <el-checkbox
        label="請再次確認「訂單資訊」與「付款資訊」付款完成後將發送通知信至您的Email信箱"
        v-model="formData.check"
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
        title="下一步"
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

.rows {
  display: block;

  .creditCardNum {
    display: flex;
    align-items: center;

    img {
      width: 40px;
      height: 25px;
    }
  }

  .medianInput {
    width: 90px;
    height: 35px;
    margin: 0 10px 0 0;
  }

  .backNum {
    display: flex;
    align-items: center;

    img {
      width: 40px;
      height: 25px;
    }
  }
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
