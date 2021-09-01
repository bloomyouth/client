<template>
  <el-table
      :data="tableData"
      style="width: 100%">
    <el-table-column
        label="ID"
        width="180">
      <template #default="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.id }}</span>
      </template>
    </el-table-column>
    <el-table-column
        label="类型"
        width="180">
      <template #default="scope">
        <div class="name-wrapper">
          <el-tag size="medium">{{ scope.row.type }}</el-tag>
        </div>
      </template>
    </el-table-column>
    <el-table-column
        label="状态"
        width="180">
      <template #default="scope">
        <div class="name-wrapper">
          <el-tag size="medium">{{ scope.row.state }}</el-tag>
        </div>
      </template>
    </el-table-column>
    <el-table-column
        label="发布人姓名"
        width="180">
      <template #default="scope">
        <div class="name-wrapper">
          <el-tag size="medium">{{ scope.row.name }}</el-tag>
        </div>
      </template>
    </el-table-column>
    <el-table-column
        label="时间"
        width="180">
      <template #default="scope">
        <div class="name-wrapper">
          <el-tag size="medium">{{ scope.row.time }}</el-tag>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import request from "../utils/request";
import axios from "axios";

export default {
  data() {
    return {
      tableData: [
      //     {
      //   id:'1',
      //   type:'寻物',
      //   state:'未认领',
      //   name: '王小虎',
      //   time: '2016-05-02',
      // }, {
      //   id:'2',
      //   type:'寻物',
      //   state:'未认领',
      //   name: '王小虎',
      //   time: '2016-05-02',
      // }, {
      //   id:'3',
      //   type:'寻物',
      //   state:'未认领',
      //   name: '王小虎',
      //   time: '2016-05-02',
      // }, {
      //   id:'4',
      //   type:'寻物',
      //   state:'未认领',
      //   name: '王小虎',
      //   time: '2016-05-02',
      // }
      ]
    }
  },
  methods: {
    load(){
      console.log("ajax");
      axios.get("api/message/allMessage")
              .then(res => {
                  console.log(res.data);
                  this.tableData = res.data
               })
              .catch(function (error) { // 请求失败处理
                console.log("失败")
                console.log(error);
               })

    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  },
  mounted() {
    console.log("已创建");
    this.load();
    }
}
</script>

<style>

</style>
