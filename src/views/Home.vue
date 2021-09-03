<template>
  <el-container style="height: 500px; border: 1px solid #eee">
    <el-aside width="150px"  style="background-color: rgb(238, 241, 246)">
      <w_nav path="/home"/>
    </el-aside>
  <el-container>
    <el-main>
      <w_table></w_table>
    </el-main>
  </el-container>
  </el-container>


</template>

<script>
// @ is an alias to /src
import w_table from '../components/table.vue'
import w_nav from '../components/nav.vue'



export default {
  name: 'Home',
  components: {
    w_table,
    w_nav
  },
  methods:{
  }
}
</script>
