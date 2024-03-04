/*
*环境配置文件
*一般在企业级项目里有三个环境
*开发环境
*测试环境
*线上环境
*/

const env = import.meta.env.MODE || 'prod'

const EnvConfig = {
    development: {
        baseApi: '/api',
        mockApi: ''
    },
    test: {
        baseApi: '//test.future.com/api',
        mockApi: ''
    },
    pro: {
        baseApi: '',
        mockApi: ''
    }
}

export default {
    env,
    //mock的总开关
    mock: true,
    ...EnvConfig[env]

}
