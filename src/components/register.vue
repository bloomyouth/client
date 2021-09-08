
<template>
  <el-dialog title="注册" v-model="show" top="10px" width="40%">
    <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="80px"
        class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model.number="ruleForm.username" style="width: 300px;margin-left: -90px"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass" >
        <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
            style="width: 300px;margin-left: -90px"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
            style="width: 300px;margin-left: -90px"
        ></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model.number="ruleForm.name" style="width: 300px;margin-left: -90px"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="telephone">
        <el-input v-model.number="ruleForm.telephone" style="width: 300px;margin-left: -90px"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" style="margin-left: -100px">提交</el-button>
        <el-button @click="resetForm('ruleForm')" style="margin-left: 20px">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>

</template>

<script>
export default {
  props:{
    show:String
  },
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
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        username:"",
        pass: '',
        checkPass: '',
        name: '',
        telephone:""
      },
      rules: {
        pass: [{ required:"true",validator: validatePass, trigger: 'blur' }],
        checkPass: [{ required:"true",validator: validatePass2, trigger: 'blur' }],
        username: [{ required:"true",validator: checkUsername, trigger: 'blur' }],
      },
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
          this.$emit("changeRegisterForm",false);
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  },


}
</script>

<style>

</style>
