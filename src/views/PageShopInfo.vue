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
  id: '',
  shop: '',
  email: '',
  check: false,
})

const shopList = reactive([
  {
    id: 'Seven',
    name: '統一超商',
  },
  {
    id: 'Family',
    name: '全家超商',
  },
  {
    id: 'hilife',
    name: '萊爾富超商',
  },
  {
    id: 'ok',
    name: 'OK超商',
  },
])

const rules = reactive({
  shop: [{ required: true, message: '不得為空', trigger: 'change' }],
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
  formRef.validate((valid) => {
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
            message: '訂單已成立',
            type: 'success',
          })
          router.push({
            name: 'ShopFinish',
            query: { shopName: formData.shop },
          })
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
    <h4>超商付款</h4>
  </div>
  <el-form
    ref="formDataRef"
    :model="formData"
    :rules="rules"
    status-icon
    hide-required-asterisk
  >
    <el-form-item label="付款超商：" prop="shop" class="row">
      <div>
        <el-select v-model="formData.shop" placeholder="請選擇">
          <el-option
            v-for="shop in shopList"
            :value="shop.name"
            :label="shop.name"
            :key="`select-shop-${shop.id}`"
          />
        </el-select>
      </div>
    </el-form-item>
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
