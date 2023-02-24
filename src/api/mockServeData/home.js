import Mock from 'mockjs'

let List = []
export default {
    getStatisticalData: () => {
        for (let i = 0; i < 7; i++){
            List.push(
                Mock.mock({
                    Java: Mock.Random.float(100, 8000, 0, 0),
                    Js: Mock.Random.float(100, 8000, 0, 0),
                    C: Mock.Random.float(100, 8000, 0, 0),
                    Node: Mock.Random.float(100, 8000, 0, 0),
                    Python: Mock.Random.float(100, 8000, 0, 0),
                    Php: Mock.Random.float(100, 8000, 0, 0),
                })
            )
        }
        return {
            code: 20000,
            data: {
                // 饼图
                videoData: [
                    {
                        name: 'Java',
                        value:5999
                    },
                    {
                        name: 'Js',
                        value:2999
                    },
                    {
                        name: 'C',
                        value:1500
                    },
                    {
                        name: 'Node',
                        value:1999
                    },
                    {
                        name: 'Python',
                        value:4999
                    },
                    {
                        name: 'PhP',
                        value:2340
                    },
                ],
                // 柱状图
                userData: [
                    {
                        date: '周一',
                        new: 5,
                        active:200
                    },
                    {
                        date: '周二',
                        new: 10,
                        active:200
                    },
                    {
                        date: '周三',
                        new: 12,
                        active:200
                    },
                    {
                        date: '周四',
                        new: 40,
                        active:200
                    },
                    {
                        date: '周五',
                        new: 60,
                        active:200
                    },
                    {
                        date: '周六',
                        new: 53,
                        active:200
                    },
                    {
                        date: '周日',
                        new: 39,
                        active:200
                    }
                ],
                // 折线图
                orderData: {
                    date: ['20220901', '20220902', '20220903', '20220904', '20220905', '20220906', '20220907'],
                    data: List
                },
                tableData: [
                    {
                        name: 'Java',
                        todayBuy: '1200',
                        monthBuy: '4500',
                        totalBuy: '56000',
                    },
                    {
                        name: 'Js',
                        todayBuy: '300',
                        monthBuy: '2200',
                        totalBuy: '19000',
                    },
                    {
                        name: 'C',
                        todayBuy: '500',
                        monthBuy: '2500',
                        totalBuy: '20000',
                    },
                    {
                        name: 'Node',
                        todayBuy: '240',
                        monthBuy: '1500',
                        totalBuy: '13000',
                    },
                    {
                        name: 'Python',
                        todayBuy: '800',
                        monthBuy: '3500',
                        totalBuy: '45000',
                    },
                    {
                        name: 'PhP',
                        todayBuy: '500',
                        monthBuy: '3500',
                        totalBuy: '24000',
                    },
                ]
            }
        }
    }
}