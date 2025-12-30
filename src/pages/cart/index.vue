<script lang="ts" setup>
import type { CartItem } from '@/types/food'
import { computed } from 'vue'
import { useCartStore } from '@/store'

// 页面配置
definePage({
  navigationBarTitleText: '心愿单',
})

const cartStore = useCartStore()

// 更新购物车项数量
function updateQuantity(item: CartItem, quantity: number) {
  if (quantity <= 0) {
    // 确认删除
    uni.showModal({
      title: '确认删除',
      content: '确定要从心愿单中删除该菜品吗？',
      success: (res) => {
        if (res.confirm) {
          cartStore.removeFromCart(item.food.id)
          uni.showToast({
            title: '已删除',
            icon: 'success',
            duration: 1000,
          })
        }
      },
    })
  }
  else {
    cartStore.updateQuantity(item.food.id, quantity)
  }
}

// 切换选中状态
function toggleSelect(item: CartItem) {
  cartStore.toggleSelect(item.food.id)
}

// 全选/取消全选
function toggleSelectAll() {
  cartStore.toggleSelectAll()
}

// 清空购物车
function clearCart() {
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

// 跳转到确认订单页面
function goToConfirm() {
  if (cartStore.items.length === 0) {
    uni.showToast({
      title: '购物车为空',
      icon: 'none',
      duration: 1000,
    })
    return
  }

  if (cartStore.items.filter(item => item.selected).length === 0) {
    uni.showToast({
      title: '请选择要结算的菜品',
      icon: 'none',
      duration: 1000,
    })
    return
  }

  uni.navigateTo({
    url: '/pages/confirm/index',
  })
}

// 计算全选状态
const isAllSelected = computed(() => {
  return cartStore.items.length > 0 && cartStore.items.every(item => item.selected)
})

// 计算选中的总金额
const selectedTotalAmount = computed(() => {
  return cartStore.items
    .filter(item => item.selected)
    .reduce((total, item) => total + item.food.price * item.quantity, 0)
    .toFixed(2)
})

// 计算选中的总数量
const selectedTotalQuantity = computed(() => {
  return cartStore.items
    .filter(item => item.selected)
    .reduce((total, item) => total + item.quantity, 0)
})
</script>

<template>
  <view class="h-screen flex flex-col bg-[#fdfbf7]">
    <!-- 购物车列表 -->
    <view class="flex-1 overflow-y-auto p-4">
      <!-- 空购物车状态 -->
      <view v-if="cartStore.items.length === 0" class="h-full flex flex-col items-center justify-center">
        <image src="/static/logo.svg" alt="空购物车" class="rotate-random mb-6 h-32 w-32 opacity-40" :style="{ '--rotate-deg': `${Math.random() * 6 - 3}deg` }" />
        <text class="font-hand-body mb-8 text-lg text-gray-600">购物车是空的，快去点菜吧！</text>
        <button
          class="btn-hand-lg hard-shadow"
          @click="uni.switchTab({ url: '/pages/menu/index' })"
        >
          去点菜
        </button>
      </view>

      <!-- 购物车有内容时 -->
      <view v-else class="space-y-4">
        <!-- 全选和清空 -->
        <view class="card-hand hard-shadow-sm rotate-hover bg-white p-4" :style="{ '--rotate-deg': `${Math.random() * 2 - 1}deg` }">
          <view class="flex items-center justify-between">
            <view class="flex items-center">
              <view
                class="checkbox-hand mr-3" :class="[{ checked: isAllSelected }]"
                @click="toggleSelectAll"
              />
              <text class="font-hand-body text-base">全选</text>
            </view>
            <button
              class="btn-hand-sm btn-hand-secondary hard-shadow-sm"
              @click="clearCart"
            >
              清空购物车
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
            <!-- 选择框 -->
            <view
              class="checkbox-hand mr-3 mt-1" :class="[{ checked: item.selected }]"
              @click="toggleSelect(item)"
            />

            <!-- 菜品信息 -->
            <image :src="item.food.image" :alt="item.food.name" class="wobbly-border mr-4 h-20 w-20 object-cover" />

            <view class="flex-1">
              <view class="flex items-start justify-between">
                <text class="font-hand-heading text-lg">{{ item.food.name }}</text>
                <text class="font-hand-heading text-lg text-[#ff4d4d]">¥{{ item.food.price.toFixed(2) }}</text>
              </view>
              <text class="font-hand-body line-clamp-1 mt-1 block text-sm text-gray-600">{{ item.food.description }}</text>

              <!-- 数量控制 -->
              <view class="mt-4 flex items-center justify-between">
                <view class="wobbly-border hard-shadow-sm flex items-center bg-[#fdfbf7] p-2">
                  <button
                    class="btn-hand-mini h-10 w-10 flex items-center justify-center transition-all active:translate-x-1 active:translate-y-1"
                    @click="updateQuantity(item, item.quantity - 1)"
                  >
                    -
                  </button>
                  <view class="font-hand-body h-10 w-12 flex items-center justify-center border-x-2 border-[#2d2d2d] px-2">
                    {{ item.quantity }}
                  </view>
                  <button
                    class="btn-hand-mini h-10 w-10 flex items-center justify-center transition-all active:translate-x-1 active:translate-y-1"
                    @click="updateQuantity(item, item.quantity + 1)"
                  >
                    +
                  </button>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部结算栏 -->
    <view v-if="cartStore.items.length > 0" class="wobbly-border-t hard-shadow fixed bottom-0 left-0 right-0 bg-white p-4">
      <view class="flex items-center justify-between">
        <view class="font-hand-body">
          <text class="text-base">合计：</text>
          <text class="font-hand-heading text-2xl text-[#ff4d4d]">¥{{ selectedTotalAmount }}</text>
          <text class="ml-2 text-base">({{ selectedTotalQuantity }}件)</text>
        </view>
        <button
          class="btn-hand-lg"
          :class="selectedTotalQuantity === 0 ? 'opacity-50 cursor-not-allowed' : ''"
          :disabled="selectedTotalQuantity === 0"
          @click="goToConfirm"
        >
          结算
        </button>
      </view>
    </view>
  </view>
</template>
