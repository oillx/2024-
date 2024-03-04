<template>
    <el-row class="home" :guttter="20">
        <el-col :span="6" class="col">
            <el-card shadow="hover">
                <div class="user">
                    <img src="../../assets/images/user.jpg" alt="">
                    <div class="userinfo">
                        <p class="name">Admin</p>
                        <p class="role">超级管理员</p>
                    </div>
                </div >

                <div class="login-info">
                    <p>上次登录时间：<span>2022-7-11</span></p>
                    <p>上次登录地点：<span>广东广州</span></p>
                </div>
            </el-card>
        </el-col>
        <el-col :span="18" class="col">      
            <div class="num">
                <el-card 
                    :body-style="{ display:'flex',padding:0 }"
                    v-for="item in CountData"
                    :key="item.name">               
                        <component 
                            class="icons" 
                            :is="item.icon" 
                            :style="{background:item.color}">
                        </component>            
                    <div class="detail">
                        <p class="count">￥{{ item.value }}</p>
                        <p class="txt">{{ item.name }}</p>
                    </div>
            </el-card>
            </div>
        </el-col>
  </el-row>
  <el-row class="home" :guttter="20">
        <el-col :span="8" style="margin-top: 20px;">
            <el-card shadow="hover" class="card2" >
            <el-table :data="tableData">
            <el-table-column v-for="value in tableLabel" :key="value.id" :prop="value.prop" :label="value.label"></el-table-column> 
            </el-table>
            </el-card>
        </el-col>

        <el-col :span="16" style="margin-top: 25px;">
            <el-card style="height: 290px;margin-left: 25px;">
                <div ref="echart" style="height: 280px;">

                </div>
            </el-card>
        </el-col>
    </el-row>
<!-- 复制代码 -->
    <el-row class="home" :guttter="20" style="margin-top: 25px;">
        <el-col :span="6" class="col">
            <el-card shadow="hover">
                <div class="user">
                    <img src="../../assets/images/user.jpg" alt="">
                    <div class="userinfo">
                        <p class="name">Admin</p>
                        <p class="role">超级管理员</p>
                    </div>
                </div >

                <div class="login-info">
                    <p>上次登录时间：<span>2022-7-11</span></p>
                    <p>上次登录地点：<span>广东广州</span></p>
                </div>
            </el-card>
        </el-col>
        <el-col :span="18" class="col">      
            <div class="num">
                <el-card 
                    :body-style="{ display:'flex',padding:0 }"
                    v-for="item in CountData"
                    :key="item.name">               
                        <component 
                            class="icons" 
                            :is="item.icon" 
                            :style="{background:item.color}">
                        </component>            
                    <div class="detail">
                        <p class="count">￥{{ item.value }}</p>
                        <p class="txt">{{ item.name }}</p>
                    </div>
            </el-card>
            </div>
        </el-col>
  </el-row>
    
</template>

<script setup>
    import { defineComponent,onMounted,ref,getCurrentInstance, reactive  } from 'vue'
    import * as echarts from 'echarts';
    import axios from 'axios'
    const { proxy } = getCurrentInstance()  
    let tableData = ref([]);
    let CountData = ref([]);
    const getTableList = async () => {
     // await axios.get("/home/getData").then((res)=>{
     //     console.log(res);
     //     tableData.value = res.data.data.tableData
     // })
        let res = await proxy.$api.getTableData();
        tableData.value = res.tableData
    }
    // 获取count数据
    const getCountData = async ()=> {
        let res = await proxy.$api.getCountData();
        CountData.value = res 
    }
    // 关于 echarts 表格的渲染部分
    let xOptions = reactive({
      // 图例文字颜色
      textStyle: {
        color: "#333",
      },
      grid: {
        left: "20%",
      },
      // 提示框
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        type: "category", // 类目轴
        data: [],
        axisLine: {
          lineStyle: {
            color: "#17b3a3",
          },
        },
        axisLabel: {
          interval: 0,
          color: "#333",
        },
      },
      yAxis: [
        {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
        },
      ],
      color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
      series: [],
    });
    let pieOptions = reactive({
        tooltip: {
        trigger: "item",
      },
      color: [
        "#0f78f4",
        "#dd536b",
        "#9462e5",
        "#a6a6a6",
        "#e1bb22",
        "#39c362",
        "#3ed1cf",
      ],
      series: [],
    });
    let orderData = reactive({
        xData: [],
        series: [],
    });
    let userData = reactive({
        xData: [],
        series: [],
    });
    let videoData = reactive({
        xData: [],
        series: [],
    });
    // 获取 echarts 数据
    const getEhartsData = async () => {
        let result = await proxy.$api.getChartsData();
        let res = result.orderData;
        let userRes = result.userData;
        let videoRes = result.videoData;
        orderData.xData = res.date;
        const keyArray = Object.keys(res.data[0]);
        const series = [];
        keyArray.forEach((key) => {
            series.push({
                name: key,
                data: res.data?.map((item) => item[key]),
                type: 'line',
            });
        });
        orderData.series = series;
        xOptions.xAxis.data = orderData.xData;
        xOptions.series = orderData.series;
        // 进行渲染
        let hEcharts = echarts.init(proxy.$refs['echart']);
        hEcharts.setOption(xOptions)
    };
    onMounted(()=>{
        getTableList();
        getCountData();
        getEhartsData();

    })
    const tableLabel = [
        {
            id: 1,
            label: '品牌',
            prop: 'name'
        },
        {
            id: 2,
            label: '今日购买',
            prop: 'todayBuy'
        },
        {
            id: 3,
            label: '本月购买',
            prop: 'monthBuy'
        },
        {
            id: 4,
            label: '总购买',
            prop: 'totalBuy'
        }
    ]
</script>

<style lang="less" scoped>
.home {
    .user {
        display: flex;
        align-items:center;
        padding-bottom: 20px;
        border-bottom: 1px solid #ccc;
        margin-bottom: 10px;
        img {
            width: 140px;
            height: 140px;
            border-radius: 30%;
            margin-right: 40px;
        }
        p{
            font-size: 14px;
            color: #666;
        }
    }
    .login-info {
        p{
            line-height: 30px;
            font-size: 14px;
            color: #999;
            text-align: left;
            span {
                color: #666;
                margin-left: 40px;
            }
        }
    }
}
/*
.col {
    margin-top: 20px
}
*/
.card2 {
    height: 300px;
}


.num {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-left: 16px;
    .el-card {
        width: 32%;
        margin-bottom: 20px;
        border-radius: 10px;
    }
    .icons {
        width: 74px;
        height: 74px;
        font-size: 30px;
        text-align: center;
        line-height: 74px;
        color: #fff
    }
    .detail{
        margin-left: 15px;
        display: flex;
        flex-direction: column;
        justify-content: left;
        .count {
            padding: 0px;
            font-size: 20px;
            margin-bottom: 5px;
        }
        .txt {
            font-size: 12px;
            text-align: center;
            color: #999;
        }
    }
}
</style>