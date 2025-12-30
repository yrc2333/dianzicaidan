<script setup lang="ts">
import type { CustomTabBarItem } from './types'
import { customTabbarEnable, needHideNativeTabbar, tabbarCacheEnable } from './config'
import { tabbarList, tabbarStore } from './store'

// #ifdef MP-WEIXIN
defineOptions({
  virtualHost: true,
})
// #endif

function handleClick(index: number) {
  if (index === tabbarStore.curIdx) {
    return
  }
  const url = tabbarList[index].pagePath
  tabbarStore.setCurIdx(index)
  if (tabbarCacheEnable) {
    uni.switchTab({ url })
  }
  else {
    uni.navigateTo({ url })
  }
}

// #ifndef MP-WEIXIN || MP-ALIPAY
onLoad(() => {
  needHideNativeTabbar
  && uni.hideTabBar({
    fail(err) {
      console.log('hideTabBar fail: ', err)
    },
    success(res) {
    },
  })
})
// #endif

// #ifdef MP-ALIPAY
onMounted(() => {
  customTabbarEnable
  && uni.hideTabBar({
    fail(err) {
      console.log('hideTabBar fail: ', err)
    },
    success(res) {
    },
  })
})
// #endif

const activeColor = '#ff4d4d'
const inactiveColor = '#2d2d2d'

function getColorByIndex(index: number) {
  return tabbarStore.curIdx === index ? activeColor : inactiveColor
}

function getBgColorByIndex(index: number) {
  return tabbarStore.curIdx === index ? '#fff9c4' : '#ffffff'
}
</script>

<template>
  <view v-if="customTabbarEnable" class="h-60px pb-safe">
    <view class="hand-tabbar" @touchmove.stop.prevent>
      <view class="hand-tabbar-content">
        <view
          v-for="(item, index) in tabbarList" :key="index"
          class="hand-tabbar-item"
          :style="{ backgroundColor: getBgColorByIndex(index), color: getColorByIndex(index) }"
          @click="handleClick(index)"
        >
          <view class="item-inner">
            <template v-if="item.iconType === 'unocss' || item.iconType === 'iconfont'">
              <view :class="item.icon" class="item-icon" />
            </template>
            <template v-if="item.iconType === 'image'">
              <image :src="item.icon" mode="scaleToFill" class="item-icon-img" />
            </template>
            <view class="item-text">
              {{ item.text }}
            </view>
            <view v-if="item.badge" class="item-badge">
              <template v-if="item.badge === 'dot'">
                <view class="badge-dot" />
              </template>
              <template v-else>
                <view class="badge-count">
                  {{ item.badge > 99 ? '99+' : item.badge }}
                </view>
              </template>
            </view>
          </view>
        </view>
      </view>
      <view class="pb-safe" />
    </view>
  </view>
</template>

<style scoped lang="scss">
.hand-tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 8px 12px;
  background: #fdfbf7;
  background-image: radial-gradient(#e5e0d8 1px, transparent 1px);
  background-size: 24px 24px;
  border-top: 3px solid #2d2d2d;
  box-shadow: 0 -4px 0px 0px #2d2d2d;
}

.hand-tabbar-content {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 44px;
}

.hand-tabbar-item {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  border: 3px solid #2d2d2d;
  margin: 0 4px;
  position: relative;
  box-shadow: 3px 3px 0px 0px #2d2d2d;
  transition: all 0.1s ease;
}

.hand-tabbar-item:nth-child(1) {
  border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
}

.hand-tabbar-item:nth-child(2) {
  border-radius: 15px 255px 15px 225px / 225px 15px 255px 15px;
}

.hand-tabbar-item:nth-child(3) {
  border-radius: 225px 15px 255px 15px / 15px 255px 15px 225px;
}

.hand-tabbar-item:active {
  box-shadow: 1px 1px 0px 0px #2d2d2d;
  transform: translate(2px, 2px);
}

.item-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

.item-icon {
  font-size: 20px;
  line-height: 1;
}

.item-icon-img {
  width: 20px;
  height: 20px;
}

.item-text {
  font-size: 10px;
  margin-top: 2px;
  font-weight: 600;
}

.item-badge {
  position: absolute;
  top: -4px;
  right: -4px;
}

.badge-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ff4d4d;
  border: 2px solid #2d2d2d;
}

.badge-count {
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
  background: #ff4d4d;
  border: 2px solid #2d2d2d;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: #ffffff;
  font-weight: 600;
  box-shadow: 2px 2px 0px 0px #2d2d2d;
}
</style>
