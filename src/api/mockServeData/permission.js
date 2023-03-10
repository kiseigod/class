import Mock from 'mockjs'
export default {
    getMenu: config => {
        const { username, password } = JSON.parse(config.body)
        // 先判断用户是否存在
        // 判断账号和密码是否对应
        if (username === 'admin' && password === '666666') {
            return {
                code: 20000,
                data: {
                    menu: [
                        {
                            path: '/home',
                            name: 'home',
                            label: '首页',
                            icon: 's-home',
                            url: 'Home'
                        },
                        {
                            path: '/mall',
                            name: 'mall',
                            label: '商品管理',
                            icon: 's-goods',
                            url: 'Mall'
                        },
                        {
                            path: '/user',
                            name: 'user',
                            label: '用户管理',
                            icon: 'user',
                            url: 'User'
                        },
                        {
                            label: '其他',
                            icon: 'location',
                            children: [
                                {
                                    path: '/page1',
                                    name: 'page1',
                                    label: '页面1',
                                    icon: 'setting',
                                    url: 'Other/pageOne.vue'
                                },
                                {
                                    path: '/page2',
                                    name: 'page2',
                                    label: '页面2',
                                    icon: 'setting',
                                    url: 'Other/pageTwo.vue'
                                },
                            ]
                        }
                    ],
                    token: Mock.Random.guid(),
                    message: '获取成功'
                }
            }
        } else if (username !== '' && password !== '') {

            return {
                code: 20000,
                data: {
                    menu: [
                        {
                            path: '/home',
                            name: 'home',
                            label: '首页',
                            icon: 's-home',
                            url: 'Home/index'
                        },
                        {
                            path: '/mall',
                            name: 'mall',
                            label: '商品管理',
                            icon: 's-goods',
                            url: 'Mall/index'
                        },
                    ],
                    token: Mock.Random.guid(),
                    message: '获取成功'
                }
            }
        } else {
            return {
                code: -999,
                data: {
                    message: '用户名或密码错误'
                }
            }
        }
    }
}