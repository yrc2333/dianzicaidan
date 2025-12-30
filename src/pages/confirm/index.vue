<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useCartStore } from '@/store'

// 页面配置
definePage({
  navigationBarTitleText: '确认订单',
})

const cartStore = useCartStore()

// 备注信息
const remark = ref('')

// 收货地址（模拟数据）
const address = ref({
  name: '张三',
  phone: '13800138000',
  address: '北京市朝阳区建国路88号'
})

// 计算选中的购物车项
const selectedItems = computed(() => {
  return cartStore.items.filter(item => item.selected)
})

// 计算总金额
const totalAmount = computed(() => {
  return selectedItems.value.reduce((total, item) => {
    return total + item.food.price * item.quantity
  }, 0)
})

// 计算总数量
const totalQuantity = computed(() => {
  return selectedItems.value.reduce((total, item) => {
    return total + item.quantity
  }, 0)
})

// 提交订单
const submitOrder = () => {
  if (selectedItems.value.length === 0) {
    uni.showToast({
      title: '请选择商品',
      icon: 'none',
      duration: 1000
    })
    return
  }
  
  // 模拟提交订单
  uni.showLoading({
    title: '提交中...'
  })
  
  setTimeout(() => {
    uni.hideLoading()
    
    // 清空购物车中的已选择商品
    selectedItems.value.forEach(item => {
      cartStore.removeFromCart(item.food.id)
    })
    
    uni.showToast({
      title: '订单提交成功',
      icon: 'success',
      duration: 1500
    })
    
    // 返回首页
    setTimeout(() => {
      uni.navigateBack({
        delta: 1
      })
    }, 1500)
  }, 1500)
}
</script>

<template>
  <view class="bg-gray-50 min-h-screen">
    <!-- 收货地址 -->
    <view class="bg-white p-4 mb-4">
      <view class="flex justify-between items-start">
        <view>
          <view class="flex items-center">
            <text class="font-medium mr-3">{{ address.name }}</text>
            <text class="text-sm">{{ address.phone }}</text>
          </view>
          <view class="mt-2 text-sm text-gray-600">
            {{ address.address }}
          </view>
        </view>
        <text class="text-gray-400">›</text>
      </view>
    </view>

    <!-- 商品列表 -->
    <view class="bg-white p-4 mb-4">
      <view class="mb-4">
        <text class="font-medium">商品信息</text>
      </view>
      <view 
        v-for="item in selectedItems" 
        :key="item.food.id"
        class="flex items-center py-3 border-b border-gray-100"
      >
        <image :src="item.food.image" :alt="item.food.name" class="w-20 h-20 object-cover rounded-md mr-4" />
        <view class="flex-1">
          <view class="flex justify-between">
            <text class="font-medium">{{ item.food.name }}</text>
            <text class="text-red-500">¥{{ item.food.price }}</text>
          </view>
          <view class="flex justify-between items-center mt-2">
            <text class="text-sm text-gray-500">数量：{{ item.quantity }}</text>
            <text class="text-red-500 font-bold">¥{{ (item.food.price * item.quantity).toFixed(2) }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 备注 -->
    <view class="bg-white p-4 mb-4">
      <view class="mb-2">
        <text class="font-medium">备注</text>
      </view>
      <textarea 
        v-model="remark"
        class="w-full h-20 border border-gray-200 rounded-md p-3 text-sm"
        placeholder="请输入备注信息"
      ></textarea>
    </view>

    <!-- 底部结算栏 -->
    <view class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
      <view class="flex justify-between items-center">
        <view>
          <text class="text-sm text-gray-500">合计：</text>
          <text class="text-xl font-bold text-red-500">¥{{ totalAmount.toFixed(2) }}</text>
        </view>
        <button 
          class="bg-red-500 text-white px-6 py-2 rounded-full"
          @click="submitOrder"
        >
          提交订单
        </button>
      </view>
    </view>
  </view>
</template>