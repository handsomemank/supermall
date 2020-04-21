import Toast from './Toast'
const obj = {}
// 采用手动安装toast插件,在打开页面的同时,vue将插件安装好,
// 当vue安装插件的时候,会自动传入一个参数就是Vue!
// obj.install => 安装的时候采取的方法
// 给vue原型内定义一个模块对象=>就是Toast.vue
obj.install = function(Vue) {
  // 1 创建组件构造器
  const toastContrustor = Vue.extend(Toast)
  // 2 new的方式，根据组件的构造器，创建出来一个组件对象
  const toast = new toastContrustor()
  // 3 将实例挂载到当前页面得div节点下
  toast.$mount(document.createElement('div'))
  // 4 实例被挂载上去了，接着将实例得内容添加进去，添加得内容就是挂载得时候创建得div了
  document.body.appendChild(toast.$el)
  // 5 给vue原型添加得是被挂载得实例
  // 只有实例才能调用它得方法 通过‘.’得方式，要不然获取不到show（）
  Vue.prototype.$toast = toast;
}
// 手动安装toast插件的好处是，在其他多个界面的时候，我想用这个组件，不要重复的import等操作
// 在main.js被渲染的时候，在当前页面就会将Toast组件实例化，将此实例化的内容.$el添加到当前页面下
// 在当前页面下使用该组件的内容和往常一样得有一个个节点div，所以得给当前页面渲染一个新建得div
export default obj