<template>
  <el-container style="border: 1px solid gainsboro">
    <el-aside width="14vw">
      <w_nav2 path="/messageManage"/>
    </el-aside>

    <el-container style="height: 95vh;">
      <el-header style="background-color:white" height="150px">
        <w_drop/>
      </el-header>
      <el-main style="padding: 0px">
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import w_nav2 from '../components/nav2.vue'
import w_drop from '../components/drop.vue'
export default {
  name: "messageManage",
  components:{
    w_nav2,
    w_drop
  }
}
</script>

<style scoped>

</style>