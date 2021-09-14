<template>
  <el-container style="border: 1px solid gainsboro">
    <el-aside width="14vw">
      <w_nav path="/picture"/>
    </el-aside>

    <el-container style="height: 95vh;">
      <el-header style="background-color:white" height="50px">
        <w_drop/>
      </el-header>
      <el-main style="padding: 0px">
        <table>

          <img src="../assets/104245.jpg" style="width: 200px;height: 200px">
        </table>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import w_nav from '../components/nav.vue'
import w_drop from '../components/drop.vue'
export default {
  name: "Picture",
  components:{
    w_nav,
    w_drop
  }
}
</script>

<style scoped>

</style>
