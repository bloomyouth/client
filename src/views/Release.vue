
<template>
  <el-container style="height: 500px; border: 1px solid #eee">
    <el-aside width="150px"  style="background-color: rgb(238, 241, 246)">
      <w_nav path="/release"/>
    </el-aside>
    <el-container>
      <el-main>
        <div>
          <label>类型</label>
          <br/>
          <el-radio v-model="radio1" label="1">寻物启事</el-radio>
          <el-radio v-model="radio1" label="2">认领启事</el-radio>
        </div>

        <div style="margin-top: 50px">
          <label>类别</label>
          <br/>
          <el-radio-group v-model="radio3" @change="out">
            <el-radio-button label="证件"></el-radio-button>
            <el-radio-button label="书籍"></el-radio-button>
            <el-radio-button label="电子数码"></el-radio-button>
          </el-radio-group>


        </div>
      </el-main>
    </el-container>
  </el-container>

</template>


<script>
import w_nav from '../components/nav.vue'
export default {
  components:{
    w_nav
  },
  data () {
    return {
      radio1: '1',
      radio2: '1',
      radio3: '数据'
    };
  },
  methods:{
    out(){
      console.log(this.radio3);
    }
  }
}
</script>

<style>

</style>
