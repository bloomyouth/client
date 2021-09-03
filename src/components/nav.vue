<template>
  <div>

    <el-menu
        :default-active=path
        class="el-menu-vertical-demo"
        router
        style="margin-top: 50px"
    >
      <el-menu-item index="/personal" >个人中心</el-menu-item>
      <el-menu-item index="/home">所有</el-menu-item>
      <el-menu-item index="/dongtai" >动态</el-menu-item>
      <el-menu-item index="/release">发布</el-menu-item>
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