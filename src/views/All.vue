<template>
  <el-container style="border: 1px solid gainsboro">
    <el-aside width="180px">
      <w_nav path="/all"/>
    </el-aside>

    <el-container style="height: 95vh;">
      <el-header style="background-color:white" height="150px">
        <w_drop/>


        <!--        筛选-->
        <div style="margin: 20px;">

          <div style="margin-left: -900px;margin-top: -10px">
            <el-tag>按条件筛选</el-tag>
          </div>

          <!--        日期-->
          <div style="margin-left: -500px;margin-top: -20px;">
            <span class="demonstration" style="color: #99a9bf">日期</span> &nbsp;
            <el-date-picker v-model="this.search.time" type="date" placeholder="选择日期" style="width: 190px"
                            format="YYYY 年 MM 月 DD 日" value-format="YYYY/MM/DD" size="mini">
            </el-date-picker>
          </div>


          <!--        类别-->
          <div style="margin-left: -530px;margin-top: 20px;">
            <span class="demonstration" style="color: #99a9bf">物品种类</span> &nbsp;
            <el-select v-model="this.search.kind" placeholder="请选择" style="width: 190px" clearable="true" size="mini">
              <el-option
                  v-for="option in this.option1"
                  :value="option"
              >
              </el-option>
            </el-select>
          </div>


          <!--       关键词-->
          <div style="margin-left:65px;margin-top: -25px">
            <span class="demonstration" style="color: #99a9bf">关键词</span> &nbsp;
            <el-input v-model="this.search.key" placeholder="请输入内容" style="width: 190px;" size="mini" clearable="true"></el-input>
          </div>


          <!--        类型-->
          <div style="margin-left: 80px;margin-top: -80px;">
            <span class="demonstration" style="color: #99a9bf">类型</span> &nbsp;
            <el-select v-model="this.search.type" placeholder="请选择" style="width: 190px" clearable="true" size="mini">
              <el-option
                  v-for="option in this.option2"
                  :value="option"
              >
              </el-option>
            </el-select>
          </div>


          <!--        按钮-->
          <div style="margin-left: 500px;margin-top: 25px">
            <el-button type="primary" size="mini" @click="searchByCondition">查询</el-button>
          </div>

        </div>


      </el-header>
      <el-main style="padding: 0px">
<!--        表格-->
        <el-table
            row-key="id"
            fit="false"
            ref="filterTable"
            :data="tableData"
            height="350px"
        >
          <el-table-column
              prop="id"
              label="编号"
              header-align="center"
              align="center"
              width="80"
          >
          </el-table-column>
          <el-table-column
              prop="time"
              label="时间"
              sortable
              show-overflow-tooltip="true"
              header-align="center"
              align="center"
              width="120"
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
              width="120px"
          >
          </el-table-column>
          <el-table-column
              prop="place"
              label="地方"
              header-align="center"
              align="center"
              width="120px"
          >
          </el-table-column>
          <el-table-column
              prop="name"
              label="发布者"
              header-align="center"
              align="center"
              width="80">
          </el-table-column>
          <!--    <el-table-column-->
          <!--        prop="state"-->
          <!--        label="状态"-->
          <!--        header-align="center"-->
          <!--        align="center"-->
          <!--    >-->
          <!--    </el-table-column>-->
          <el-table-column
              prop="type"
              label="类型"
              header-align="center"
              align="center"
              width="80"
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
                  @click="handleEdit(scope.$index, scope.row)">详情
              </el-button>
              <!--        <el-button-->
              <!--            size="mini"-->
              <!--            type="danger"-->
              <!--            @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
            </template>
          </el-table-column>
        </el-table>
        <!--              分页部分-->
        <div class="block">
          <!--        <span class="demonstration">完整功能</span>-->
          <el-pagination
              @current-change="handleCurrentChange"
              :current-page=this.currentPage
              :page-size=this.pageSize
              layout="total, prev, pager, next, jumper"
              :total=this.total>
          </el-pagination>
        </div>
        <!--      详情页-->
        <el-dialog
            title="详情"
            v-model="dialogVisible"
            top="15px"
            style="padding: 0px"
            width="40%">
          <div>

            <div style="margin-left: -220px">
              <span class="demonstration" style="color: #99a9bf">编号</span> &nbsp;
              <el-input v-model="this.row.id" style="width: 120px" size="mini"></el-input>
            </div>

            <div style="margin-left: 130px;margin-top: -28px">
              <span class="demonstration" style="color: #99a9bf">时间</span> &nbsp;
              <el-input v-model="this.row.time" style="width: 120px" size="mini"></el-input>
            </div>

            <div style="margin-left: -220px;margin-top: 20px">
              <span class="demonstration" style="color: #99a9bf">种类</span> &nbsp;
              <el-input v-model="this.row.kind" style="width: 120px" size="mini"></el-input>
            </div>

            <div style="margin-left: 130px;margin-top: -28px">
              <span class="demonstration" style="color: #99a9bf">发布者</span> &nbsp;
              <el-input v-model="this.row.name" style="width: 120px" size="mini"></el-input>
            </div>

            <div style="margin-left: -220px;margin-top: 20px">
              <span class="demonstration" style="color: #99a9bf">地方</span> &nbsp;
              <el-input v-model="this.row.place" style="width: 120px" size="mini"></el-input>
            </div>

            <div style="margin-left: 130px;margin-top: -28px">
              <span class="demonstration" style="color: #99a9bf">类型</span> &nbsp;
              <el-input v-bind:model-value="this.row.type=='1'?'寻物启事':'招领启事'" style="width: 120px" size="mini"></el-input>
            </div>

            <div style="margin-left: -50px;margin-top: 40px">
              <div class="demonstration" style="color: #99a9bf;margin-top: -10px">描述</div> &nbsp;
              <el-input type="textarea" v-model="this.row.detail" autosize="true"
                        style="width: 250px;margin-top: 20px" size="mini">
              </el-input>
            </div>

            <div style="margin-left: 60px;margin-top: 20px;width: 300px;height: 250px">
              <span class="demonstration" style="color: #99a9bf">图片</span> &nbsp;
              <el-image :src="require('C:/Users/wql/Desktop/background/332795.png')"></el-image>
            </div>

          </div>
          <template #footer>
          </template>
        </el-dialog>
      </el-main>
    </el-container>
  </el-container>


</template>

<script>
// @ is an alias to /src
import w_table from '../components/table.vue'
import w_nav from '../components/nav.vue'
import axios from "axios";
import w_date from "../components/date.vue";
import w_drop from "../components/drop.vue"


export default {
  name: 'Home',
  components: {
    w_nav,
    w_drop,
    w_date
  },
  data() {
    return {
      currentPage: 1,    //当前页码
      pageSize: 8,       //页容量
      data: [],        //向后台请求的所有数据
      tableData: [],  //表格显示的数据
      total: 0,   //共几条数据
      row: [], //点详情查看的行数据
      dialogVisible: false,  //详情页面是否打开
      search: {
        time: "",
        kind: "",
        key: "",
        type: ""
      },
      option1: ["证件", "生活用品", "学习用品", "电子设备"],
      option2: ["寻物启事", "招领启事"],
    }
  },
  methods: {
    handleCurrentChange(val) {
      console.log(val);
      console.log("this.total=" + this.total);
      this.currentPage = val;
      this.tableData = [];
      for (let i = (val - 1) * this.pageSize; i < (this.total < val * this.pageSize ? this.total : val * this.pageSize); i++)
        this.tableData.push(this.data[i]);
      console.log(this.tableData);

    },
    formatter(row) {
      return row.type == '1' ? '寻物启事' : '招领启事';   //将数据库数据进行转换
    },
    load() {    //加载数据
      //每次加载界面,this.tableData 均为空
      console.log("load");
      // if(sessionStorage.getItem("tableData")){  //当本次会话以保存过数据，则不向后端发起请求
      //   this.tableData=JSON.parse(sessionStorage.getItem("tableData"));
      // }
      // else{   //向后端接口请求数据
      axios.get("api/message/allMessage")  // "api"已在vue.config.js中进行跨域配置，
          .then(res => {
            console.log("请求数据成功");
            console.log(res.data);
            this.data = res.data
            this.total = res.data.length;
            this.handleCurrentChange(1);
            sessionStorage.setItem("tableData", JSON.stringify(this.tableData)); //sessonStorage存储的时字符串，需将json对象进行转换
          })
          .catch(function (error) { // 请求失败处理
            console.log("请求数据失败");
          })
      // }
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.row = row;
      this.dialogVisible = true;
    },
    searchByCondition() {
      const result = this.search.date.replaceAll('/', '-');   //将2021/1/1转化为 2021-1-1
      this.search.date = result;
      console.log(this.search);

    }
  },
  mounted() {
    this.load();
  }


}
</script>
<style>
/*.el-table .el-table__cell{*/
/*  padding: 0px;*/
/*}*/
</style>
