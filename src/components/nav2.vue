<template>
  <div>

    <el-menu
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :default-active=path
        class="el-menu-vertical-demo"
        router
        style="min-height: 95vh"
    >
      <el-menu-item index="/userManage" >用户管理</el-menu-item>
      <el-menu-item index="/messageManage">信息管理</el-menu-item>
    </el-menu>

  </div>
</template>

<script>
export default {
  name: "Aside2",
  props:{
    path:String
  }
}
</script>

<style scoped>





</style>