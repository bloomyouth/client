
<template>
    <el-image :src="require('C:/Users/wql/Desktop/background/332795.png')" style="height: 545px;width: 100%"></el-image>
    <div style="position:absolute;right:50px;top:120px;width: 300px;padding: 15px;background-color: aliceblue">
      <el-form label-position="left" label-width="80px" :model="user">
        <el-form-item label="您的身份">
          <el-radio-group v-model="type" size="mini">
            <el-radio-button label="用户"></el-radio-button>
            <el-radio-button label="管理员"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="user.password" type="password"></el-input>
        </el-form-item>
        <el-row>
          <el-button type="primary" @click="login" style="margin-left: 90px" size="mini">登录</el-button>
          <el-button type="primary" @click="register" size="mini">注册</el-button>
        </el-row>

      </el-form>
  </div>



</template>

<script>
import axios from "axios";
import {ElMessage} from "element-plus";
import pic from '@/assets/104245.jpg';


export default {
  data() {
    return {
      user:{
        username: '',
        password: ''
      },
      type: '用户',

    };
  },
  methods:{
    login(){
      let url="";
      let target="";
      if(this.type=="用户") {   //判断登录类型
        url="api/login/user";
        target="/home";  //跳转到用户界面
      }
      else {
        url="api/login/manager";
        target="/home";   //跳转到管理员界面
      }

      axios.post(url,this.user)
           .then(res => {
             ElMessage(res.data)
                console.log(res.data);
                if(res.data==='登录成功'){
                  // localStorage.setItem("login","true");
                  //sessionStorage会以(key,value)的形式保存一组数据，当页面关闭或手动clear后，清除数据
                  sessionStorage.setItem("username",this.user.username);//将登陆账户名保存，即为已登录
                  this.$router.push({   //页面跳转到target路由
                    path:target
                  })
                }
              })
              .catch(function (error) { // 请求失败处理
                console.log("失败")
              })
    //
    }
  }
}
</script>


<style>
.back{
  background-image:url("../assets/104245.jpg") ;

}
</style>
