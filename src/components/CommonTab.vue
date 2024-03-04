<template>
    <div class="tags">
        <el-tag
        v-for="(tag,index) in tags"
        :key="tag.name"
        :closable="tag.name !== 'home'"
        :disable-transitions="false"
        :effect="$route.name === tag.name ? 'dark' : 'plain'"
        @click="changeMenu(tag)"
        @close="handleCloseTags(tag,index)">
        {{ tag.label }}
        </el-tag>
    </div>
</template>

<script setup>
import { useRouter,useRoute } from 'vue-router';
import { useStore } from 'vuex';
    const store = useStore();
    const tags = store.state.tabList;
    const router = useRouter();
    // 点击
    const changeMenu = (item) => {
    router.push({ name: item.name })
    }
    const handleCloseTags = (tag,index) =>{
        let length = tags.length - 1;
        store.commit('closeTab',tag)
        // 判断处理
        if (index === length) { //标签为最后一位时
            router.push({
                name:tags[index-1].name
            })
        }else {
            router.push({
                name: tags[index].name
            })
        }
    }

</script>

<style lang="less" scoped>
.tags {
    width: 100%;
    text-align: left;
    padding-left: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    .el-tag {
        margin-right: 15px;
        cursor: pointer;
    }
}
</style>
