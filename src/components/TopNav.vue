<template>
  <div>
    <el-menu
      :default-active="$route.path"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="/home" route="">QAN-ToDo</el-menu-item>
      <el-menu-item index="/main" route="">总代办</el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ToDoMain extends Vue {
  public handleSelect(key, keyPath): void {
    this.$router.push(key);
  }
}
</script>