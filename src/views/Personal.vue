<template>
  <el-container style="height: 500px; border: 1px solid #eee">
    <el-aside width="150px"  style="background-color: rgb(238, 241, 246)">
      <w_nav path="/personal"/>
    </el-aside>
  </el-container>

</template>

<script>
import w_nav from '../components/nav.vue'
export default {
  name: "Personal",
  components:{
    w_nav
  }
}
</script>

<style scoped>

</style>