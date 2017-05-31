<template>
  <div>
    <el-tabs v-model="siteInfo.siteType" class="website">
      <el-tab-pane v-for="(type,key) in category"
                   v-if="category"
                   :label="type"
                   :key="key"
                   :name="key">
        <a v-for="(site,index) in sites"
           :href="site.site_url"
           target="_blank"
           :key="index"
           v-if="site.site_type == key">{{site.site_name}}</a>
        <a hre="#" class="el-icon-plus" @click="addSiteDialog = true"></a>
      </el-tab-pane>
    </el-tabs>
    <!--add site dialog-->
    <el-dialog
      :visible.sync="addSiteDialog"
      size="tiny">
      <div slot="title" style="text-align: center">
        <h2>添加站点</h2>
      </div>
      <el-form label-width="8rem">
        <el-form-item label="站点名称">
          <el-input v-model.trim = "siteInfo.siteName" placeholder="请输入站点名称"></el-input>
        </el-form-item>
        <el-form-item label="站点链接">
          <el-input placeholder="请输入站点链接"
                    v-model.trim = "siteInfo.siteUrl">
            <template slot="prepend">Http://</template>
          </el-input>
          <p v-if="errMsg" style="color: red">{{errMsg}}</p>
        </el-form-item>
      </el-form>
      <div style="width: 100%; text-align: center">
        <el-button type="primary"
                   style="width: 60%"
                   @click="submitSiteInfo()">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style scoped>
  .website a{
    padding-left: 2rem;
  }
</style>
<script>
  import {Notification} from 'element-ui'
  export default{
      data(){
          return{
              siteInfo:{
                siteType:"",
                siteName:"",
                siteUrl:""
              },   //添加的站点信息
              category:{},                    //站点分类
              sites:[],                       //所有自定义站点
              addSiteDialog: false,
              labelWidth: '8rem'
          }
      },
    methods:{
      getSiteList(){
        var self = this;
        $.post('/mainPage/mainPage/getSiteList',function(rcvData){
          if(rcvData.code == 0){
            self.category = rcvData.data.siteTypeMap;
            self.sites = rcvData.data.siteList;
          }
        },"json")
      },
      checkUrl(val){
        var reg = /\w+\.\w+\.\S+/i;
        return reg.test(val);
      },
      submitSiteInfo(){
        var self = this;
        $.post('/mainPage/mainPage/addSite',self.siteInfo,function (rcvData) {
            if(rcvData.code == 0){
                Notification.success({
                  message: rcvData.message? rcvData.message : "站点添加成功",
                  duration: 2000
                })
              self.addSiteDialog = false;
            }
            else {
              Notification.error({
                message: rcvData.message? rcvData.message : "站点添加失败",
                duration: 2000
              })
            }
        },'json')
      }
    },
    computed:{
      errMsg: function () {
        if(this.siteInfo.siteUrl && !/\w+\.\w+\.\S+/i.test(this.siteInfo.siteUrl)){
            return "请输入正确的网址"
        }else {
            return null;
        }
      }
    },
    beforeMount(){
      this.getSiteList();
    }
  }
</script>
