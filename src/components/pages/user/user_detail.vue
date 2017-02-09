<template>
    <div class="base">
        <div class="page-header page-header-lg panel border-top-info">
            <div class="page-header-content">
                <div class="" >
                    <!--<h4><i class="icon-arrow-left52 position-left"></i> <span-->
                            <!--class="text-semibold">用户管理</span></h4>-->
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/user' }">用户管理</el-breadcrumb-item>
                        <el-breadcrumb-item></el-breadcrumb-item>
                        <!--<el-breadcrumb-item>活动列表</el-breadcrumb-item>-->
                        <!--<el-breadcrumb-item>活动详情</el-breadcrumb-item>-->
                    </el-breadcrumb>
                </div>
            </div>

        </div>


        <div class="tabbable">
            <ul class="nav nav-tabs nav-tabs-top top-divided">
                <li :class="{'active': $route.path === '/user/detail' || $route.path.match('user/detail/userInfo') }">
                    <router-link :to="{path:'/user/detail', query:{userId: `${userId}`}}">用户信息</router-link>
                </li>
                <li :class="{'active': $route.path === '/user/detail/audit'}">
                    <router-link :to="{path: '/user/detail/audit', query:{userId: `${userId}`}}">审核信息</router-link>
                </li>
            </ul>
        </div>


        <div class="panel panel-flat border-left-info">
            <div class="tab-content">
                <div class="tab-pane active">
                    <router-view></router-view>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                userId: '',

              
            }
        },
        created() {
            this.userId = this.$route.query.userId;
 


        }
    }
</script>