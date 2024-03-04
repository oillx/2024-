export default {
    getHomeData: () => {
        return {
            code: 200,
            data: {
                tableData: [
                    {
                        name: 'oppo',
                        todayBuy: 500,
                        monthBuy: 3500,
                        totalBuy: 22000
                    },
                    {
                        name: 'vivo',
                        todayBuy: 300,
                        monthBuy: 2200,
                        totalBuy: 24000
                    },
                    {
                        name: '小米',
                        todayBuy: 1200,
                        monthBuy: 2000,
                        totalBuy: 65000
                    },
                    {
                        name: '华为',
                        todayBuy: 1200,
                        monthBuy: 6500,
                        totalBuy: 34000
                    },
                    {
                        name: '苹果',
                        todayBuy: 350,
                        monthBuy: 3000,
                        totalBuy: 27000
                    },
                ]
            }
        }
    },
    getCountData: () => {
        return {
            code: 200,
            data: [
                {
                    name: "今日支付订单",
                    value: 1234,
                    icon: "SuccessFilled",
                    color: "#2ec7c9"
                },
                {
                    name: "今日收藏订单",
                    value: 210,
                    icon: "StarFilled",
                    color: "#ffb980"
                },
                {
                    name: "今日未支付订单",
                    value: 1698,
                    icon: "WarningFilled",
                    color: "#5ab1ef"
                },
                {
                    name: "本月支付订单",
                    value: 1698,
                    icon: "SuccessFilled",
                    color: "#2ec7c9"
                },
                {
                    name: "本月收藏订单",
                    value: 456,
                    icon: "StarFilled",
                    color: "#ffb980"
                },
                {
                    name: "本月未支付订单",
                    value: 852,
                    icon: "WarningFilled",
                    color: "#5ab1ef"
                },
                {
                    name: "本月总收入",
                    value: 85200,
                    icon: "HelpFilled",
                    color: "#FFB6C1"
                },
                {
                    name: "本月总支出",
                    value: 55200,
                    icon: "Histogram",
                    color: "#FFA54F"
                },
                {
                    name: "本年总收入",
                    value: 105200,
                    icon: "Promotion",
                    color: "#FF69B4"
                },

            ]  
        }
    },
    getChartsData: () => {
        return {
            code: 200,
            data: {
                orderData: {
                    date: ['20191001', '20191002', '20191003', '20191004', '20191005', '20191006', '20191007'],
                    "data|7": [{
                      "苹果": "@integer(1000, 5000)",
                      "小米": "@integer(1000, 5000)",
                      "华为": "@integer(1000, 5000)",
                      "oppo": "@integer(1000, 5000)",
                      "vivo": "@integer(1000, 5000)",
                      "一加": "@integer(1000, 5000)"
                    }]
                },
                videoData: [
                  {
                    name: '小米',
                    value: 2999
                  },
                  {
                    name: '苹果',
                    value: 5999
                  },
                  {
                    name: 'vivo',
                    value: 1500
                  },
                  {
                    name: 'oppo',
                    value: 1999
                  },
                  {
                    name: '魅族',
                    value: 2200
                  },
                  {
                    name: '三星',
                    value: 4500
                  }
                ],
                userData: [
                {
                    date: '周一',
                    new: 5,
                    active: 200
                  },
                  {
                    date: '周二',
                    new: 10,
                    active: 500
                  },
                  {
                    date: '周三',
                    new: 12,
                    active: 550
                  },
                  {
                    date: '周四',
                    new: 60,
                    active: 800
                  },
                  {
                    date: '周五',
                    new: 65,
                    active: 550
                  }
                ]
           }
        }
   },
}