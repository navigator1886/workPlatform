<template>
  <el-row class="container">
    <!--header-->
    <el-col :span="24" class="header">
      <el-col :span="4" class="logo">
        <span>{{logo}}</span>
      </el-col>
      <el-col :span="16">
        <ul class="date">
          <li v-if="isLogin"><platform></platform></li>
          <li v-for="item in date">{{item.text}}</li>
        </ul>
      </el-col>
      <el-col :span="4" class="userInfo">
        <ul class="userInfo">
          <li><img src="../../static/icons/user.svg"></li>
          <li v-if="isLogin">{{userLogin.user}}</li>
          <li v-else><a @click="openLogin = true">登录</a></li>
        </ul>
      </el-col>
    </el-col>
    <!--main content-->
    <el-col :span="24" class="content">
      <!-- login dialog-->
      <el-dialog
        :visible.sync="openLogin"
        size="tiny">
        <div slot="title" style="text-align: center;">
          <h2>成员登录</h2>
        </div>
        <form class="dialogForm">
          <div class="dialogItem">
            <label>用户名</label>
            <div class="dialogInput">
              <input v-model.trim="userLogin.user" type="text"  placeholder="请输入用户名/工号">
            </div>
          </div>
          <div class="dialogItem">
            <label>密码</label>
            <div class="dialogInput">
              <input v-model.trim="userLogin.password" type="password"  placeholder="请输入密码">
              <p v-if="errMsg" style="color: red">{{errMsg}}</p>
            </div>
          </div>
        </form>
        <div slot="footer" style="text-align: center">
          <el-button type="primary" @click="postLoginForm()" style="width: 60%">登录</el-button>
        </div>
      </el-dialog>
      <!--search bar-->
      <el-col :span="24" class="searchbar">
        <form onsubmit="return baiduWithHttps(this)"
              action="http://www.baidu.com/baidu"
              target="_blank">
          <input name="tn" type="hidden" value="SE_zzsearchcode_shhzc78w">
          <!--<a href="https://www.baidu.com/" target="_blank">-->
          <!--<img src="https://www.baidu.com/img/baidu_jgylogo3.gif" alt="Baidu" align="bottom" border="0">-->
          <!--</a>-->
          <div class="input-group">
            <input type="text" placeholder="Search for..."
                   onfocus="checkHttps"
                   class="searchInput"
                   name="word"
                   size="30">
            <span><input type="submit"
                         class="searchBtn"
                         value="搜索一下"></span>
          </div>
        </form>
      </el-col>
      <!--sites-->
      <el-col :span="6"><i>.</i></el-col>
      <el-col :span="12"  class="sites">
        <web-sites></web-sites>
      </el-col>
      <el-col :span="6"><i>.</i></el-col>
    </el-col>
    <!--footer-->
    <el-col :span="24" class="footer">
      <span>Powered by Buff studio. all rights reserved@广州巴弗游信息科技有限公司</span>
    </el-col>
  </el-row>
</template>

<style scoped>
  a:hover{
    cursor: pointer;
  }
  .container{
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
  .header{
    position: absolute;
    height: 60px;
    line-height: 60px;
    color: #ffffff;
    left: 0;
    top: 0;
    background-color: #324057;
    padding-left: 2rem;
    padding-right: 2rem;
  }  .logo{
    font-size: 2.5rem;
    font-weight: bold;
  }  .date li{
    position: relative;
    float: left;
    padding-right: 2rem;
  }  .userInfo li{
    position: relative;
    float: left;
    padding-right: 4rem;
  }
  .footer{
    position: absolute;
    bottom: 0;
    left: 0;
    height: 60px;
    line-height: 60px;
    background-color: #EFF2F7;
    text-align: center;
  }
  .content{
    position: absolute;
    width: 100%;
    top: 60px;
    bottom: 60px;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .searchbar{
    width: 100%;
    position: relative;
    margin-top: 120px;
    text-align: center;
  }
  .searchInput{
    width: 30%;
    height: 34px;
    outline: none;
    -webkit-border-radius: 6px;
    --msgbox-border-radius: 6px;
    border-radius: 6px;
    border: 2px solid #E5E9F2;
  }
  .searchBtn{
    height: 38px;
    width: 8rem;
    border-radius: 6px;
    border: none;
    color: #ffffff;
    background-color: #20A0FF;
    outline: none;   /*去除聚焦后的边框*/
  }
  .sites{
    position: relative;
    margin-top: 80px;
  }
  .dialogItem{
    width: 100%;
    margin-top: 2.5rem;
    height: 36px;
    line-height: 36px;
  }
  .dialogItem label{
    display: inline-block;
    vertical-align: middle;
    width: 4rem;
  }
  .dialogInput{
    display: inline-block;
    vertical-align: middle;
    position: absolute;
    right: 15px;
    left: 6rem;
    height: 36px;
    line-height: 36px;
    border: 1px solid #E5E9F2;
    -webkit-border-radius: 6px;
    --msgbox-border-radius: 6px;
    -moz-border-radius: 6px;
    border-radius: 6px;
  }
  .dialogInput input{
    border: none;
    outline: none;
    width: 95%;
    padding-left: 10px;
  }
</style>
<script>
  import ElCol from "element-ui/packages/col/src/col"
  import { Notification } from 'element-ui'
  import '../assets/calendar-converter'
  import webSites from './sites.vue'
  import platform from './platform.vue'
  export default{
    components: {
        ElCol,
      webSites,
      platform
    },
    data(){
      var date = new Date(),
          day = date.getDate(),
          month = date.getMonth(),
          year = date.getFullYear();
      var ex = new CalendarConverter();
      var lunar = ex.solar2lunar(new Date(year,month,day))
      var isWorkday = "";
      if(lunar.week == "日" || lunar.week == "六"){
          isWorkday = "休息日"
      }
      else{
          isWorkday = "工作日";
      }
      return{
              logo:"BUFFGAME",
              userLogin:{
                user: "",               //登录用户名
                password:"",            //用户登录密码
              },
              errMsg:"",
              openLogin: false,        //是否打开登录窗口
              isLogin: false,          //判断用户是否登录
              date:[
                  {text: lunar.sMonth + '月' + lunar.sDay + '日'},  //公历
                  {text: lunar.lunarMonth + '月' + lunar.lunarDay + '日'}, //农历
                  {text: "星期" + lunar.week},  //星期几
                  {text: isWorkday}             //是否工作日
                  ],
          }
      },
      mounted(){
        this.isUserLogin();
    },
      methods:{
        isUserLogin(){
            var self = this;
          $.post('/login/login/isLogin',function (rcvData) {
            if(rcvData.data.isLogin){
                self.isLogin = true;
                self.userLogin.user = rcvData.data.user;
            }
            else{
                self.isLogin = false;
            }
          },"json");
        },
        postLoginForm(){
            var self = this;
            $.post("/login/login/loginUser",self.userLogin,function (rcvData) {
              if(rcvData.code == 0){
                  Notification.success({
                    message: rcvData.message? rcvData.message:"登录成功",
                    duration: 2000
                  })
                self.openLogin = false;
                self.isLogin = true;
              }
              else{
                  self.errMsg = rcvData.message? rcvData.message: "用户名或密码错误";
              }
            },"json")
        }
      }
  }
</script>
