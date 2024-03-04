<template>
  <div class="common-layout">
    
    <el-container class="lay-container">
        <common-aside/>
      <el-container>
         <common-header/>
         <CommonTab/>
        <el-main class="main-content">
            <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import CommonHeader from '../components/CommonHeader.vue'
import CommonAside from '../components/CommonAside.vue'
import CommonTab from '../components/CommonTab.vue';
    export default defineComponent({
        commonets: {
            CommonHeader,
            CommonAside,
            CommonTab
        }
    }) 
</script>

<style lang="less" >
.el-container {
    flex-wrap: wrap;
    align-items: flex-start;
    height: 100%;
}
.common-layout {
    .lay-container {
        flex-wrap: nowrap;
        width: 100%;
    }
    width: 100%;
    height: 100%;
    & > .el-container {
        height: 100%;
        & > .el-aside {
            height: 100%;
            background: #545c64;
        }
        
    }
}

/**修改全局的滚动条*/

/* 隐藏浏览器自带的滚动条 */
body::-webkit-scrollbar {
  width: 0; /* 调整滚动条宽度 */
}


/**滚动条的宽度*/
::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 10px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
}

/* 滚动槽 */
::-webkit-scrollbar-track {
    border-radius: 10px;
}

/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: rgba(109, 109, 109, 0.4);
    height: 120px;
}

/* 显示页面内的滚动条 */
.scrollable-content {
  overflow-y: auto; /* 启用垂直滚动条 */
}
.el-main {
    background-color: #f5f7f9;
    height: calc(100vh - 106px);
}
</style>
