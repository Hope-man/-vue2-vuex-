<template>
    <div class="content-wrapper audit-page">
        <div class="page-header page-header-lg panel border-top-info" style="padding-bottom: 0;">
            <div class="page-header-content">
                <div class="page-title" style="padding: 17px 0;">
                    <!--<h4><i class="icon-arrow-left52 position-left"></i> <span class="text-semibold">提请审核 > 张三 > 极车公社_入会申请(2016/9/17)</span>-->
                    <!--</h4>-->
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/user' }">提请审核</el-breadcrumb-item>
                        <el-breadcrumb-item :to="{path: '/user/detail', query: {id:id,userId:userId}}">
                            {{base_info.user_name || '-'}}
                        </el-breadcrumb-item>
                        <el-breadcrumb-item>极车公社_入会申请</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </div>
        </div>
        <!--基础信息-->
        <div class="panel panel-flat border-left-info">
            <div class="panel-heading">
                <h6 class="panel-title">基础信息</h6>
            </div>
            <div class="panel-body">
                <div class="row">
                    <div class="col-lg-3" v-if="base_info.user_type=='0'">
                        姓名 : {{base_info.user_name || '-'}}
                    </div>
                    <div class="col-lg-3" v-if="base_info.user_type=='0'">
                        电话 : {{base_info.phone || '-'}}
                    </div>
                    <div class="col-lg-3" v-if="base_info.user_type=='0'">
                        身份证号 : {{base_info.idcard || '-'}}
                    </div>
                    <div class="col-lg-4" v-if="base_info.user_type=='1'">
                        公司 : {{base_info.user_name || '-'}}
                    </div>
                    <div class="col-lg-4" v-if="base_info.user_type=='1'">
                        工号 : {{base_info.idcard || '-'}}
                    </div>
                    <div class="col-lg-2">
                        <router-link
                                :to="{path:'/user/userDetail', query:{id: `${id}`,userId:`${userId}`,auditStatus:auditStatus}}">
                            用户信息
                        </router-link>
                    </div>
                </div>
            </div>
        </div>


        <!--查询结果-->
        <div class="panel panel-flat border-left-info">
            <div class="panel-heading">
                <h6 class="panel-title">查询结果</h6>
            </div>
            <div class="panel-body">
                <div v-if="list.length==0">无</div>

                <ul class="list-group audit-list" v-if="list.length>0">
                    <li class="list-group-item" v-for="(item,index) in list">
                        <div class="col-lg-6">
                            {{item.name || '-'}}
                        </div>
                        <div class="col-lg-4">
                            {{item.value || '-'}}<i v-if="item.value=='一致'" class="icon-checkmark3 text-success"></i><i
                                v-if="item.value=='不一致'" class="icon-cross2 text-danger-400"></i>
                        </div>
                        <div class="col-lg-2" v-if="item.hasDetail">
                            <div v-if="item.hasDetail" @click="detailxinxi(index)">详细信息</div>
                        </div>
                    </li>

                </ul>
            </div>
        </div>


        <!--审核结果-->
        <div class="panel panel-flat border-left-warning">
            <div class="panel-heading">
                <h6 class="panel-title">审核结果</h6>
            </div>
            <div class="panel-body">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm"
                         v-if="auditStatus=='1'||auditStatus=='0'">
                    <div class="form-group">
                        <div class="col-sm-7">
                            <el-form-item label="审核结果" prop="result">
                                <template>
                                    <el-radio-group v-model="ruleForm.result">
                                        <el-radio label="1">待定</el-radio>
                                        <el-radio label="2">通过</el-radio>
                                        <el-radio label="3">驳回</el-radio>
                                    </el-radio-group>
                                </template>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-6">
                            <el-form-item label="备注" prop="remark">
                                <el-input type="textarea" v-model="ruleForm.remark"></el-input>
                            </el-form-item>
                        </div>
                        <div class="col-sm-6">
                        </div>

                    </div>
                    <div class="form-group">
                        <div class="col-sm-6">
                            <el-button class="butt" type="primary" @click="submitStatus()"> 确 定</el-button>
                        </div>


                    </div>
                </el-form>

                <div v-if="auditStatus=='2'">审核结果:已通过</div>
                <div v-if="auditStatus=='3'">审核结果:已驳回</div>

            </div>
        </div>

        <div class="panel panel-flat border-left-info">
            <div class="panel-heading">
                <h6 class="panel-title">操作日志</h6>
            </div>
            <div class="panel-body">

                <template>
                    <el-table
                            :data="loglist"
                            border
                            style="width: 100%"
                    >
                        <el-table-column
                                prop="audit_status_display"
                                label="审核状态"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                inline-template
                                label="审核人"
                                width="120">
                            <span>
                            {{row.modifier || '-'}}
                        </span>
                        </el-table-column>
                        <el-table-column
                                prop="modifier_time"
                                label="审核时间"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                inline-template

                                label="备注"
                                width="100">
                        <span>
                            {{row.remark || '-'}}
                        </span>
                        </el-table-column>
                    </el-table>
                </template>
            </div>
            <div class="block" style="text-align: center;margin-top: 30px">
                <el-pagination
                        @current-change="handleCurrentChange"
                        :current-page="page.page"
                        :page-size="1"
                        layout="prev, pager, next, jumper"
                        :total="page.total">
                </el-pagination>
            </div>
        </div>


        <template>
            <el-dialog :title="namename" v-model="detail" :id="namename=='企业信息查询服务' ? 'bigbig' :''">
                <ul class="panel-body panel panel-flat lili">
                    <li v-for="item in detaillist" :class="item.hasDetail ? 'col-lg-12' : 'col-lg-6'">
                        {{item.name}} : {{item.value}}
                        <div v-if="item.hasDetail">
                            <ul class="panel-body panel panel-flat">
                                <li v-for="ite in item.detail" class="col-lg-6 lili">
                                    {{ite.name}} : {{ite.value}}
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>

            </el-dialog>
        </template>

        <template>
            <el-dialog title="提示" v-model="remark" class="noremark">
                <div>驳回请输入备注</div>
            </el-dialog>
            <el-dialog title="提示" v-model="shenhe" class="noremark">
                <div>请更改审核结果</div>
            </el-dialog>
        </template>
</template>


</div>
</template>
<script>


    import moment from 'moment'

    import {Select, Radio} from 'element-ui'
    import audit from './user_detail_audit.vue'


    import {mapState, mapActions} from 'vuex'

    export default {
        data() {
            return {
                detaillist: '',
                detail: false,
                namename: '',
                id: '',
                shenhe:false,
                userId: '',
                auditStatus: '',
                status: '',
                remark: false,
                // userType:'',
                // servicePlatform:'',
                // userName:'',
                base_info: [],
                dia: false,
                list:[],
                loglist: [],
                ruleForm: {//验证
                    result: '1',
                    remark: ''
                },
                page: {
                    total: 1,
                    page_size: 10,
                    page: 1
                },
                items: [],
                rules: {
                    // remark: [
                    //     {required: true, message: '请输入备注', trigger: 'blur'},
                    //     {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    // ],
                    // result: [
                    //     {required: true, message: '选择审核结果', trigger: 'change'}
                    // ],
                },
            }
        },
        component: {
            Select,
            audit
        },

        watch: {
            'get_user_id': {
                handler: function (n, o) {
                    if (n.code !== '0000') {
                        return false
                    }


                    this.base_info = n.data;

                    this.audit_result({
                        id: this.id
                    });


                }
            },
            'get_audit_result': {
                handler: function (n, o) {
                    if (n.code !== '0000') {
                        return false
                    }

                    this.list = n.data;

                }
            },
            'get_audit_log': {
                handler: function (n, o) {
                    if (n.code !== '0000') {
                        return false
                    }

                    this.loglist = n.data.items.map(item => {
                        item.modifier_time = item.modifier_time ? moment(item.modifier_time).format('YYYY-MM-DD HH:mm:ss') : '-';
                        item.remark = item.remark ? item.remark : '－';
                        item.audit_status_display = item.audit_status == 0 ? "待审核" :
                                                    item.audit_status == 1 ? '审核中' :
                                                    item.audit_status == 2 ? '已通过' :
                                                    '已驳回';
                        this.page.total = n.data.total_page;
                        this.page.page_size = n.data.page_size;

                        return item;
                    });
                    this.page.total = n.data.total_page;
                    this.page.page_size = n.data.page_size;

                }
            },
            'get_audit_status': {
                handler: function (n, o) {
                    if (n.code !== '0000') {
                        return false
                    }

                }
            },

        },
        methods: {
            sub() {

            },
            ...mapActions([
                'user_id',
                'audit_result',
                'audit_log',
                'audit_status'

            ]),
            lookRow(a) {
                
            },
            lookdetail(){
                this.dia = true;
            },
            submitStatus(){
                this.status = this.ruleForm.result;
                if(this.ruleForm.remark == 'underfined'){
                    this.ruleForm.remark = null;
                }
                if(this.ruleForm.result == this.auditStatus){
                    this.shenhe=true;
                }
                if ((this.ruleForm.result != '3') && (this.ruleForm.result != this.auditStatus)) {

                    this.audit_status({
                        id: this.id,
                        audit_status: this.ruleForm.result,
                        remark: String(this.ruleForm.remark)
                    });
                    this.$router.push({path: '/user/detail', query: {id: this.id, userId: this.userId}})
                }
                if (this.ruleForm.result == '3') {


                    if (this.ruleForm.remark) {
                        this.audit_status({
                            id: this.id,
                            audit_status: '3',
                            remark: String(this.ruleForm.remark)
                        });
                        this.$router.push({path: '/user/detail', query: {id: this.id, userId: this.userId}})
                    } else {
                        this.remark = true;
                    }


                }


            },
            detailxinxi(index){
                this.detaillist = this.list[index].detail;
                this.namename = this.list[index].name;
                this.detail = true;

            },
            handleCurrentChange(val) {
                this.page.page = val;
                this.on_list();
            },
            on_list() {
                this.audit_log({
                    audit_id: this.id,
                    page: this.page.page,
                    page_size: this.page.page_size
                });
            }
        },
        computed: {
            ...mapState({
                get_user_id: state => state.get_user_id,
                get_audit_result: state => state.get_audit_result,
                get_audit_log: state => state.get_audit_log,
                get_audit_status: state => state.get_audit_status
            })
        },
        created() {
            this.id = this.$route.query.id;
            this.userId = this.$route.query.userId;
            this.auditStatus = this.$route.query.auditStatus;


            this.user_id({
                id: this.userId
            });
            this.audit_log({
                audit_id: this.id,
                page: this.page.page,
                page_size: this.page.page_size
            });


            // this.audit_status({
            //     id: this.id,
            //     audit_status:this.ruleForm.result
            // });

        },
        mounted() {
            // this.audit_status({
            //     id: this.id,
            //     comsole.log()
            //     audit_status:this.ruleForm.result
            // });
        }

    }


</script>


<style>
    .show {
        display: block;
    }

    .hide {
        display: none;
    }

    .audit-list li {
        overflow: hidden;
        border-bottom: 1px solid #dddddd;
    }

    .audit-list li:last-child {
        border: 0;
    }

    .audit-page .panel-title {
        border-bottom: 1px dashed #ddd;
        padding-bottom: 10px;
        font-weight: bold;
    }

    .audit-page .panel {
        padding-top: 0;
    }

    .dia {
        max-width: 1000px;
    }

    .lili {
        list-style: none;
        line-height: 30px;
    }

    #bigbig {
        height: 65%;
        width: 65%;
        top: 150px;
        left: 20%;
        overflow: iscroll;
    }

    #bigbig .el-dialog--small {
        width: 100%;
        top: 0 !important;
        margin-bottom: 0 !important;
    }

    #bigbig .el-dialog__header {
        padding-left: 35px;

    }

    .noremark {
        top: 200px !important;
    }

    .noremark .el-dialog--small {
        width: 30%;
    }

    /*定义滚动条宽高及背景，宽高分别对应横竖滚动条的尺寸*/
    #bigbig::-webkit-scrollbar {
        width: 10px;
        height: 16px;
        background-color: #f5f5f5;
    }

    /*定义滚动条的轨道，内阴影及圆角*/
    #bigbig::-webkit-scrollbar-track {
        -webkit-box-shadow: inset0 0 6 pxrgba(0, 0, 0, .3);
        border-radius: 10px;
        background-color: #f5f5f5;
    }

    /*定义滑块，内阴影及圆角*/
    #bigbig::-webkit-scrollbar-thumb {
        height: 20px;
        border-radius: 10px;
        -webkit-box-shadow: inset0 0 6 pxrgba(0, 0, 0, .3);
        background-color: #a9a9a9;
    }

</style>