import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

export const usePaymentStore = defineStore('payment', () => {
  const stepPercentage = ref(33)

  return {
    stepPercentage,
  }
})
