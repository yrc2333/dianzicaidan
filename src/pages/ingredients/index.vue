<script lang="ts" setup>
import type { Food } from '@/types/food'
import { onMounted, ref } from 'vue'
import { foods } from '@/mock/food'

// 页面配置
definePage({
  style: {
    navigationBarTitleText: '食材',
  },
})

// 所有食材数据
const allIngredients = ref<string[]>([])

// 按首字母分组的食材
const groupedIngredients = ref<Record<string, string[]>>({})

// 获取所有食材
function fetchAllIngredients() {
  // 从所有食物中提取食材
  const ingredientsSet = new Set<string>()
  foods.forEach((food) => {
    if (food.ingredients) {
      food.ingredients.forEach((ingredient) => {
        ingredientsSet.add(ingredient)
      })
    }
  })

  // 转换为数组并排序
  allIngredients.value = Array.from(ingredientsSet).sort((a, b) => a.localeCompare(b))

  // 按首字母分组
  allIngredients.value.forEach((ingredient) => {
    const firstLetter = ingredient.charAt(0).toUpperCase()
    if (!groupedIngredients.value[firstLetter]) {
      groupedIngredients.value[firstLetter] = []
    }
    groupedIngredients.value[firstLetter].push(ingredient)
  })
}

// 获取包含该食材的食物
function getFoodsByIngredient(ingredient: string): Food[] {
  return foods.filter((food) => {
    return food.ingredients?.includes(ingredient)
  })
}

onMounted(() => {
  fetchAllIngredients()
})
</script>

<template>
  <view class="h-screen flex flex-col bg-[#fdfbf7]">
    <!-- 食材列表 -->
    <view class="flex-1 overflow-y-auto p-4">
      <view
        v-for="(ingredients, letter) in groupedIngredients"
        :key="letter"
        class="card-hand rotate-hover mb-8"
        :style="{ '--rotate-deg': `${Math.random() * 2 - 1}deg` }"
      >
        <!-- 装饰性图钉 -->
        <view class="tack-decoration" style="left: 20px;" />
        <view class="tack-decoration" style="left: calc(100% - 40px);" />

        <!-- 字母标题 -->
        <view class="wobbly-border hard-shadow-sm mb-4 inline-block bg-[#e5e0d8] px-4 py-2">
          <text class="font-hand-heading text-xl">{{ letter }}</text>
        </view>

        <!-- 食材列表 -->
        <view class="space-y-3">
          <view
            v-for="ingredient in ingredients"
            :key="ingredient"
            class="wobbly-border list-item-hand bg-white p-4 hover:bg-[#faf8f2]"
          >
            <view class="flex items-center justify-between">
              <text class="font-hand-body text-lg">{{ ingredient }}</text>
              <view class="flex items-center">
                <text class="font-hand-body mr-2 text-sm text-gray-600">
                  {{ getFoodsByIngredient(ingredient).length }} 道菜
                </text>
                <text class="font-hand-body text-gray-500">›</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
