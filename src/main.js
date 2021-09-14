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

Date.prototype.format = function(fmt){
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };

    if(/(y+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }

    for(var k in o){
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(
                RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }

    return fmt;
}
