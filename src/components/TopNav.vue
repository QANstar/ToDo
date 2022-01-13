<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
    >
      <el-menu-item index="1">QAN-ToDo</el-menu-item>
      <el-menu-item index="2">总代办</el-menu-item>
      <el-menu-item index="3">天代办</el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ToDoMain extends Vue{
  private activeIndex:string = '2';
}
</script>