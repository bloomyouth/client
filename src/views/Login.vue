<template>
  <!--  背景-->
  <el-image :src="require('C:/Users/wql/Desktop/background/332795.png')" style="height: 545px;width: 100%"></el-image>
  <!--  登录表单-->
  <div style="position:absolute;right:50px;top:120px;width: 300px;padding: 15px;background-color: aliceblue">
    <el-form label-position="left" label-width="80px" :model="this.userForm" :rules="loginRules">
      <el-form-item label="您的身份">
        <el-radio-group v-model="type" size="mini">
          <el-radio-button label="用户"></el-radio-button>
          <el-radio-button label="管理员"></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="用户名" prop="username" >
        <el-input v-model="this.userForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="this.userForm.password" type="password"></el-input>
      </el-form-item>
      <el-row>
        <el-button type="primary" @click="login" style="margin-left: 120px" size="mini">登录</el-button>
        <el-button type="primary" @click="dialogFormVisible=true" size="mini">注册</el-button>
      </el-row>

    </el-form>
  </div>

<!--  注册表单-->
  <div>
    <el-dialog title="注册" v-model="dialogFormVisible" top="10px" width="40%">
      <el-form
          :model="registerForm"
          status-icon
          :rules="registerRules"
          ref="registerForm"
          label-width="80px"
          class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model.number="registerForm.username" style="width: 300px;margin-left: -90px"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass" >
          <el-input
              type="password"
              v-model="registerForm.pass"
              autocomplete="off"
              style="width: 300px;margin-left: -90px"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
              type="password"
              v-model="registerForm.checkPass"
              autocomplete="off"
              style="width: 300px;margin-left: -90px"
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model.number="registerForm.name" style="width: 300px;margin-left: -90px"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="telephone">
          <el-input v-model.number="registerForm.telephone" style="width: 300px;margin-left: -90px" placeholder="请输入手机号码"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitRegisterForm('registerForm')" style="margin-left: -100px">提交</el-button>
          <el-button @click="resetRegisterForm('registerForm')" style="margin-left: 20px">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>



</template>

<script>
import axios from "axios";
import {ElMessage} from "element-plus";
import pic from '@/assets/104245.jpg';
import w_register from '../components/register'


export default {
  data() {
    var checkUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'))
      }
      setTimeout(() => {
        callback()
      }, 1000)
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.registerForm.checkPass !== '') {
          this.$refs.registerForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    var validateTelephone=(rule,value,callback) =>{
      value=value.toString();
      if(value!="" && value.length!==11){
        callback(new Error('电话格式不正确'))
      }else{
        callback()
      }

    }
    return {
      userForm: {
        username: '',
        password: ''
      },
      type: '用户',
      dialogFormVisible: false,

      formLabelWidth: '150px',
      loginRules: {
        username: {required: true, message: '请输入用户名', trigger:'blur'},
        password: {required: true, message: '请输入密码', trigger: 'blur'}
      },
      registerForm: {
        username:"",
        pass: '',
        checkPass: '',
        name: '',
        telephone:""
      },
      registerRules: {
        pass: [{ required:"true",validator: validatePass, trigger: 'blur' }],
        checkPass: [{ required:"true",validator: validatePass2, trigger: 'blur' }],
        username: [{ required:"true",validator: checkUsername, trigger: 'blur' }],
        telephone:[{validator:validateTelephone,trigger:'blur'}]
      },

    };
  },
  methods:{
    login() {
      // console.log(this.userForm.username);
      // console.log(this.userForm.password);
      let url = "";
      let target = "";
      if (this.type == "用户") {   //判断登录类型
        url = "api/login/user";
        target = "/all";  //跳转到用户界面
      } else {
        url = "api/login/manager";
        target = "/all";   //跳转到管理员界面
      }

      if (this.userForm.username !="" && this.userForm.password!="") {
        // alert("验证通过")
        axios.post(url, this.userForm)
            .then(res => {
              ElMessage(res.data)
              console.log(res.data);
              if (res.data === '登录成功') {
                // localStorage.setItem("login","true");
                //sessionStorage会以(key,value)的形式保存一组数据，当页面关闭或手动clear后，清除数据
                sessionStorage.setItem("username", this.userForm.username);//将登陆账户名保存，即为已登录
                this.$router.push({   //页面跳转到target路由
                  path: target
                })
              }
            })
            .catch(function (error) { // 请求失败处理
              console.log("失败")
            })
      }
    },
    submitRegisterForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          ElMessage("注册成功！");
          this.dialogFormVisible=false;
          this.registerForm={username:"", pass: '', checkPass: '', name: '', telephone:""};
        // 向服务器发送请求
        } else {
          console.log('注册失败,请按要求填写');
          return false
        }
      })
    },
    resetRegisterForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}


</script>


<style>
.back {
  background-image: url("../assets/104245.jpg");

}
</style>
