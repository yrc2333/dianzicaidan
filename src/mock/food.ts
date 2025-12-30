import type { Food, FoodCategory } from '@/types/food'

// 食物分类数据
export const foodCategories: FoodCategory[] = [
  { id: 1, name: '招牌菜', icon: '🍽️' },
  { id: 2, name: '热菜', icon: '🔥' },
  { id: 3, name: '凉菜', icon: '❄️' },
  { id: 4, name: '汤品', icon: '🍲' },
  { id: 5, name: '主食', icon: '🍚' },
  { id: 6, name: '饮品', icon: '🥤' }
]

// 食物数据
export const foods: Food[] = [
  {
    id: 1,
    name: '宫保鸡丁',
    price: 38,
    description: '经典川菜，鸡肉鲜嫩，花生香脆',
    image: '/static/logo.svg',
    categoryId: 1,
    ingredients: ['鸡肉', '花生', '青椒', '干辣椒'],
    spicyLevel: 3,
    isPopular: true,
    isRecommend: true
  },
  {
    id: 2,
    name: '鱼香肉丝',
    price: 32,
    description: '酸甜可口，开胃下饭',
    image: '/static/logo.svg',
    categoryId: 1,
    ingredients: ['猪肉', '木耳', '胡萝卜', '青椒'],
    spicyLevel: 2,
    isPopular: true
  },
  {
    id: 3,
    name: '麻辣香锅',
    price: 68,
    description: '麻辣鲜香，回味无穷',
    image: '/static/logo.svg',
    categoryId: 2,
    ingredients: ['牛肉', '虾', '土豆', '豆皮'],
    spicyLevel: 4,
    isPopular: true
  },
  {
    id: 4,
    name: '红烧肉',
    price: 45,
    description: '肥而不腻，入口即化',
    image: '/static/logo.svg',
    categoryId: 2,
    ingredients: ['五花肉', '酱油', '冰糖'],
    spicyLevel: 0
  },
  {
    id: 5,
    name: '拍黄瓜',
    price: 16,
    description: '清爽可口，解腻神器',
    image: '/static/logo.svg',
    categoryId: 3,
    ingredients: ['黄瓜', '蒜', '醋', '香油'],
    spicyLevel: 1
  },
  {
    id: 6,
    name: '凉拌木耳',
    price: 18,
    description: '健康营养，口感爽脆',
    image: '/static/logo.svg',
    categoryId: 3,
    ingredients: ['木耳', '葱', '姜', '蒜'],
    spicyLevel: 2
  },
  {
    id: 7,
    name: '番茄鸡蛋汤',
    price: 22,
    description: '酸甜开胃，营养丰富',
    image: '/static/logo.svg',
    categoryId: 4,
    ingredients: ['番茄', '鸡蛋', '葱花'],
    spicyLevel: 0,
    isRecommend: true
  },
  {
    id: 8,
    name: '酸辣汤',
    price: 24,
    description: '酸辣可口，暖身暖心',
    image: '/static/logo.svg',
    categoryId: 4,
    ingredients: ['豆腐', '木耳', '鸡蛋', '醋'],
    spicyLevel: 3
  },
  {
    id: 9,
    name: '白米饭',
    price: 3,
    description: '香喷喷的白米饭',
    image: '/static/logo.svg',
    categoryId: 5,
    ingredients: ['大米'],
    spicyLevel: 0
  },
  {
    id: 10,
    name: '担担面',
    price: 18,
    description: '四川特色面食',
    image: '/static/logo.svg',
    categoryId: 5,
    ingredients: ['面条', '猪肉末', '辣椒油'],
    spicyLevel: 4
  },
  {
    id: 11,
    name: '可乐',
    price: 8,
    description: '冰爽可口的可乐',
    image: '/static/logo.svg',
    categoryId: 6,
    ingredients: ['可乐'],
    spicyLevel: 0
  },
  {
    id: 12,
    name: '雪碧',
    price: 8,
    description: '清爽的雪碧',
    image: '/static/logo.svg',
    categoryId: 6,
    ingredients: ['雪碧'],
    spicyLevel: 0
  }
]