<template>
<div class="content">
  <div class="formBox">
      <h2 style="text-align: center; margin-bottom: 20px">ToDo</h2>
        <div class="form-group">
          <label for="email">用户名</label>
          <input
            type="text"
            class="form-control"
            id="userName"
            v-model="userName"
          />
        </div>
        <div class="form-group">
          <label for="password">密码</label>
          <input
            type="password"
            class="form-control"
            id="password"
            v-model="password"
          />
        </div>
        <div class="form-group formButton">
          <button type="button" class="fcButton2" @click="loginF()">登录</button>
          <a href=""><button type="button" class="fcButton">注册</button></a>
        </div>
    </div>
</div>
    
</template>
<style scoped>
        .content{
            height: 100vh;
            width: 100vw !important;
            display: flex;
            align-items: center;
            background: none;
            justify-content: center;
            position: fixed;
            margin: 0 !important;
            background: url("../assets/img/talkBackground3.jpg");
            background-repeat: no-repeat;
            background-size:cover;
            background-attachment: fixed;

        }

</style>
<style scoped src="../assets/css/logStyle.css"></style>
<style scoped src="../assets/css/style.css"></style>
<script lang="ts">
import axios from "axios";
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Login extends Vue{
  private userName:string = "";
  private password:string = "";
  //登录
  public loginF():void {
    axios.post("https://localhost:44358/api/User/Login",{
      userName:this.userName,
      password:this.password
    }).then((res:any) => {
      if(res.status == 200){
        this.$store.commit('GET_USER', res.data);
        this.$router.push("/");
      }
      else{
        this.password=""
      }
    }).catch((error:any)=>{
      console.log(error);
    });

  }
}
</script>