<template>
  <div>
    <el-button @click="openAdd()" type="primary" plain>添加</el-button>
    <el-drawer
      :title="drawerTitle"
      ref="addDrawer"
      :visible.sync="drawer"
      direction="ltr"
    >
      <el-form :model="addData" :rules="rules" ref="addForm" class="addForm">
        <el-form-item label="名称" prop="name">
          <el-input v-model="addData.name"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="addData.describe"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="addData.type" placeholder="请选择类型">
            <el-option
              v-for="item in type"
              :key="item.id"
              :label="item.type"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-date-picker
            v-model="addData.startDate"
            type="date"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="预计结束时间时间">
          <el-date-picker
            v-model="addData.endDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="优先级" prop="priority">
          <el-select v-model="addData.priority" placeholder="请选择优先级">
            <el-option
              v-for="item in priority"
              :key="item.id"
              :label="item.priority"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-select v-model="addData.state" placeholder="请选择状态">
            <el-option
              v-for="item in status"
              :key="item.id"
              :label="item.state"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <div style="float: right">
            <el-button type="success" plain @click="sureButton()"
              >确认</el-button
            >
          </div>
        </el-form-item>
      </el-form>
    </el-drawer>

    <el-table
      v-loading="loading"
      :data="tableData"
      style="width: 100%"
      :default-sort="{ prop: 'priority', order: 'descending' }"
    >
      <el-table-column prop="name" label="代办项目"> </el-table-column>
      <el-table-column prop="describe" label="代办细节"> </el-table-column>
      <el-table-column prop="type" label="类型"> </el-table-column>
      <el-table-column prop="startDate" label="开始时间"> </el-table-column>
      <el-table-column
        prop="endDate"
        label="预计结束时间时间"
      ></el-table-column>
      <el-table-column
        prop="priority"
        label="优先级"
        :filters="[
          { text: '高', value: '高' },
          { text: '中', value: '中' },
          { text: '低', value: '低' },
        ]"
        :filter-method="filterPriority"
        sortable
      >
        <template slot-scope="scope">
          <el-tag :type="priorityTag(scope.row.priority)" disable-transitions>
            {{ scope.row.priority }}
          </el-tag>
        </template></el-table-column
      >
      <el-table-column sortable prop="state" label="状态"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            @click="editRow(scope.row)"
            size="small"
            circle
          ></el-button>
          <el-popconfirm title="确定删除？" @confirm="deleteRow(scope.row)">
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="small"
              slot="reference"
            ></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>


<style scoped>
.addForm {
  padding: 20px;
}
</style>
<script lang="ts">
import axios from "axios";
import { Component, Prop, Vue } from "vue-property-decorator";
@Component
export default class ToDoMain extends Vue {
  private tableData: any = [];
  private drawer: boolean = false;
  private type: any = [];
  private priority: any = [];
  private status: any = [];
  private loading: boolean = true;
  private drawerTitle: string = "添加待办";
  private addData: any = {
    id: 0,
    name: "",
    describe: "",
    type: "",
    startDate: "",
    endDate: "",
    priority: "",
    state: "",
  };
  private rules: any = {
    name: [{ required: true, message: "请输入", trigger: "blur" }],
    type: [{ required: true, message: "请输入", trigger: "blur" }],
    priority: [{ required: true, message: "请输入", trigger: "blur" }],
    state: [{ required: true, message: "请输入", trigger: "blur" }],
  };
  public mounted(): void {
    this.getToDoData();
    this.getTypeData();
    this.getPriorityData();
    this.getStatusData();
  }
  //优先级标签
  public priorityTag(row): string {
    if (row == "高") {
      return "danger";
    } else if (row == "中") {
      return "primary";
    } else {
      return "success";
    }
  }
  //显示优先级筛选
  public filterPriority(value, row):boolean{
    return row.priority === value;
  }
  //添加待办
  public openAdd(): void {
    this.clearForm();
    this.drawerTitle = "添加待办";
    this.drawer = true;
  }
  //获取代办数据
  private getToDoData(): void {
    axios
      .get("https://localhost:44358/api/ToDo/getToDoList")
      .then((res: any) => {
        this.loading = false;
        if (res.status == 200) {
          this.tableData = res.data;
          console.log(res.data);
        } else {
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  }
  //获取类型数据
  private getTypeData(): void {
    axios
      .get("https://localhost:44358/api/ToDo/showType")
      .then((res: any) => {
        if (res.status == 200) {
          this.type = res.data;
        } else {
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  }
  //获取优先级数据
  private getPriorityData(): void {
    axios
      .get("https://localhost:44358/api/ToDo/showPriority")
      .then((res: any) => {
        if (res.status == 200) {
          this.priority = res.data;
        } else {
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  }
  //获取状态数据
  private getStatusData(): void {
    axios
      .get("https://localhost:44358/api/ToDo/showStatus")
      .then((res: any) => {
        if (res.status == 200) {
          this.status = res.data;
        } else {
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  }
  //添加待办请求
  private addToDo(): void {
    this.loading = true;
    axios
      .post("https://localhost:44358/api/ToDo/addToDo", this.addData)
      .then((res: any) => {
        this.loading = false;
        if (res.status == 200) {
          this.getToDoData();
          this.$message({
            message: "新增成功",
            type: "success",
          });
        } else {
        }
      })
      .catch((error: any) => {
        this.$message({
          message: "新增错误",
          type: "error",
        });
        this.loading = false;
        console.log(error);
      });
  }
  //编辑待办请求
  private editToDo(): void {
    this.loading = true;
    axios
      .put("https://localhost:44358/api/ToDo/editToDo", this.addData)
      .then((res: any) => {
        this.loading = false;
        if (res.status == 200) {
          this.getToDoData();
          this.$message({
            message: "编辑成功",
            type: "success",
          });
        } else {
        }
      })
      .catch((error: any) => {
        this.$message({
          message: "编辑错误",
          type: "error",
        });
        this.loading = false;
        console.log(error);
      });
  }
  //删除待办请求
  private deleteToDo(id: number): void {
    this.loading = true;
    axios
      .delete("https://localhost:44358/api/ToDo/deleteToDo?id=" + id)
      .then((res: any) => {
        this.loading = false;
        if (res.status == 200) {
          this.getToDoData();
          this.$message({
            message: "删除成功",
            type: "success",
          });
        } else {
        }
      })
      .catch((error: any) => {
        this.$message({
          message: "删除错误",
          type: "error",
        });
        this.loading = false;
        console.log(error);
      });
  }
  //清空表单
  private clearForm(): void {
    this.addData = {
      id: 0,
      name: "",
      describe: "",
      type: "",
      startDate: "",
      endDate: "",
      priority: "",
      state: "",
    };
  }
  //确认按钮
  public sureButton(): void {
    (this.$refs["addForm"] as any).validate((valid) => {
      if (valid) {
        if (this.addData.id == 0) {
          this.addToDo();
        } else {
          this.editToDo();
        }
        this.clearForm();
        (this.$refs["addDrawer"] as any).closeDrawer();
      } else {
        this.$message({
          message: "参数输入不完整",
          type: "error",
        });
      }
    });
  }
  //编辑按钮
  public editRow(row): void {
    let type: number;
    let priority: number;
    let state: number;
    this.type.forEach((x) => {
      if (x.type == row.type) {
        type = x.id;
      }
    });
    this.priority.forEach((x) => {
      if (x.priority == row.priority) {
        priority = x.id;
      }
    });
    this.status.forEach((x) => {
      if (x.state == row.state) {
        state = x.id;
      }
    });
    this.addData = {
      id: row.id,
      name: row.name,
      describe: row.describe,
      startDate: row.startDate,
      endDate: row.endDate,
      type: type,
      priority: priority,
      state: state,
    };

    this.drawerTitle = "编辑待办";
    this.drawer = true;
  }
  //删除按钮
  public deleteRow(row): void {
    this.deleteToDo(row.id);
  }
}
</script>