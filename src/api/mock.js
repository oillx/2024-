import Mock from 'mockjs'
import homeApi from './mockData/home.js'
import userApi from './mockData/user.js'
import permissionApi from './mockData/permission.js'
//  使用了 Mock.js 库, 拦截 Ajax 请求
//  第一个参数：模拟请求的 URL，当应用中有 Ajax 请求发起到 /home/getCountData 路径时，Mock.js 将拦截这个请求
// 第二个参数：用于生成模拟数据的方法。当请求被拦截时，Mock.js 将调用这个函数，并使用函数的返回值作为模拟数据。
Mock.mock('/home/getTableData',homeApi.getHomeData)
Mock.mock('/home/getCountData',homeApi.getCountData)
// Mock.mock('/home/getChartsData',homeApi.getChartsData);// 
const data = Mock.mock('/home/getChartsData',{
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
  });












  
  //本地获取user的数据
Mock.mock(/user\/getUser/, 'get', userApi.getUserList)
Mock.mock(/user\/add/, 'post', userApi.createUser)
Mock.mock(/user\/edit/, 'post', userApi.updateUser)
Mock.mock(/user\/delete/, 'get', userApi.deleteUser)

  //本地获取permission的数据
Mock.mock(/permission\/getMenu/, 'post', permissionApi.getMenu)