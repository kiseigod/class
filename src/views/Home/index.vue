<template>
    <el-row class="home" :gutter="20" style="margin:0">
        <el-col :span="8">
            <el-card shadow="hover">
                <div slot="header" class="user">
                    <img :src="userImg">
                    <div class="userinfo">
                        <p class="name">admin</p>
                        <p class="access">超级管理员</p>
                    </div>
                </div>
                <div class="login-info">
                    <p class="p">上次登录时间:<span>2022-8-30</span></p>
                    <p>上次登录地点:<span>武汉</span></p>
                </div>
            </el-card>
            <el-card style="margin-top: 20px; height: 400px;">
                <el-table :data="tableData">
                      <el-table-column v-for="(val,key) in tableLabel" :key="key" 
                      :prop="key"
                      :label="val"
                      >
                      </el-table-column>               
                </el-table>
            </el-card>
        </el-col>
        <el-col :span="16" style="margin: 0 10px 0 10px;">
            <div class="num">
                <el-card v-for="item in countData" :key="item.name" class="card" :body-style="{ padding: '0px'}">
                    <i class="icon" :class="`el-icon-${item.icon}`" :style="{background:item.color}"></i>
                    <div class="detail">
                        <p class="num1">￥{{item.value}}</p>
                        <p class="txt">{{item.name}}</p>
                    </div>
                </el-card>
            </div>
            <el-card style="height: 250px;margin-bottom: 10px;">
                <!-- <div style="height: 270px;" ref="echarts"></div> -->
                <Echart :chartData="echartData.order" style="height: 270px;"/>
            </el-card>
            <div class="graph" >
                <el-card style="height:220px" class="el" >
                    <!-- <div style="height:230px" ref="userEchrats"></div> -->
                    <Echart :chartData="echartData.user" style="height:230px"/>
                </el-card>
                <el-card style="height:220px;" :body-style="{ padding: '0px'}">
                    <!-- <div style="height:220px" ref="videoEchrats"></div> -->
                    <Echart :chartData="echartData.video" :isAxisChart="false" style="height:230px"/>
                </el-card>
            </div>
        </el-col>
    </el-row>
</template>

<script>
import {getData} from '../../api/data'
import Echart from '../../components/Echarts.vue'

export default {
    name: 'Home',
    components:{Echart},
    data () {
        return {
            username: '',
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
            ],
            echartData: {
                order: {
                    xData: [],
                    series:[]
                },
                user: {
                    xData: [],
                    series:[]
                },
                video: {
                    series:[]
                }
            }
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
                        type: 'line'
                    })
                })
                // 课程折线图
                this.echartData.order.xData = xData
                this.echartData.order.series = series

                // 用户柱状图
                this.echartData.user.xData = data.userData.map(item => item.date),
                this.echartData.user.series = [
                        {
                            name: '新增用户',
                            data: data.userData.map(item => item.new),
                            type: 'bar'
                        },
                        {
                            name: '活跃用户',
                            data: data.userData.map(item => item.active),
                            type: 'bar'
                        }
                    ]

                //饼图
                this.echartData.video.series = [
                    {
                        data: data.videoData,
                        type: 'pie'
                    }
                ]
            }
        })
    },
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
        margin: 0 10px 14px 0;
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