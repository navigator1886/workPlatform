<template>
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
          <input v-model.trim="user" type="text"  placeholder="请输入用户名/工号">
        </div>
      </div>
      <div class="dialogItem">
        <label>密码</label>
        <div class="dialogInput">
          <input v-model.trim="password" type="password"  placeholder="请输入密码">
          <p style="color: red">* 密码出错</p>
        </div>
      </div>
    </form>
    <div slot="footer" style="text-align: center">
      <el-button type="primary" style="width: 60%">登录</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default{
      data(){
          return {
              user:"",
              password:"",
              openLogin: false,
              formLabelWidth: '4rem'
          }
      },
      methods:{

    }
  }
</script>
