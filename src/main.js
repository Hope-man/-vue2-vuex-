import Vue from 'vue'
// import Validator from 'vue-validator'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import App from './App'




import fill_info from './components/pages/home/fill_info'
import home from './components/pages/home/home'
import not from './components/pages/NotFound'
import user from './components/pages/user/user_list'
import user_detail from './components/pages/user/user_detail'
import user_detail_xinxi from './components/pages/user/user_detail_xinxi'
import user_audit from './components/pages/user/user_detail_audit'
import user_request from './components/pages/user/user_detail_request'
import userDetail from './components/pages/user/user_detail_xianqing'
import bs_model from './components/pages/bs_model/bs_list'
import model_detail from './components/pages/bs_model/bs_detail'
import model_some from './components/pages/bs_model/bs_some'
import center from './components/pages/data_center/center_list'
import supplier from './components/pages/supplier/supplier_list'
import home_audit from './components/pages/home/audit_info'


import 'element-ui/lib/theme-default/index.css'


Vue.use(VueRouter);
Vue.use(ElementUI);

// routing
// var router = new VueRouter({
//     linkActiveClass: 'active',
//     history: true
//     // history: process.env.NODE_ENV  === 'production' ? false : true
// });


const routes = [
    {path: '/home', component: home},
    {path: '/home/fill_info', component: fill_info},
    {path: '/home/audit', component: home_audit},
    {path: '/user', component: user},
    {path: '/model', component: bs_model},
    {path: '/model/detail', component: model_detail},
    {path: '/model/some', component: model_some},
    {path: '/center', component: center},
    {path: '/supplier', component: supplier},
    {path: '/user', component:user},
    {path: '/user/detail',component:user_detail,
        children:[
            {path:'/', component:user_detail_xinxi},
            {path:'userInfo', component:user_audit},
            {path:'audit',component:user_audit}
            
        ]},
    {path:'/user/request', component:user_request},
    {path:'/user/userDetail', component:userDetail},

    {path: '/user/detail/user_detail_audit',component:user_audit},
    {path: '/model', component:bs_model},
    {path: '/model/detail', component:model_detail},
    {path: '/center', component:center},
    {path: '/supplier', component:supplier},
    {path: '/', component: home},
    {path: '*', component: not},
];

const router = new VueRouter({
    mode: 'history',
    routes
});




const app = new Vue({
    router: router,
    render: h => h(App)
}).$mount('#app');

export default router