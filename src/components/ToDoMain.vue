<template>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="代办项目">
      </el-table-column>
      <el-table-column
        prop="describe"
        label="代办细节">
      </el-table-column>
      <el-table-column
        prop="type"
        label="类型">
      </el-table-column>
      <el-table-column
       prop="startDate"
        label="开始时间">
      </el-table-column>
      <el-table-column
        prop="endDate"
        label="预计结束时间时间">
      </el-table-column>
      <el-table-column
        prop="priority"
        label="优先级">
      </el-table-column>
      <el-table-column
        prop="state"
        label="状态">
      </el-table-column>
      <el-table-column
        label="操作">
      </el-table-column>
    </el-table>
</template>

<script lang="ts">
import axios from "axios";
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ToDoMain extends Vue{
  private tableData:any =[];

  //获取数据
  public mounted():void {
    axios.get("https://localhost:44358/api/ToDo/getToDoList").then((res:any) => {
      if(res.status == 200){
        console.log(res);
        this.tableData = res.data;
      }
      else{
      }
    }).catch((error:any)=>{
      console.log(error);
    });

  }
}
</script>