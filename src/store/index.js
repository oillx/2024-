/*import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex);
import home from './home/home_index.js';
export default new Vuex.Store({
    modules:{
        home
    }
})*/

import { createStore } from 'vuex'
import Cookie from 'js-cookie'
export default createStore({
    state: {
        isCollapse: false,
        currentMenu: null,
        tabList: [
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 'home'
            }
        ],
        menu: [],
        token: ''
    },
    mutations: {
        updateIsCollapse(state,payload) {
            state.isCollapse = !state.isCollapse
        },
        selectMenu(state,val) {
            // 判断
            if(val.name == 'home') {
                state.currentMenu = null
            }else {
                state.currentMenu = val
                let result = state.tabList.findIndex(item => item.name === val.name)
                result == -1 ? state.tabList.push(val) : ''
            }
        },
        closeTab(state,val) {
            let result = state.tabList.findIndex(item => item.name === val.name)
            state.tabList.splice(result,1) //第一个参数是修改的起始位置（索引），第二个参数是要删除的元素个数。
        },
        setMenu(state,val) {
            state.menu = val;
            localStorage.setItem('menu',JSON.stringify(val))  // 数据在本地存储中通常以字符串的形式存在
        },
        // 用于界面刷新后，数据会丢失
        addMenu(state, router) {   
            if (!localStorage.getItem('menu')) {
                return;
            }       
            const menu = Array.from(JSON.parse(localStorage.getItem('menu')))
            state.menu = menu
            let menuArray = [];
            menu.forEach(item => {
                if (item.children) {
                  item.children = item.children.map(item => {
                    let url = `../views/${item.url}.vue`
        
                    item.component = () => import(url)
                    return item
                  })
                  menuArray.push(...item.children)
                } else {
                  let url = `../views/${item.url}.vue`
                  item.component = () => import(url)
                  menuArray.push(item)
                }
              })
        
            menuArray.forEach((item) => {
                router.addRoute('home1', item);
            });
        },
        // 清除菜单
        cleanMenu(state) {
            state.menu = []
            localStorage.removeItem('menu')
        },
        setToken(state,val) {
            state.token = val
            Cookie.set('token',val)
        },
        clearToken(state) {
            state.token = ''
            Cookie.remove('token')
        },
        getToken(state) {
            state.token = state.token || Cookie.get('token')
            
        }
    }
})