<template>
    <el-row class="home" :gutter="20" style="margin:0">
        <el-col :span="8" style="margin-top:20px">
            <el-card shadow="hover">
                <div slot="header" class="user">
                    <img :src="userImg">
                    <div class="userinfo">
                        <p class="name">Admin</p>
                        <p class="access">超级管理员</p>
                    </div>
                </div>
                <div class="login-info">
                    <p class="p">上次登录时间:<span>2022-8-30</span></p>
                    <p>上次登录地点:<span>武汉</span></p>
                </div>
            </el-card>
            <el-card style="margin-top: 20px; height: 432px;">
                <el-table :data="tableData">
                      <el-table-column v-for="(val,key) in tableLabel" :key="key" 
                      :prop="key"
                      :label="val"
                      >
                      </el-table-column>               
                </el-table>
            </el-card>
        </el-col>
        <el-col :span="16" style="margin: 20px 10px 0 10px;">
            <div class="num">
                <el-card v-for="item in countData" :key="item.name" class="card" :body-style="{ padding: '0px'}">
                    <i class="icon" :class="`el-icon-${item.icon}`" :style="{background:item.color}"></i>
                    <div class="detail">
                        <p class="num1">￥{{item.value}}</p>
                        <p class="txt">{{item.name}}</p>
                    </div>
                </el-card>
            </div>
            <el-card style="height: 270px;text-align: center;">
                <div style="height: 270px;" ref="echarts"></div>
            </el-card>
            <div class="graph" >
                <el-card style="height:230px" class="el" >
                    <div style="height:230px" ref="userEchrats"></div>
                </el-card>
                <el-card style="height:230px;" :body-style="{ padding: '0px'}">
                    <div style="height:220px" ref="videoEchrats"></div>
                </el-card>
            </div>
        </el-col>
    </el-row>
</template>

<script>
import {getData} from '../../api/data'
import * as echarts from 'echarts'

export default {
    name: 'Home',
    data () {
        return {
            userImg: require('../../assets/g1.jpg'),
            tableData: [],
            tableLabel: {
                name: '课程',
                todayBuy: '今日购买',
                monthBuy: '本月购买',
                totalBuy: '总购买',
            },
            countData: [
                {
                    name: '今日支付订单',
                    value: 1234,
                    icon: 'success',
                    color:'#2ec7c9'
                },
                {
                    name: '今日收藏订单',
                    value: 210,
                    icon: 'star-on',
                    color:'#ffb980'
                },
                {
                    name: '今日未支付订单',
                    value: 1234,
                    icon: 's-goods',
                    color:'#5ab1ef'
                },
                {
                    name: '本月支付订单',
                    value: 1234,
                    icon: 'success',
                    color:'#2ec7c9'
                },
                {
                    name: '本月收藏订单',
                    value: 210,
                    icon: 'star-on',
                    color:'#ffb980'
                },
                {
                    name: '本月未支付订单',
                    value: 1234,
                    icon: 's-goods',
                    color:'#5ab1ef'
                },
            ]
        }
    },
    mounted(){
        getData().then(res => {
            const { code, data } = res.data
            if (code === 20000) {
                this.tableData = data.tableData
                const order = data.orderData
                const xData = order.date
                const keyArray = Object.keys(order.data[0])
                const series = []
                keyArray.forEach(key => {
                    series.push({
                        name: key,
                        data: order.data.map(item => item[key]),
                        type:'line'
                    })
                })
                 // 课程折线图
                const option = {
                    xAxis: {
                        data: xData
                    },
                    yAxis: {},
                    legend: {
                        data:keyArray
                    },
                    series
                }
                const E = echarts.init(this.$refs.echarts)
                E.setOption(option)

                // 用户柱状图
                const userOption = {
                    legend: {
                        // 图例文字颜色
                        textStyle: {
                            color: '#333',
                        },
                    },
                    grid: {
                        left: '20%',
                    },
                    // 提示框
                    tooltip: {
                        trigger: 'axios',
                    },
                    xAxis: {
                        type: 'category', // 类目轴
                        data: data.userData.map(item => item.date),
                        axisLine: {
                            color: '#17b3a3'
                        }
                    },
                    axisLabel: {
                        interval: 0,
                        color: '#333'
                    },
                    yAxis: [
                        {
                            type: 'value',
                            axisLine: {
                                lineStyle: {
                                    color:'#17b3a3'
                                }
                            }
                        }
                    ],
                    color: ['#2ec7c9', '#b6a2de'],
                    series: [
                        {
                            name: '新增用户',
                            data: data.userData.map(item => item.new),
                            type:'bar'
                        },
                        {
                            name: '活跃用户',
                            data: data.userData.map(item => item.active),
                            type:'bar'
                        }
                    ]
                }
                const U = echarts.init(this.$refs.userEchrats)
                U.setOption(userOption)

                //饼图
                const videoOption = {
                    tooltip: {
                        trigger:'item',
                    },
                    color: [
                        '#0f78f4',
                        '#dd536b',
                        '#9462e5',
                        '#a6a6a6',
                        '#e1bb22',
                        '#39c362',
                        '#3ed1cf',
                    ],
                    series: [
                        {
                            data: data.videoData,   
                            type:'pie'
                        }
                    ],
                }
                const V = echarts.init(this.$refs.videoEchrats)
                V.setOption(videoOption)
            }
        })
   }
}
</script>

<style lang="less" scoped>
.home{
    display: flex;
    justify-content: space-between;
    height: 100%;
    width: 100%;
}
.user{
    display: flex;
    align-items: center;
    img{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    }
    .userinfo{
        margin-left: 30px;
        .name{
            font-size: 30px;
        }
        .access{
            margin-top: 3px;
            font-size: 10px;
        }
    }
}
.login-info{
    font-size: 10px;
    .p{
        margin-bottom: 10px;
    }
    span{
        margin-left: 50px;
    }
}
.num{
    display:flex;
	flex-wrap: wrap;
    justify-content: space-between;
    .card{
        width: 31%;
        margin: 0 10px 15px 0;
    }
    .icon{
        float: left;
        width: 60px;
        height: 60px;
        font-size: 25px;
        text-align: center;
        line-height: 60px;
    }
    .detail{
        margin-left: 70px;
        line-height: 30px;
        .num1{
            font-size: 20px;
        }
        .txt{
            font-size: 10px;
        }
    }
}
.graph{
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        .el-card{
            flex: 1;
        }
        .el{
            margin-right: 15px;
        }
        .el-card__body{
                padding: 0;
            }
    }
</style>