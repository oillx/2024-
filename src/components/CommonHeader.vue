<template>
    <el-header>
        <div class="l-content">
            <!-- 图标的展示 -->
            <el-button size="small" plain @click="handleCollapse">
                <el-icon :size="20">
                    <Menu />
                </el-icon>
            </el-button>

            <!-- 面包屑 -->
            <el-breadcrumb separator="/" class="bread">
                <!-- 首页是一定存在，所以可以直接写死  -->
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item :to="{ path: current.path }" v-if="current">{{ current.label }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="r-content">
          <el-dropdown>
            <span class="el-dropdown-link">
                <img class="user" :src="imgSrc" alt="">
             </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item @click="handleLoginOut">退出</el-dropdown-item>
                </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
    </el-header>
</template>

<script setup> 
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
let store = useStore();
let router = useRouter();
const imgSrc = new URL('../assets/images/user.jpg',import.meta.url).href
let handleCollapse = () => {
    store.commit('updateIsCollapse')
}
// 计算属性获取current值
const current =  computed(() => 
    store.state.currentMenu
    );

// 退出登录
const handleLoginOut = () =>{
    // 清除菜单
    store.commit('cleanMenu')
    store.commit('clearToken')
    // 跳转到登录页面
    router.push({
        name: 'login'
    })
}
</script>

<style lang="less" scoped>
    .el-header {
        display: flex;
        justify-content: space-between;
        align-content: center;
        width: 100%;
        background: #333;
    }
    .r-content {
        margin: auto 0px;
        .user{
            width: 40px;
            height: 40px;
            border-radius: 30%;
        }
    }
    .l-content {
        display: flex;
        align-items: center;
        .el-button {
            margin-right: 20px;
        }
        h4 {
            color: #fff;
        }
    }

    :deep(.bread span) {
        color: #fff !important;
        cursor: pointer !important; /*设置鼠标悬停在元素上时的鼠标指针形状 */
    }
</style>