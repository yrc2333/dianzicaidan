<script lang="ts" setup>
definePage({
  style: {
    navigationBarTitleText: '我的',
  },
})

const features = [
  {
    icon: '🍳',
    title: '浏览食谱',
    description: '查看各种美味食谱，按分类快速找到心仪菜品',
  },
  {
    icon: '❤️',
    title: '心愿单',
    description: '将喜欢的菜品添加到心愿单，方便随时查看',
  },
  {
    icon: '🥗',
    title: '食材清单',
    description: '查看菜品所需食材，提前准备烹饪材料',
  },
]

const steps = [
  {
    step: '1',
    title: '浏览食谱',
    content: '在食谱页面浏览各种菜品，按分类查找自己喜欢的菜品',
  },
  {
    step: '2',
    title: '添加到心愿单',
    content: '点击菜品卡片，将喜欢的菜品添加到心愿单中',
  },
  {
    step: '3',
    title: '查看食材',
    content: '在食材页面查看菜品所需的食材清单，准备烹饪',
  },
]
</script>

<template>
  <view class="min-h-screen bg-[#fdfbf7]">
    <!-- 用户信息卡片 -->
    <view class="card-hand hard-shadow-sm rotate-hover mx-4 mt-6 mb-6 bg-white p-6" :style="{ '--rotate-deg': `${Math.random() * 2 - 1}deg` }">
      <view class="flex items-center">
        <view class="wobbly-border hard-shadow-sm mr-4 flex h-20 w-20 items-center justify-center bg-[#ff4d4d]">
          <text class="text-4xl">👤</text>
        </view>
        <view>
          <text class="font-hand-heading block text-2xl">欢迎使用</text>
          <text class="font-hand-body mt-1 block text-sm text-gray-600">电子菜单小程序</text>
        </view>
      </view>
    </view>

    <!-- 应用介绍 -->
    <view class="card-hand hard-shadow-sm rotate-hover mx-4 mb-6 bg-white p-6" :style="{ '--rotate-deg': `${Math.random() * 2 - 1}deg` }">
      <view class="tack-decoration" />
      <text class="font-hand-heading mb-4 block text-xl">关于应用</text>
      <text class="font-hand-body text-base leading-relaxed text-gray-700">
        这是一款手绘风格的电子菜单小程序，帮助您轻松浏览和管理喜欢的菜品。您可以查看各种美味食谱，将心仪的菜品添加到心愿单，并了解所需的食材清单。
      </text>
    </view>

    <!-- 功能介绍 -->
    <view class="mx-4 mb-6">
      <text class="font-hand-heading mb-4 block text-xl">核心功能</text>
      <view class="space-y-4">
        <view
          v-for="(feature, index) in features"
          :key="index"
          class="card-hand hard-shadow-sm rotate-hover bg-white p-4"
          :style="{ '--rotate-deg': `${Math.random() * 2 - 1}deg` }"
        >
          <view class="flex items-start">
            <view class="wobbly-border hard-shadow-sm mr-4 flex h-14 w-14 items-center justify-center bg-[#fdfbf7]">
              <text class="text-3xl">{{ feature.icon }}</text>
            </view>
            <view class="flex-1">
              <text class="font-hand-heading block text-lg">{{ feature.title }}</text>
              <text class="font-hand-body mt-1 block text-sm text-gray-600">{{ feature.description }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 使用步骤 -->
    <view class="card-hand hard-shadow-sm rotate-hover mx-4 mb-6 bg-white p-6" :style="{ '--rotate-deg': `${Math.random() * 2 - 1}deg` }">
      <view class="tack-decoration" />
      <text class="font-hand-heading mb-6 block text-xl">使用步骤</text>
      <view class="space-y-6">
        <view
          v-for="(step, index) in steps"
          :key="index"
          class="flex items-start"
        >
          <view class="wobbly-border hard-shadow-sm mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center bg-[#ff4d4d]">
            <text class="font-hand-heading text-lg text-white">{{ step.step }}</text>
          </view>
          <view class="flex-1">
            <text class="font-hand-heading block text-lg">{{ step.title }}</text>
            <text class="font-hand-body mt-1 block text-sm text-gray-600">{{ step.content }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 温馨提示 -->
    <view class="card-hand hard-shadow-sm rotate-hover mx-4 mb-6 bg-white p-6" :style="{ '--rotate-deg': `${Math.random() * 2 - 1}deg` }">
      <view class="tack-decoration" />
      <text class="font-hand-heading mb-4 block text-xl">温馨提示</text>
      <view class="font-hand-body space-y-2 text-base text-gray-700">
        <text class="block">• 心愿单中的菜品可以随时调整数量或删除</text>
        <text class="block">• 食材清单可以帮助您提前准备烹饪材料</text>
        <text class="block">• 所有数据仅保存在本地，请勿清除应用数据</text>
      </view>
    </view>

    <!-- 版本信息 -->
    <view class="pb-8 text-center">
      <text class="font-hand-body text-sm text-gray-500">版本 1.0.0</text>
    </view>
  </view>
</template>
