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
      <el-menu-item index="/personal" >个人中心</el-menu-item>
      <el-menu-item index="/all">所有信息</el-menu-item>
      <el-menu-item index="/release" >我的发布</el-menu-item>
      <el-menu-item index="/about">关于</el-menu-item>
    </el-menu>

  </div>
</template>

<script>
export default {
  name: "Aside",
  props:{
    path:String
  }
}
</script>

<style scoped>





</style>