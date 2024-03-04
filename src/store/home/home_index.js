// 存放home数据
const state = {
    isCollapse: false,
    currentMenu: null,
    tabList: [
        {
            path: '/',
            name: 'home',
            label: '首页',
            icon: 'home'
        }
    ]
};
const mutations = {
    updateIsCollapse(state,payload) {
        state.isCollapse = !state.isCollapse
    },
    selectMenu(state,val) {
        // 判断
        state.currentMenu = val.name === "home" ? null : val;
    }
};
const actions = {

};
const getters = {

}
export default {
    state,
    mutations,
    actions,
    getters,
}