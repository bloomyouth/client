<template>
  <el-container style="border: 1px solid gainsboro">
    <el-aside width="14vw">
      <w_nav path="/personal"/>
    </el-aside>

    <el-container style="height: 95vh;">
      <el-header style="background-color:white" height="20vh">
        <w_drop/>
      </el-header>
      <el-main style="padding: 0px">
        <!--        <div style="height: 400px;">-->
        <el-form
            :model="userDataForm"
            status-icon
            ref="registerForm"
            label-width="10vw"
            class="demo-ruleForm"
            style="margin-left: 20vw;margin-top: 0vh;"
            label-position="left"
        >
          <el-form-item label="用户名" prop="username" style="width: 18vw">
            <el-input v-model.number="userDataForm.username" style="width: 18vw;margin-left: 3vw"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name" style="width: 18vw">
            <el-input v-model.number="userDataForm.name" style="width: 18vw;margin-left: 3vw"
                      placeholder="未填写"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="telephone" style="width: 18vw">
            <el-input v-model.number="userDataForm.telephone" style="width: 18vw;margin-left: 3vw"
                      placeholder="未填写"></el-input>
          </el-form-item>
          <el-form-item label="注册时间" prop="registerTime" style="width: 18vw">
            <el-input v-model.number="userDataForm.registerTime" style="width: 18vw;margin-left: 3vw"></el-input>
          </el-form-item>
          <el-form-item label="上次登录时间" prop="registerTime" style="width: 18vw">
            <el-input v-model.number="userDataForm.lastLoginTime" style="width: 18vw;margin-left: 3vw"></el-input>
          </el-form-item>
          <div style="margin-top: 10vh">
            <el-button type="primary" @click="dialogFormVisible=true" style="margin-left: -30vw;" size="mini">修改信息</el-button>
            <el-button type="danger" @click="deleteUser" style="margin-left: 2vw;margin-top: -5vh" size="mini">注销账号</el-button>
          </div>

        </el-form>
        <!--        </div>-->


<!--修改信息-->
        <div>
          <el-dialog title="修改信息" v-model="dialogFormVisible" top="10px" width="40%">
            <el-form
                :model="userDataForm"
                status-icon
                :rules="changeUserDataRules"
                ref="registerForm"
                label-width="10vw"
                class="demo-ruleForm"
            >
              <el-form-item label="用户名" prop="username">
                <el-input v-model.number="userDataForm.username" style="width: 18vw;margin-left: -3vw" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="姓名" prop="name">
                <el-input v-model.number="userDataForm.name" style="width: 18vw;margin-left: -3vw"></el-input>
              </el-form-item>
              <el-form-item label="电话" prop="telephone">
                <el-input v-model.number="userDataForm.telephone" style="width: 18vw;margin-left: -3vw" placeholder="请输入手机号码"></el-input>
              </el-form-item>

<!--              <el-form-item>-->
<!--                <el-button type="primary" @click="submitRegisterForm('registerForm')" style="margin-left: -5vw">提交</el-button>-->
<!--                <el-button @click="resetRegisterForm('registerForm')" style="margin-left: 1.1vw">重置</el-button>-->
<!--              </el-form-item>-->
            </el-form>
<!--修改密码-->
            <el-form
                :model="changePasswordForm"
                status-icon
                :rules="changePasswordRules"
                ref="changePasswordForm"
                label-width="10vw"
                class="demo-ruleForm"
                style="margin-left: -5px"
            >
              <el-form-item label="原密码" prop="password" style="width: 18vw">
                <el-input
                    type="password"
                    v-model="changePasswordForm.password"
                    auto-complete="false"
                    style="width: 18vw;margin-left: 3vw"
                ></el-input>
              </el-form-item>
              <el-form-item label="新密码" prop="newPassword" style="width: 18vw">
                <el-input
                    type="password"
                    v-model="changePasswordForm.newPassword"
                    auto-complete="false"
                    style="width: 18vw;margin-left: 3vw"
                ></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkNewPassword" style="width: 18vw">
                <el-input
                    type="password"
                    v-model="changePasswordForm.checkNewPassword"
                    auto-complete="false"
                    style="width: 18vw;margin-left: 3vw"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitUpdateUserDataForm('changePasswordForm','userDataForm')"
                           style="margin-left: -5vw" size="mini">修改
                </el-button>
<!--                <el-button @click="resetUpdateUserDataForm('changePasswordForm')" style="margin-left: 1.1vw" size="mini">重置-->
<!--                </el-button>-->
              </el-form-item>
            </el-form>
          </el-dialog>
        </div>

      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import w_drop from "../components/drop.vue"
import w_nav from '../components/nav.vue'
import axios from "axios";
import {ElMessage} from "element-plus";

export default {
  name: "Personal",
  components: {
    w_nav,
    w_drop
  },
  data() {
    var validateTelephone=(rule,value,callback) =>{
      value=value.toString();
      if(value!="" && value.length!==11){
        callback(new Error('电话格式不正确'))
      }else{
        callback()
      }
    }
    var validatePassword = (rule, value, callback) => {
      console.log(value);
      if (value != "" && value !== this.userDataForm.password) {
        callback(new Error('原密码错误'))
      } else {
        callback()
      }
    }
    var validateNewPassword = (rule, value, callback) => {
      if (value === '' && this.changePasswordForm.password!="") {
        callback(new Error('请输入新密码'))
      // } else if (value !== this.registerForm.pass) {
      //   callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    var validateCheckNewPassword = (rule, value, callback) => {
          if (value === ''&& this.changePasswordForm.password!="") {
            callback(new Error('请再次输入新密码'))
          }
          else if(value !== this.changePasswordForm.newPassword && this.changePasswordForm.password!=""){
            callback(new Error('两次密码不一致'))
          }
          else{
            callback()
          }
    }
          return {
            userDataForm: {
              username: "wql",
              password: '123',
              // checkPass: '',
              name: '吴启来',
              telephone: "13750794329",
              registerTime: "2021-10-1",
              lastLoginTime: "2020-10-1"
            },
            changePasswordForm: {
              password: "",
              newPassword: "",
              checkNewPassword: ""
            },
            changePasswordRules: {
              password: [{ validator: validatePassword, trigger: 'blur'}],
              newPassword: [{validator: validateNewPassword, trigger: 'blur'}],
              checkNewPassword: [{validator: validateCheckNewPassword, trigger: 'blur'}],
            },
            dialogFormVisible: false,
            changeUserDataRules:{
              name:[{trigger:'blur'}],
              telephone:[{validator:validateTelephone,trigger:'blur'}]
            }


          }
        },
        methods: {
          getUserData() {
          console.log("getUserData");
          axios.get("api/user/data")
          .then(res => {
          console.log("获取用户数据成功");
          this.userDataForm = res.data;
        }
  )
  .
    catch(function (error) { // 请求失败处理
      console.log("请求用户数据失败");
      console.log(error);
    })

  },
    updateUserData()
    {
    }
  ,
    deleteUser()
    {

    }
  , submitUpdateUserDataForm(formName1,formName2)
    {
      this.$refs[formName1].validate((valid) => {
        if (valid) {
          ElMessage("修改信息成功！");
          this.dialogFormVisible = false;
          if(this.changePasswordForm.newPassword!="") this.userDataForm.password=this.changePasswordForm.newPassword;
          this.changePasswordForm = {password: "",
            newPassword: "",
            checkNewPassword: ""};
          // 向服务器发送请求
          console.log(this.userDataForm);
        } else {
          ElMessage('修改信息失败,请按要求填写');
          return false
        }
      })
    }
  ,
    // resetChangePasswordForm(formName)
    // {
    //   this.$refs[formName].resetFields()
    // }
  },
    mounted()
    {
      // this.getUserData();
    }
  }
</script>

<style scoped>

</style>