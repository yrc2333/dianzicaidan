<script setup lang="ts">
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app'
import { navigateToInterceptor } from '@/router/interceptor'

onLaunch((options) => {
  console.log('App.vue onLaunch', options)
})
onShow((options) => {
  console.log('App.vue onShow', options)
  // 处理直接进入页面路由的情况：如h5直接输入路由、微信小程序分享后进入等
  // https://github.com/unibest-tech/unibest/issues/192
  if (options?.path) {
    navigateToInterceptor.invoke({ url: `/${options.path}`, query: options.query })
  }
  else {
    navigateToInterceptor.invoke({ url: '/' })
  }
})
onHide(() => {
  console.log('App Hide')
})
</script>

<style lang="scss">
/* 全局手绘风格样式 */
/* 微信小程序不支持外部字体导入，使用系统默认字体 */

/* 确保页面在所有平台上都有一致的背景 */
page,
body {
  font-family: 'Patrick Hand', cursive;
  background-color: #fdfbf7;
  background-image: radial-gradient(#e5e0d8 1px, transparent 1px);
  background-size: 24px 24px;
  color: #2d2d2d;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 自定义字体类 */
.font-hand-heading {
  font-family: 'Kalam', cursive;
  font-weight: 700;
}

.font-hand-body {
  font-family: 'Patrick Hand', cursive;
}

/* 手绘边框和阴影工具类 */
.wobbly-border {
  border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
  border: 2px solid #2d2d2d;
}

.wobbly-border-lg {
  border-radius: 300px 20px 350px 25px / 25px 300px 20px 300px;
  border: 3px solid #2d2d2d;
}

.wobbly-border-t {
  border-top: 2px solid #2d2d2d;
  border-radius: 255px 15px 0 0 / 15px 225px 0 0;
}

.wobbly-border-b {
  border-bottom: 2px solid #2d2d2d;
  border-radius: 0 0 225px 15px / 0 0 15px 255px;
}

.wobbly-border-l {
  border-left: 2px solid #2d2d2d;
  border-radius: 255px 0 0 15px / 15px 0 0 225px;
}

.wobbly-border-r {
  border-right: 2px solid #2d2d2d;
  border-radius: 0 15px 225px 0 / 0 225px 15px 0;
}

.hard-shadow {
  box-shadow: 4px 4px 0px 0px #2d2d2d;
}

.hard-shadow-lg {
  box-shadow: 8px 8px 0px 0px #2d2d2d;
}

.hard-shadow-sm {
  box-shadow: 2px 2px 0px 0px #2d2d2d;
}

/* 手绘按钮样式 */
.btn-hand {
  font-family: 'Patrick Hand', cursive;
  background-color: white;
  color: #2d2d2d;
  border: 3px solid #2d2d2d;
  border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
  box-shadow: 4px 4px 0px 0px #2d2d2d;
  transition: all 0.1s ease;
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
}

.btn-hand:hover {
  background-color: #ff4d4d;
  color: white;
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0px 0px #2d2d2d;
}

.btn-hand:active {
  transform: translate(4px, 4px);
  box-shadow: none;
}

.btn-hand-secondary {
  background-color: #e5e0d8;
  color: #2d2d2d;
}

.btn-hand-secondary:hover {
  background-color: #2d5da1;
  color: white;
}

.btn-hand-sm {
  padding: 4px 12px;
  font-size: 14px;
  border-width: 2px;
  box-shadow: 3px 3px 0px 0px #2d2d2d;
}

.btn-hand-lg {
  padding: 12px 24px;
  font-size: 20px;
  border-width: 4px;
  box-shadow: 6px 6px 0px 0px #2d2d2d;
}

.btn-hand-mini {
  font-family: 'Patrick Hand', cursive;
  background-color: white;
  color: #2d2d2d;
  border: 2px solid #2d2d2d;
  border-radius: 50px 5px 50px 5px / 5px 50px 5px 50px;
  box-shadow: 3px 3px 0px 0px #2d2d2d;
  transition: all 0.1s ease;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
}

.btn-hand-mini:hover {
  background-color: #ff4d4d;
  color: white;
  transform: translate(1px, 1px);
  box-shadow: 2px 2px 0px 0px #2d2d2d;
}

.btn-hand-mini:active {
  transform: translate(2px, 2px);
  box-shadow: none;
}

/* 卡片样式 */
.card-hand {
  background-color: white;
  border: 2px solid #2d2d2d;
  border-radius: 225px 15px 255px 15px / 15px 255px 15px 225px;
  box-shadow: 3px 3px 0px 0px rgba(45, 45, 45, 0.1);
  padding: 16px;
  position: relative;
}

.card-hand-lg {
  border-width: 3px;
  padding: 24px;
  border-radius: 300px 20px 350px 25px / 25px 300px 20px 300px;
  box-shadow: 6px 6px 0px 0px rgba(45, 45, 45, 0.1);
}

/* 轻微旋转效果 */
.rotate-random {
  transform: rotate(var(--rotate-deg, 0deg));
}

.rotate-hover {
  transition: transform 0.2s ease;
}

.rotate-hover:hover {
  transform: rotate(calc(var(--rotate-deg, 0deg) + 1deg));
}

/* 装饰性元素 */
.tape-decoration {
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%) rotate(5deg);
  width: 80px;
  height: 30px;
  background-color: rgba(200, 200, 200, 0.5);
  border-radius: 5px;
  box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.1);
  z-index: 1;
}

.tape-decoration::before {
  content: '';
  position: absolute;
  top: 5px;
  left: 10px;
  right: 10px;
  bottom: 5px;
  background: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 5px,
    rgba(0, 0, 0, 0.05) 5px,
    rgba(0, 0, 0, 0.05) 10px
  );
}

.tack-decoration {
  position: absolute;
  top: -10px;
  left: 20px;
  width: 20px;
  height: 20px;
  background-color: #ff4d4d;
  border-radius: 50%;
  box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.2);
}

.tack-decoration::before {
  content: '';
  position: absolute;
  top: 5px;
  left: 5px;
  width: 10px;
  height: 10px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 50%;
}

/* 输入框样式 */
.input-hand {
  font-family: 'Patrick Hand', cursive;
  background-color: white;
  border: 2px solid #2d2d2d;
  border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
  padding: 8px 16px;
  font-size: 16px;
  outline: none;
  box-shadow: 2px 2px 0px 0px rgba(45, 45, 45, 0.1);
}

.input-hand:focus {
  border-color: #2d5da1;
  box-shadow: 4px 4px 0px 0px rgba(45, 93, 161, 0.2);
}

/* 复选框样式 */
.checkbox-hand {
  width: 20px;
  height: 20px;
  border: 2px solid #2d2d2d;
  border-radius: 50px 5px 50px 5px / 5px 50px 5px 50px;
  position: relative;
  cursor: pointer;
}

.checkbox-hand.checked::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 16px;
  color: #ff4d4d;
  font-weight: bold;
}

/* 列表项样式 */
.list-item-hand {
  background-color: white;
  border: 2px solid #2d2d2d;
  border-radius: 225px 10px 225px 10px / 10px 225px 10px 225px;
  padding: 12px 16px;
  margin-bottom: 8px;
  box-shadow: 2px 2px 0px 0px rgba(45, 45, 45, 0.1);
  transition: all 0.2s ease;
}

.list-item-hand:hover {
  transform: translateX(2px) translateY(2px);
  box-shadow: 0px 0px 0px 0px rgba(45, 45, 45, 0.2);
}

/* 标题样式 */
.title-hand {
  font-family: 'Kalam', cursive;
  font-weight: 700;
  background-color: #ff4d4d;
  color: white;
  display: inline-block;
  padding: 8px 16px;
  border-radius: 200px 10px 200px 10px / 10px 200px 10px 200px;
  box-shadow: 4px 4px 0px 0px #2d2d2d;
  margin-bottom: 24px;
  transform: rotate(-1deg);
}

/* 标签样式 */
.tag-hand {
  font-family: 'Patrick Hand', cursive;
  background-color: #fff9c4;
  color: #2d2d2d;
  padding: 4px 8px;
  border-radius: 150px 5px 150px 5px / 5px 150px 5px 150px;
  border: 2px solid #2d2d2d;
  box-shadow: 2px 2px 0px 0px #2d2d2d;
  font-size: 14px;
  display: inline-block;
  margin-right: 8px;
  margin-bottom: 8px;
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #fdfbf7;
  border-radius: 100px 5px 100px 5px / 5px 100px 5px 100px;
}

::-webkit-scrollbar-thumb {
  background: #2d2d2d;
  border-radius: 100px 5px 100px 5px / 5px 100px 5px 100px;
}

::-webkit-scrollbar-thumb:hover {
  background: #ff4d4d;
}
</style>
