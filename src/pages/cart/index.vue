<script lang="ts" setup>
import type { CartItem } from '@/types/food'
import { computed } from 'vue'
import { useCartStore } from '@/store'

// 页面配置
definePage({
  navigationBarTitleText: '心愿单',
})

const cartStore = useCartStore()

// 清空心愿单
function clearWishlist() {
  if (cartStore.items.length === 0)
    return

  uni.showModal({
    title: '确认清空',
    content: '确定要清空心愿单吗？',
    success: (res) => {
      if (res.confirm) {
        cartStore.clearCart()
        uni.showToast({
          title: '已清空',
          icon: 'success',
          duration: 1000,
        })
      }
    },
  })
}
</script>

<template>
  <view class="h-screen flex flex-col bg-[#fdfbf7]">
    <!-- 购物车列表 -->
    <view class="flex-1 overflow-y-auto p-4">
      <!-- 空心愿单状态 -->
      <view v-if="cartStore.items.length === 0" class="h-full flex flex-col items-center justify-center">
        <image src="/static/logo.svg" alt="空心愿单" class="rotate-random mb-6 h-32 w-32 opacity-40" :style="{ '--rotate-deg': `${Math.random() * 6 - 3}deg` }" />
        <text class="font-hand-body mb-8 text-lg text-gray-600">心愿单是空的，快去点菜吧！</text>
        <button
          class="btn-hand-lg hard-shadow"
          @click="uni.switchTab({ url: '/pages/menu/index' })"
        >
          去点菜
        </button>
      </view>

      <!-- 购物车有内容时 -->
      <view v-else class="space-y-4">
        <!-- 清空心愿单 -->
        <view class="card-hand hard-shadow-sm rotate-hover bg-white p-4" :style="{ '--rotate-deg': `${Math.random() * 2 - 1}deg` }">
          <view class="flex items-center justify-end">
            <button
              class="btn-hand-sm btn-hand-secondary hard-shadow-sm"
              @click="clearWishlist"
            >
              清空心愿单
            </button>
          </view>
        </view>

        <!-- 购物车项列表 -->
        <view
          v-for="item in cartStore.items"
          :key="item.food.id"
          class="card-hand rotate-hover relative bg-white p-4"
          :style="{ '--rotate-deg': `${Math.random() * 3 - 1.5}deg` }"
        >
          <!-- 装饰性图钉 -->
          <view class="tack-decoration" />

          <view class="flex items-start">
            <!-- 菜品信息 -->
            <image :src="item.food.image" :alt="item.food.name" class="wobbly-border mr-4 h-20 w-20 object-cover" />

            <view class="flex-1">
              <text class="font-hand-heading text-lg">{{ item.food.name }}</text>
              <text class="font-hand-body line-clamp-2 mt-1 block text-sm text-gray-600">{{ item.food.description }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
