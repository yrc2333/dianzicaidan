import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Food, CartItem } from '@/types/food'

export const useCartStore = defineStore(
  'cart',
  () => {
    // 定义购物车项
    const items = ref<CartItem[]>([])

    // 计算总价
    const totalAmount = computed(() => {
      return items.value.reduce((total, item) => {
        return total + (item.selected ? item.food.price * item.quantity : 0)
      }, 0)
    })

    // 计算总数量
    const totalQuantity = computed(() => {
      return items.value.reduce((total, item) => {
        return total + (item.selected ? item.quantity : 0)
      }, 0)
    })

    // 添加到购物车
    const addToCart = (food: Food, quantity: number = 1) => {
      const existingItem = items.value.find(item => item.food.id === food.id)
      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        items.value.push({
          food,
          quantity,
          selected: true
        })
      }
    }

    // 更新购物车项数量
    const updateQuantity = (foodId: number, quantity: number) => {
      const item = items.value.find(item => item.food.id === foodId)
      if (item) {
        if (quantity <= 0) {
          removeFromCart(foodId)
        } else {
          item.quantity = quantity
        }
      }
    }

    // 从购物车移除
    const removeFromCart = (foodId: number) => {
      const index = items.value.findIndex(item => item.food.id === foodId)
      if (index !== -1) {
        items.value.splice(index, 1)
      }
    }

    // 切换选中状态
    const toggleSelect = (foodId: number) => {
      const item = items.value.find(item => item.food.id === foodId)
      if (item) {
        item.selected = !item.selected
      }
    }

    // 全选/取消全选
    const toggleSelectAll = (selected: boolean) => {
      items.value.forEach(item => {
        item.selected = selected
      })
    }

    // 清空购物车
    const clearCart = () => {
      items.value = []
    }

    return {
      items,
      totalAmount,
      totalQuantity,
      addToCart,
      updateQuantity,
      removeFromCart,
      toggleSelect,
      toggleSelectAll,
      clearCart
    }
  },
  {
    persist: true
  }
)