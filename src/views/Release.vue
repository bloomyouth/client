<template>
  <el-container style="border: 1px solid gainsboro">
    <el-aside width="14vw">
      <w_nav path="/release"/>
    </el-aside>

    <el-container style="height: 95vh;">
      <el-header style="background-color:white" height="10.6vh">
        <!--        下拉框-->
        <w_drop/>
        <!--        发布公事按钮-->
        <div style="margin-left: -70vw;margin-top: 1.77vh">
          <el-button type="primary" @click="openReleaseForm" size="mini">发布公事</el-button>
        </div>

      </el-header>
      <el-main style="padding: 0px">
        <!--        表格-->
        <el-table
            row-key="id"
            fit="false"
            ref="filterTable"
            :data="tableData"
            height="74.3vh"
            style="width: 85vw;"
        >
          <el-table-column
              prop="id"
              label="编号"
              header-align="center"
              align="center"
              style="width: 4vw"
              show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
              prop="time"
              label="时间"
              sortable
              show-overflow-tooltip="true"
              header-align="center"
              align="center"
              style="width: 7vw"
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
              style="width: 7vw"
              show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
              prop="place"
              label="地方"
              header-align="center"
              align="center"
              style="width: 7vw"
              show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
              prop="name"
              label="发布者"
              header-align="center"
              align="center"
              style="width: 4vw"
              show-overflow-tooltip="true"
          >
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
              style="width: 4vw"
              show-overflow-tooltip="true"
              :formatter="formatter">
          </el-table-column>

          <el-table-column
              label="操作"
              header-align="center"
              align="center"
              width="250px"
          >
            <template #default="scope">
              <el-button
                  size="mini"
                  type="primary"
                  @click="handleReview(scope.$index, scope.row)">详情
              </el-button>
              <!--              <el-button-->
              <!--                  size="mini"-->
              <!--                  type="danger"-->
              <!--                  @click="handleDelete(scope.$index, scope.row)">删除-->
              <!--              </el-button>-->
              <el-popconfirm title="这是一段内容确定删除吗？" @confirm="handleDelete(scope.$index,scope.row)">
                <template #reference>
                  <el-button size="mini" type="danger">删除</el-button>
                </template>
              </el-popconfirm>
              <el-button
                  size="mini"
                  type="primary"
                  @click="handleUpdate(scope.$index, scope.row)">更新
              </el-button>
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
            v-model="dialogVisible1"
            top="15px"
            style="padding: 0px"
            width="40%">
          <div>

            <div style="margin-left: -16.59vw">
              <span class="demonstration" style="color: #99a9bf">编号</span> &nbsp;
              <el-input v-model="this.row.id" style="width: 9vw" size="mini"></el-input>
            </div>

            <div style="margin-left: 9.8vw;margin-top: -28px">
              <span class="demonstration" style="color: #99a9bf">时间</span> &nbsp;
              <el-input v-model="this.row.time" style="width: 9vw" size="mini"></el-input>
            </div>

            <div style="margin-left: -16.59vw;margin-top: 20px">
              <span class="demonstration" style="color: #99a9bf">种类</span> &nbsp;
              <el-input v-model="this.row.kind" style="width: 9vw" size="mini"></el-input>
            </div>

            <div style="margin-left: 9.8vw;margin-top: -28px">
              <span class="demonstration" style="color: #99a9bf">发布者</span> &nbsp;
              <el-input v-model="this.row.name" style="width: 9vw" size="mini"></el-input>
            </div>

            <div style="margin-left: -16.59vw;margin-top: 20px">
              <span class="demonstration" style="color: #99a9bf">地方</span> &nbsp;
              <el-input v-model="this.row.place" style="width: 9vw" size="mini"></el-input>
            </div>

            <div style="margin-left: 9.8vw;margin-top: -28px">
              <span class="demonstration" style="color: #99a9bf">类型</span> &nbsp;
              <el-input v-bind:model-value="this.row.type=='1'?'寻物启事':'招领启事'" style="width: 9vw" size="mini"></el-input>
            </div>

            <div style="margin-left: -3.77vw;margin-top: 40px">
              <div class="demonstration" style="color: #99a9bf;margin-top: -10px">描述</div> &nbsp;
              <el-input type="textarea" v-model="this.row.detail" autosize="true"
                        style="width: 18.85vw;margin-top: 20px" size="mini">
              </el-input>
            </div>

            <div style="margin-left: 4.52vw;margin-top: 20px;width: 22.62vw;height: 44.24vh">
              <span class="demonstration" style="color: #99a9bf">图片</span> &nbsp;
              <el-image :src="require('C:/Users/wql/Desktop/background/332795.png')"></el-image>
            </div>

          </div>
          <template #footer>
          </template>
        </el-dialog>

        <el-dialog
            title="发布公事"
            v-model="dialogVisible2"
            top="15px"
            style="padding: 0px"
            width="40%"
        >
          <div>
            <div>
              <span style="margin-left: -50px">类型</span>
              <el-radio-group v-model="this.releaseMessage.type" style="margin-left: 80px">
                <el-radio-button label="寻物启事">寻物启事</el-radio-button>
                <el-radio-button label="招领启事">招领启事</el-radio-button>
              </el-radio-group>
            </div>

            <div>
              <span style="margin-left: -50px">种类</span>
              <el-select v-model="this.releaseMessage.kind" placeholder="请选择" style="margin-left: 80px;width: 195px;margin-top: 20px">
                <el-option
                    v-for="item in options"
                    :value="item"
                >
                </el-option>
              </el-select>
            </div>

            <div>
              <span style="margin-left: -50px">描述</span>
              <el-input type="textarea" v-model="this.releaseMessage.detail" style="margin-left: 80px;width: 195px;margin-top: 20px" >

              </el-input>
            </div>

            <div>
              <span style="margin-left: -50px">地方</span>
              <el-input v-model="this.releaseMessage.place" style="margin-left: 80px;width: 195px;margin-top: 20px">

              </el-input>
            </div>

<!--            <div>-->
<!--              <span style="margin-left: -50px">时间</span>-->
<!--              <el-input v-model="this.releaseMessage.time" style="margin-left: 80px;width: 195px;margin-top: 20px">-->

<!--              </el-input>-->
<!--            </div>-->

            <div style="margin-top: 20px;margin-left: 20px">
<!--              <span style="margin-left: -325px;margin-top: 350px">图片</span>-->
              <el-upload
                  class="upload-demo"
                  ref="upload"
                  action="#"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :file-list="fileList"
                  :auto-upload="false"
                  list-type="picture-card"
                  headers="'Content-Type': 'multipart/form-data'"
              >
                <template #trigger>
                  <el-button size="small" type="primary">选取文件</el-button>
                </template>
<!--                <el-button-->
<!--                    style="margin-left: 10px;"-->
<!--                    size="small"-->
<!--                    type="success"-->
<!--                    @click="submitUpload"-->
<!--                >上传到服务器</el-button-->
                >
                <template #tip>
                  <div class="el-upload__tip">只能上传 jpg/png 文件，且不超过 500kb</div>
                </template>
              </el-upload>
            </div>

            <div style="margin-left: 300px">
              <el-button type="primary" size="mini" style="margin-top: 20px" @click="release">发布</el-button>
              <el-button type="primary" size="mini" style="margin-top: 20px" @click="cancel">取消</el-button>
            </div>

          </div>

        </el-dialog>

<!--        更新页面-->
        <el-dialog
            title="详情"
            v-model="dialogVisible3"
            top="15px"
            style="padding: 0px"
            width="40%">
          <div>

            <div style="margin-left: -16.59vw">
              <span class="demonstration" style="color: #99a9bf">编号</span> &nbsp;
              <el-input v-model="this.row.id" style="width: 9vw" size="mini"></el-input>
            </div>

            <div style="margin-left: 9.8vw;margin-top: -28px">
              <span class="demonstration" style="color: #99a9bf">时间</span> &nbsp;
              <el-input v-model="this.row.time" style="width: 9vw" size="mini"></el-input>
            </div>

            <div style="margin-left: -16.59vw;margin-top: 20px">
              <span class="demonstration" style="color: #99a9bf">种类</span> &nbsp;
              <el-input v-model="this.row.kind" style="width: 9vw" size="mini"></el-input>
            </div>

            <div style="margin-left: 9.8vw;margin-top: -28px">
              <span class="demonstration" style="color: #99a9bf">发布者</span> &nbsp;
              <el-input v-model="this.row.name" style="width: 9vw" size="mini"></el-input>
            </div>

            <div style="margin-left: -16.59vw;margin-top: 20px">
              <span class="demonstration" style="color: #99a9bf">地方</span> &nbsp;
              <el-input v-model="this.row.place" style="width: 9vw" size="mini"></el-input>
            </div>

            <div style="margin-left: 9.8vw;margin-top: -28px">
              <span class="demonstration" style="color: #99a9bf">类型</span> &nbsp;
              <el-input v-bind:model-value="this.row.type=='1'?'寻物启事':'招领启事'" style="width: 9vw" size="mini"></el-input>
            </div>

            <div style="margin-left: -3.77vw;margin-top: 40px">
              <div class="demonstration" style="color: #99a9bf;margin-top: -10px">描述</div> &nbsp;
              <el-input type="textarea" v-model="this.row.detail" autosize="true"
                        style="width: 18.85vw;margin-top: 20px" size="mini">
              </el-input>
            </div>

            <div style="margin-left: 4.52vw;margin-top: 20px;width: 22.62vw;height: 44.24vh">
              <span class="demonstration" style="color: #99a9bf">图片</span> &nbsp;
              <el-image :src="require('C:/Users/wql/Desktop/background/332795.png')"></el-image>
            </div>
            <div>
              <el-button type="primary" size="mini" @click="update">更新</el-button>
              <el-button type="primary" size="mini">取消</el-button>
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
      dialogVisible1: false,  //详情页面是否打开
      dialogVisible2: false,  //发布页面是否打开
      dialogVisible3: false,
      releaseMessage: {
        id: "",
        type: "寻物启事",
        state: "未审核",
        name: sessionStorage.getItem("username"),
        time: "",
        detail: "",
        kind: "",
        place: ""
      },
      options: ["生活用品", "学习用品", "电子设备", "其它"],
      fileList: [],
      headers: {
        'Content-Type': 'multipart/form-data'
      }
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
    handleReview(index, row) {
      console.log("详情");
      console.log(index, row);
      this.row = row;
      this.dialogVisible1 = true;
    },
    handleDelete(index, row) {
      console.log("删除");
      console.log(index, row);
    },
    handleUpdate(index, row) {
      console.log("更新");
      console.log(index, row);
      this.row = row;
      this.dialogVisible3 = true;
    },
    update(){

    },
    handleAdd() {
      console.log("发布公事");
    },

    release(){   //发布
      console.log(this.fileList);
      var param = new FormData();
      this.fileList.forEach(
          (val, index) => {
            param.append("file", val.raw);
          }
      );

      axios.post("api/message/upload", param).then(response => {alert(response)});

      this.$message({
        message: "上传成功！",
        duration: 1000
      });


      this.dialogVisible2=false;
      this.releaseMessage={
        id: "",
        type: "寻物启事",
        state: "未审核",
        name: sessionStorage.getItem("username"),
        time: "",
        detail: "",
        kind: "",
        place: ""}
      this.fileList=[]

    },
    cancel(){
      this.dialogVisible2=false;
      this.releaseMessage={
        id: "",
        type: "寻物启事",
        state: "未审核",
        name: sessionStorage.getItem("username"),
        time: "",
        detail: "",
        kind: "",
        place: ""}

    },
    openReleaseForm(){
      this.dialogVisible2=true;
      this.releaseMessage.time=new Date().format("yyyy-MM-dd hh:mm:ss");
    },
    // submitUpload() {
    //   console.log(this.fileList);
    //   this.$refs.upload.submit()
    // },
    handleChange(file, fileList) { //文件数量改变
      this.fileList = fileList;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
  },
  mounted() {
    this.load();
  }


}
</script>
<style>

</style>
