import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/pages/index'
import Login from '@/pages/login'
import User from '@/pages/user'
import FeedBack from '@/pages/feedBack'
import MyFeedBack from '@/pages/myFeedBack'
import MyFeedBackDetail from '@/pages/myFeedBackDetail'
import Search from '@/pages/search'
import test from '@/pages/test'
import foodDetail from '@/pages/foodDetail'

import superIndex from '@/pages/super/index'
import Reply from '@/pages/super/reply'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Index',
            component: Index
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/user',
            name: 'user',
            component: User
        },
        {
            path: '/feedBack',
            name: 'feedBack',
            component: FeedBack
        },
        {
            path: '/myFeedBack',
            name: 'myFeedBack',
            component: MyFeedBack
        },
        {
            path: '/myFeedBackDetail/:fid',
            name: 'myFeedBackDetail',
            component: MyFeedBackDetail
        },
        {
            path: '/search',
            name: 'search',
            component: Search
        },
        {
            path: '/foodDetail/:foodId',
            name: 'foodDetail',
            component: foodDetail
        },
        {
            path: '/test',
            name: 'test',
            component: test
        },
        {
            path: '/super',
            name: 'super',
            component: superIndex,
            children: [{
                path: 'reply',
                name: 'reply',
                component: Reply
            }]
        }
    ]
})
