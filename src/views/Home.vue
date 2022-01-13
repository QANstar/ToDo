<template>
  <div class="home">
    <button @click="jwtTest()">JWT测试</button>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import axios from 'axios';

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
  public jwtTest():void{
    axios.get("https://localhost:44358/api/User/Test2",).then((res:any) =>{
      console.log(res);
    })
  }
}
</script>
