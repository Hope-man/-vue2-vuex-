<template>
    <div class="content-wrapper">
        <div class="page-header page-header-lg panel border-top-info" style="padding-bottom: 0;">
            <div class="page-header-content">
                <div class="page-title" style="padding: 17px 0;">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/user' }">提请审核</el-breadcrumb-item>
                        <el-breadcrumb-item :to="{path: '/user/detail', query: {id:id,userId:userId}}"><span v-for="item in items"><span v-if="item.name=='姓名'">{{item.value}}</span></span></el-breadcrumb-item>
                        <el-breadcrumb-item :to="{path: '/user/request', query: {id:id,userId:userId,auditStatus:auditStatus}}">极车公社_入会申请</el-breadcrumb-item>
                        <el-breadcrumb-item>查看详情（基础信息）</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </div>
        </div>

        <div class="panel-body panel panel-flat border-left-info">
                <ul class="list-group audit-list">
                    <li class="list-group-item" v-for="(item,index) in items">
                         <span>{{item.name}} : </span>
                         <span v-if="item.type=='string'">{{item.value}} </span>
                         <img v-if="item.type=='image' " :src="item.value" @click="photobig(index)" class="smallphoto"/>
                         
                    </li>
                </ul>
        </div>
        <template>
            <el-dialog title="放大图片" v-model="big" class="bigimg">
                <img :src="src"/>
            </el-dialog>
        </template>
    </div>
</template>
<script>
    import moment from  'moment'

    //    import Upload from '../../widgets/slect2'
    import {Upload, Radio} from 'element-ui'
    import {mapState, mapActions} from 'vuex'


    export default {
        data() {
            return {
                items:'',
                id:'',
                userId:'',
                src:'',
                big:false,
                auditStatus:'',
                namevalue:''
                
                
            }
        },
        component: {
            
            
        },
        methods: {
            
            ...mapActions([
                'examine_info'
            ]),
            photobig(index,it){
                this.src=this.items[index].value;
                this.big=true;
                
            }
            
            
            
        },
        computed: {
            ...mapState({
                 get_examine_info: state => state.get_examine_info
            })
        },
        watch: {
            'get_examine_info': {
                handler: function (n, o) {
                    this.items=n.data;
                }
            }
        },
        created() {
            this.id = this.$route.query.id;
            this.userId = this.$route.query.userId;
            this.auditStatus = this.$route.query.auditStatus;
            this.examine_info({id:this.id});


        },

        mounted() {
            

        },
        beforeMount() {
        },
    }
</script>


<style>
    .bigimg img{
        max-width:90%;
        
        margin:0 auto;
    }
    .smallphoto{
        max-height:200px;
        max-width:100px;
    }
    
</style>