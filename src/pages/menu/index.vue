<script lang="ts" setup>
import type { Food, FoodCategory } from '@/types/food'
import { computed, onMounted, ref } from 'vue'
import { foodCategories, foods } from '@/mock/food'
import { useCartStore } from '@/store'

// 页面配置
definePage({
  // 使用 type: "home" 属性设置首页
  type: 'home',
  navigationBarTitleText: '点菜',
})

const cartStore = useCartStore()

// 分类和食物数据
const categories = ref<FoodCategory[]>(foodCategories)
const allFoods = ref<Food[]>(foods)

// 当前选中的分类
const selectedCategory = ref<number>(categories.value[0].id)

// 计算当前分类的食物
const currentFoods = computed(() => {
  return allFoods.value.filter(food => food.categoryId === selectedCategory.value)
})

// 选择分类
function selectCategory(categoryId: number) {
  selectedCategory.value = categoryId
}

// 加入购物车
function addToCart(food: Food) {
  cartStore.addToCart(food, 1)
  uni.showToast({
    title: '已加入购物车',
    icon: 'success',
    duration: 1000,
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
  uni.navigateTo({
    url: '/pages/confirm/index',
  })
}

// 跳转到食材页面
function goToIngredients() {
  uni.navigateTo({
    url: '/pages/ingredients/index',
  })
}
</script>

<template>
  <view class="h-screen flex bg-[#fdfbf7]">
    <!-- 分类列表 - 固定定位 -->
    <view class="fixed left-0 top-0 z-10 w-20 overflow-x-hidden overflow-y-auto bg-white" style="height: calc(100vh - 140px);">
      <view
        v-for="category in categories"
        :key="category.id"
        class="rotate-hover flex flex-col cursor-pointer items-center justify-center py-4 transition-all"
        :class="selectedCategory === category.id ? 'bg-white border-l-4 border-[#ff4d4d] hard-shadow-sm' : 'bg-[#fdfbf7]'"
        :style="{ '--rotate-deg': `${Math.random() * 3 - 1.5}deg` }"
        @click="selectCategory(category.id)"
      >
        <text class="mb-1 text-xl">{{ category.icon }}</text>
        <text class="font-hand-body w-full break-words px-1 text-center text-xs">{{ category.name }}</text>
      </view>
    </view>

    <!-- 食物列表 - 可滚动 -->
    <view class="ml-20 flex-1 overflow-y-auto p-4" style="height: calc(100vh - 140px);">
      <view class="grid grid-cols-2 gap-3">
        <view
          v-for="food in currentFoods"
          :key="food.id"
          class="card-hand rotate-hover relative overflow-hidden bg-white"
          :style="{ '--rotate-deg': `${Math.random() * 4 - 2}deg` }"
        >
          <!-- 装饰性胶带 -->
          <view class="tape-decoration" />

          <!-- 食物图片 -->
          <image :src="food.image" :alt="food.name" class="wobbly-border-b h-32 w-full object-cover" />

          <view class="p-3">
            <text class="font-hand-heading block text-sm">{{ food.name }}</text>
            <text class="ml-1 mt-1 text-xs">
              <text v-for="i in food.spicyLevel" :key="i">🌶️</text>
            </text>
            <text class="font-hand-body line-clamp-2 mt-1 block text-xs text-gray-600">{{ food.description }}</text>
            <view class="mt-2 flex items-center justify-between">
              <view
                class="btn-hand-mini h-8 w-8"
                @click="addToCart(food)"
              >
                <view class="i-carbon-add text-16px" />
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 购物车底部栏 -->
    <view class="wobbly-border-t hard-shadow fixed bottom-0 left-0 right-0 bg-white p-4">
      <view class="flex items-center justify-between">
        <view>
          <text class="font-hand-body text-sm">合计：</text>
          <text class="font-hand-heading text-2xl text-[#ff4d4d]">¥{{ cartStore.totalAmount.toFixed(2) }}</text>
          <text class="font-hand-body ml-2 text-sm">({{ cartStore.totalQuantity }}件)</text>
        </view>
        <button
          class="btn-hand-lg"
          :class="cartStore.items.length === 0 ? 'opacity-50 cursor-not-allowed' : ''"
          :disabled="cartStore.items.length === 0"
          @click="goToConfirm"
        >
          提交订单
        </button>
      </view>
    </view>

    <!-- 食材入口按钮 -->
    <view
      class="fixed bottom-24 right-4 z-50"
      @click="goToIngredients"
    >
      <view class="btn-hand-mini h-14 w-14">
        <view class="i-carbon-nutrition text-24px" />
      </view>
      <text class="font-hand-body mt-1 block text-center text-xs text-[#2d2d2d]">食材</text>
    </view>
  </view>
</template>
