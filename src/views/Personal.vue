<template>
  <el-container style="border: 1px solid gainsboro">
    <el-aside width="180px">
      <w_nav path="/personal"/>
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
import w_drop from "../components/drop.vue"
import w_nav from '../components/nav.vue'
export default {
  name: "Personal",
  components:{
    w_nav,
    w_drop
  }
}
</script>

<style scoped>

</style>