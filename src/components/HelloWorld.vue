<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(2)
</script>

<template>
  <h1>{{ msg }}</h1>
  
  <el-button type="button" @click="count++">count is {{ count }}</el-button>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
