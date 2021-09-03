
<template>
<!--  <el-button @click="resetDateFilter">清除日期过滤器</el-button>-->
<!--  <el-button @click="clearFilter">清除所有过滤器</el-button>-->
  <el-table
      row-key="id"
      fit="false"
      ref="filterTable"
      :data="tableData"
      show-summary="true"
      sum-text="合计"
      style="width: 100%">
    <el-table-column
        prop="id"
        label="编号"
        header-align="center"
        align="center"
        width="180">
    </el-table-column>
    <el-table-column
        prop="time"
        label="时间"
        sortable
        show-overflow-tooltip="true"
        header-align="center"
        align="center"
        width="180"
    >
    </el-table-column>
    <el-table-column
        prop="detail"
        label="描述"
        show-overflow-tooltip="true"
        header-align="center"
        align="center"
    >
    </el-table-column>
    <el-table-column
        prop="kind"
        label="种类"
        header-align="center"
        align="center"
    >
    </el-table-column>
    <el-table-column
        prop="place"
        label="地方"
        header-align="center"
        align="center"
    >
    </el-table-column>
    <el-table-column
        prop="name"
        label="发布者"
        header-align="center"
        align="center"
        width="180">
    </el-table-column>
    <el-table-column
        prop="state"
        label="状态"
        header-align="center"
        align="center"
    >
    </el-table-column>
    <el-table-column
        prop="type"
        label="类型"
        header-align="center"
        align="center"
        width="100"
        :formatter="formatter">
    </el-table-column>

    <el-table-column
        label="操作"
        header-align="center"
        align="center"
    >
      <template #default="scope">
        <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)">详情</el-button>
<!--        <el-button-->
<!--            size="mini"-->
<!--            type="danger"-->
<!--            @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import axios from "axios";
import request from "../utils/request";

export default {
  data() {
    return {
      tableData: []  //数据
    }
  },
  methods: {
    formatter(row) {
      return row.type=='1'?'寻物启事':'招领启事';   //将数据库数据进行转换
    },

    load(){    //加载数据
     //每次加载界面,this.tableData 均为空
      if(sessionStorage.getItem("tableData")){  //当本次会话以保存过数据，则不向后端发起请求
        this.tableData=JSON.parse(sessionStorage.getItem("tableData"));
      }
      else{   //向后端接口请求数据
        axios.get("api/message/allMessage")  // "api"已在vue.config.js中进行跨域配置，
            .then(res => {
              console.log("请求数据成功");
              console.log(res.data);
              this.tableData = res.data
              sessionStorage.setItem("tableData",JSON.stringify(this.tableData)); //sessonStorage存储的时字符串，需将json对象进行转换
            })
            .catch(function (error) { // 请求失败处理
              console.log("请求数据失败");
            })
      }
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  },
  mounted() {   //生命周期函数，每次页面加载，调用
    this.load();
  }
}
</script>

<style>

</style>
