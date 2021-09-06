
<template>
  <el-dropdown @command="handleCommand" style="margin-right: -950px">
  <span class="el-dropdown-link">
    {{username}}<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="退出登录">退出登录</el-dropdown-item>
        <el-dropdown-item command="个人中心">个人中心</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
export default {
  data(){
    return{
      username:sessionStorage.getItem("username")
    }
  },
  methods: {
    handleCommand(command) {
      // this.$message('click on item ' + command);
      if(command==="退出登录"){
        sessionStorage.clear();
        this.$router.push("/");
      }
      else{
        this.$router.push("/personal");
      }
    }
  }
}
</script>

<style>
.el-dropdown-link {
  /*position: absolute;*/
  /*margin-left:950px;*/
  cursor: pointer;
  color: #409EFF;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
