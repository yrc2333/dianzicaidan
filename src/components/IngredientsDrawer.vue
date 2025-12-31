<script lang="ts" setup>
import type { Food } from '@/types/food'
import { computed, ref, watch } from 'vue'
import { foods } from '@/mock/food'

// 组件属性
interface Props {
  show: boolean
}

const props = withDefaults(defineProps<Props>(), {
  show: false,
})

const emit = defineEmits<{
  (e: 'close'): void
}>()

// 抽屉动画状态
const drawerClass = computed(() => {
  return props.show ? 'translate-y-0' : '-translate-y-full'
})

// 蒙层透明度
const overlayOpacity = computed(() => {
  return props.show ? 'opacity-50' : 'opacity-0'
})

// 关闭抽屉
function closeDrawer() {
  emit('close')
}

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

// 模拟用户已有食材（实际项目中应从后端或本地存储获取）
const userIngredients = ref<string[]>([
  '鸡肉',
  '鸡蛋',
  '番茄',
  '黄瓜',
  '木耳',
  '胡萝卜',
  '大米',
])

// 获取包含该食材的食物
function getFoodsByIngredient(ingredient: string): Food[] {
  return foods.filter((food) => {
    return food.ingredients?.includes(ingredient)
  })
}

// 初始化食材数据
fetchAllIngredients()
</script>

<template>
  <!-- 蒙层 -->
  <view
    v-show="show"
    class="fixed inset-0 z-1100 bg-black transition-opacity duration-300"
    :class="overlayOpacity"
    @click="closeDrawer"
  />

  <!-- 抽屉内容 -->
  <view
    v-show="show"
    class="cubic-bezier(0.34, 1.56, 0.64, 1) fixed left-0 right-0 top-0 z-1100 h-[60vh] flex flex-col transform rounded-b-2xl bg-[#fdfbf7] shadow-2xl transition-transform duration-300"
    :class="drawerClass"
    style="top: 0; left: 0; right: 0;"
  >
    <!-- 抽屉头部 -->
    <view class="border-b-2 border-[#e5e0d8] p-4">
      <view class="flex items-center justify-between">
        <text class="font-hand-heading text-xl">我的食材</text>
        <view class="h-8 w-8 flex items-center justify-center" @click="closeDrawer">
          <view class="i-carbon-close text-20px" />
        </view>
      </view>
      <text class="font-hand-body mt-1 block text-sm text-gray-600">
        已拥有 {{ userIngredients.length }} 种食材
      </text>
    </view>

    <!-- 食材列表 -->
    <view class="flex-1 overflow-y-auto p-4">
      <view
        v-for="(ingredients, letter) in groupedIngredients"
        :key="letter"
        class="mb-8"
      >
        <!-- 字母标题 -->
        <view class="mb-4 inline-block bg-[#e5e0d8] px-4 py-2">
          <text class="font-hand-heading text-lg">{{ letter }}</text>
        </view>

        <!-- 食材列表 -->
        <view class="space-y-2">
          <view
            v-for="ingredient in ingredients"
            :key="ingredient"
            class="border rounded-lg bg-white p-3 transition-colors hover:bg-[#faf8f2]"
          >
            <view class="flex items-center justify-between">
              <text class="font-hand-body text-base">{{ ingredient }}</text>
              <view
                class="h-6 w-6 flex items-center justify-center rounded-full"
                :class="userIngredients.includes(ingredient) ? 'bg-green-100' : 'bg-gray-100'"
              >
                <view
                  v-if="userIngredients.includes(ingredient)"
                  class="i-carbon-checkmark text-14px text-green-600"
                />
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
