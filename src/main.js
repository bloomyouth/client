import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus, {ElMessage} from 'element-plus'
import 'element-plus/dist/index.css'



createApp(App).use(store).use(router).use(ElementPlus).mount('#app')

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    const type = to.meta.type
    // 判断该路由是否需要登录权限
    if (type === 'login') {
        if (sessionStorage.getItem('username')) {   //判断是否登录过
            next()
        } else {
            // alert("请先登录")
            ElMessage("请先登录")
            next('/')  //未登录则直接跳转到登录界面，防止未登录直接请求数据
        }
    } else {
        next()  // 确保一定要有next()被调用
    }
})
