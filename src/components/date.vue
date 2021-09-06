
<template>
  <div class="block">
    <span class="demonstration" style="color: #99a9bf">日期</span> &nbsp;
    <el-date-picker v-model="value1" type="date" placeholder="选择日期" style="width: 150px">
    </el-date-picker>
  </div>
</template>

<script>
export default {
  data() {
    return {

      value1: '',
      value2: '',
    }
  },
}
</script>

<style>

</style>
