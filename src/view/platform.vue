<template>
  <el-row>
    <el-dropdown style="color: #ffffff;">
              <span class="el-dropdown-link">
                我的工作台<i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>
          <a @click="openPlan()">今日计划</a>
        </el-dropdown-item>
        <el-dropdown-item>
          <a @click="openNotice()">公司公告</a>
        </el-dropdown-item>
        <el-dropdown-item>
          <a @click="addPlan = true">添加计划</a>
        </el-dropdown-item>
        <el-dropdown-item>
          <a @click="updateProcess = true">更新进度</a>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <!--add plan dialog-->
    <el-dialog
      title="添加计划"
      :visible.sync="addPlan"
      size="tiny">
      <el-form label-width="8rem">
        <el-form-item label="计划内容">
          <el-input type="textarea"
                    row ="4"
                    v-model="info.infoContent"
                    placeholder="请输入计划内容..."></el-input>
        </el-form-item>
        <el-form-item label="时间跨度">
          <el-col :span="11">
            <el-date-picker
              style="width: 100%"
              v-model="info.startTime"
              type="date"
              placeholder="开始时间"></el-date-picker>
          </el-col>
          <el-col style="text-align: center" :span="2">--</el-col>
          <el-col :span="11">
            <el-date-picker
              style="width: 100%"
              v-model="info.endTime"
              type="date"
              placeholder="结束时间"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="计划类型">
          <el-radio-group v-model="info.infoType">
            <el-radio :label="1">公司公告</el-radio>
            <el-radio :label="2">任务安排</el-radio>
          </el-radio-group>
          <p v-if="errMsg" style="color: red">{{errMsg}}</p>
        </el-form-item>
      </el-form>
      <div style="text-align: center">
        <el-button type="primary"
                   style="width: 60%"
                   @click="postInfo()">添加</el-button>
      </div>
    </el-dialog>
    <!--update process dialog-->
    <el-dialog
      title = "更新进度"
      site = "tiny"
      :visible.sync="updateProcess">
      <el-table
        stripe :data="plan">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column
          prop="info_content"
          label="任务内容"
          width="140"></el-table-column>
        <el-table-column
          prop="start_time"
          label="开始时间"></el-table-column>
        <el-table-column
          prop="end_time"
          label="结束时间"></el-table-column>
        <!--<el-table-column-->
          <!--prop="progress"-->
          <!--label="当前进度"></el-table-column>-->
        <el-table-column
          label="任务进度(%)">
          <template scope="scope">
            <el-input-number type="text" size="small" :min = "0" :max="100" :step="10"
              v-model="scope.row.progress"
              @change="handleEdit(scope.$index, scope.row)"></el-input-number>
          </template></el-table-column>
      </el-table>
      <!--<div slot="footer" style="text-align: center">-->
        <!--<el-button style="width: 20rem"-->
                   <!--type="primary">更新</el-button>-->
      <!--</div>-->
    </el-dialog>
  </el-row>
</template>

<script>
  import {Notification} from 'element-ui'
  export default{
      props:{
        user:""
      },
      data(){
        return{
          info:{
            infoContent:"",         //添加的信息内容
            startTime:"",
            endTime:"",
            infoType:"",           //添加的信息类型
          },
          plan: [],
          notice:[],
          addPlan: false,       //是否打开添加计划对话框
          updateProcess: false,  //是否打开更新进度对话框
          errMsg:""
        }
      },
    beforeMount(){
      this.getInfo();
    },
    methods:{
      getInfo(){
        var self = this;
        $.post("/mainPage/mainPage/getInfoList",function (rcvData) {
          if(rcvData.code == 0){
              var info = rcvData.data;
              for(let index in info){
                  if(info[index].infoTypeId == 1){
                      self.notice = info[index].infoList;
                  }
                  else if(info[index].infoTypeId == 2){
                      self.plan = info[index].infoList;
                  }
              }
          }
        },'json')
      },
      updateProcess: false,
      handleEdit(index, row) {
          var sendData = {infoId: row.id,progress: row.progress};
          $.post("mainPage/mainPage/updateProgress",sendData,function (rcvData) {
            if(rcvData.code == 0){
                console.log("任务进度更新成功")
            }
            else{
                console.log(rcvData.message);
            }
          },"json")
      },
      openPlan(){
        var self = this;
        var content ="";
        for(let index in self.plan){
            content += parseInt(index) + 1  + ". " + self.plan[index].info_content;
        }
        self.$notify({
            title:"今日计划",
            message: content? content: "暂无任务",
            duration: 0
          })
      },
      openNotice(){
          var self = this;
          var content = "";
          for(let index in self.notice){
              content += parseInt(index) + 1 + ". " + self.notice[index].info_content;
          }
          self.$notify({
            title:"今日公告",
            message: content? content: "暂无通知"
          })
      },
      postInfo(){
        var self = this;
        $.post("/mainPage/mainPage/addPlan",self.info,function (rcvData) {
            if(!self.info.infoContent || !self.info.infoType || !self.info.startTime || !self.info.endTime){
                self.errMsg = "请将表单填写完整！";
                return;
            }
            else{
                self.errMsg = null;
            }
            if(rcvData.code == 0){
                Notification.success({
                  message: rcvData.message? rcvData.message:"计划添加成功",
                  duration: 2000
                })
              self.addPlan = false;
            }
            else{
              Notification.error({
                message: rcvData.message? rcvData.message:"计划添加失败",
                duration: 2000
              })
            }
        },"json")
      }
    }
  }
</script>
