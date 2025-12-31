<script lang="ts" setup>
import type { Food, FoodCategory } from '@/types/food'
import { computed, onMounted, ref } from 'vue'
import IngredientsDrawer from '@/components/IngredientsDrawer.vue'
import { foodCategories, foods } from '@/mock/food'
import { useCartStore } from '@/store'

// 页面配置
definePage({
  // 使用 type: "home" 属性设置首页
  type: 'home',
  style: {
    navigationBarTitleText: '点菜',
  },
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

// 检查菜品是否已添加到心愿单
function isFoodInWishlist(foodId: number) {
  return cartStore.items.some(item => item.food.id === foodId)
}

// 加入心愿单
function addToCart(food: Food) {
  cartStore.addToCart(food, 1)
  uni.showToast({
    title: '已添加至心愿单',
    icon: 'success',
    duration: 1000,
  })
}

// 食材抽屉状态
const showIngredientsDrawer = ref(false)

// 关闭食材抽屉
function closeIngredientsDrawer() {
  showIngredientsDrawer.value = false
}
</script>

<template>
  <view class="h-screen flex bg-[#fdfbf7]">
    <!-- 分类列表 - 固定定位 -->
    <view class="fixed left-0 top-0 z-10 w-20 overflow-x-hidden overflow-y-auto bg-white" style="height: calc(100vh - 140px);">
      <view
        v-for="category in categories"
        :key="category.id"
        class="flex flex-col cursor-pointer items-center justify-center py-4 transition-all"
        :class="selectedCategory === category.id ? 'bg-white border-l-4 border-[#ff4d4d]' : 'bg-[#fdfbf7]'"
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
          :class="{ 'border-2 border-red-500': isFoodInWishlist(food.id) }"
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

    <!-- 食材入口按钮 -->
    <view
      class="fixed bottom-30 right-4 z-50"
      @click="showIngredientsDrawer = true"
    >
      <view class="btn-hand-mini h-14 w-14">
        <view class="i-carbon-nutrition text-24px" />
      </view>
    </view>

    <!-- 食材抽屉组件 -->
    <IngredientsDrawer
      :show="showIngredientsDrawer"
      @close="closeIngredientsDrawer"
    />
  </view>
</template>
