<template>
    <el-container>
            <el-header>
                <TopNav/>
            </el-header>
            <el-main>
                <router-view/>
            </el-main>
        </el-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TopNav from '@/components/TopNav.vue'; // @ is an alias to /src
import axios from 'axios';

@Component({
  components: {
    TopNav,
  },
})
export default class Home extends Vue {

}
</script>