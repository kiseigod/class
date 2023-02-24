import Vue from "vue";
import Router from "vue-router";

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Main',
            component: () => import('../views/Main'),
            redirect:'/home',
            children:[
                // {
                //     path: '/home',
                //     name: 'home',
                //     component: () => import('../views/Home'),
                // },
                // {
                //     path: '/mall',
                //     name: 'mall',
                //     component: () => import('../views/Mall'),
                // },
                // {
                //     path: '/user',
                //     name: 'user',
                //     component: () => import('../views/User'),
                // },
                // {
                //     path: '/page1',
                //     name: 'page1',
                //     component: () => import('../views/Other/pageOne.vue'),
                // },
                // {
                //     path: '/page2',
                //     name: 'page2',
                //     component: () => import('../views/Other/pageTwo.vue'),
                // }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component:() => import('../views/Login/login.vue')
        }
        
    ]
})
         
