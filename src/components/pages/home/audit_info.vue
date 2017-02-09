<template>
    <div class="content-wrapper audit-page">
        <div class="page-header page-header-lg panel border-top-info" style="padding-bottom: 0;">
            <div class="page-header-content">
                <div class="page-title" style="padding: 17px 0;">
                    <h4><i class="icon-arrow-left52 position-left"></i> <span class="text-semibold">提请审核 > 张三 > 极车公社_入会申请(2016/9/17)</span>
                    </h4>
                </div>
            </div>
        </div>
        <!--基础信息-->
        <div class="panel panel-flat border-top-lg border-top-warning">
            <div class="panel-heading">
                <h6 class="panel-title">基础信息</h6>
            </div>
            <div class="panel-body">
                <div class="row">
                    <div class="col-lg-3">
                        姓名：{{name}}
                    </div>
                    <div class="col-lg-3">
                        手机：{{phone}}
                    </div>
                    <div class="col-lg-4">
                        身份证：{{cardid}}
                    </div>
                    <div class="col-lg-2">
                        <a href="">查看详情</a>
                    </div>
                </div>
            </div>
        </div>

        <!--征信报告-->
        <div class="panel panel-flat border-top-lg border-top-warning">
            <div class="panel-heading">
                <h6 class="panel-title">征信报告</h6>
            </div>
            <div class="panel-body">
                <div class="row">
                    <div class="col-lg-6">
                        征信报告
                    </div>
                    <div class="col-lg-4">
                        已出结果
                    </div>
                    <div class="col-lg-2">
                        <a href="">查看报告</a>
                        <a href="">下载报告</a>
                    </div>
                </div>
            </div>
        </div>

        <!--查询结果-->
        <div class="panel panel-flat border-top-lg border-top-warning">
            <div class="panel-heading">
                <h6 class="panel-title">查询结果</h6>
            </div>
            <div class="panel-body">
                <ul class="list-group audit-list">
                    <li class="list-group-item">
                        <div class="col-lg-6">
                            实名认证
                        </div>
                        <div class="col-lg-4">
                            一致<i class="icon-checkmark3 text-success"></i><i class="icon-cross2 text-danger-400"></i>
                        </div>
                        <div class="col-lg-2">
                            <a href="">查看详情</a>
                        </div>
                    </li>
                    <li class="list-group-item">
                        <div class="col-lg-6">
                            实名认证
                        </div>
                        <div class="col-lg-4">
                            一致<i class="icon-checkmark3 text-success"></i><i class="icon-cross2 text-danger-400"></i>
                        </div>
                        <div class="col-lg-2">
                            <a href="">查看详情</a>
                        </div>
                    </li>
                    <li class="list-group-item">
                        <div class="col-lg-6">
                            实名认证
                        </div>
                        <div class="col-lg-4">
                            一致<i class="icon-checkmark3 text-success"></i><i class="icon-cross2 text-danger-400"></i>
                        </div>
                        <div class="col-lg-2">
                            <a href="">查看详情</a>
                        </div>
                    </li>
                    <li class="list-group-item">
                        <div class="col-lg-6">
                            实名认证
                        </div>
                        <div class="col-lg-4">
                            一致<i class="icon-checkmark3 text-success"></i><i class="icon-cross2 text-danger-400"></i>
                        </div>
                        <div class="col-lg-2">
                            <a href="">查看详情</a>
                        </div>
                    </li>
                    <li class="list-group-item">
                        <div class="col-lg-6">
                            实名认证
                        </div>
                        <div class="col-lg-4">
                            一致<i class="icon-checkmark3 text-success"></i><i class="icon-cross2 text-danger-400"></i>
                        </div>
                        <div class="col-lg-2">
                            <a href="">查看详情</a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <!--审核结果-->
        <div class="panel panel-flat border-top-lg border-top-warning">
            <div class="panel-heading">
                <h6 class="panel-title">审核结果</h6>
            </div>
            <div class="panel-body">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm">
                    <div class="form-group">
                        <div class="col-sm-7">
                            <el-form-item label="审核结果" prop="result">
                                <el-radio-group v-model="ruleForm.result">
                                    <el-radio label="待定"></el-radio>
                                    <el-radio label="通过"></el-radio>
                                    <el-radio label="返回"></el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-6">
                            <el-form-item label="备注" prop="remark">
                                <el-input type="textarea" v-model="ruleForm.remark"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>


    import moment from 'moment'

    //    import appSelect from '../../widgets/slect2'
    import Select from 'element-ui'
    // import webloader from '../../widgets/webuploader'




    import { mapState, mapActions } from 'vuex' // 上传

    export default {
        data() {
            return {
                name:'zhangshan',
                phone:'18547459632',
                cardid:'158463259845721587',
                ruleForm: {//验证
                    result: '',
                    remark:''
                },
                rules: {
                    remark: [
                        { required: true, message: '请输入备注', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    result: [
                        { required: true, message: '选择审核结果', trigger: 'change' }
                    ],
                }
            }
        },
        component: {
            //            appSelect,
            //            webloader
            Select
        },

        watch: {
            // 'get_data_service_platform': {
            //     handler: function (n, o) {
                   

            //     }
            // }
        },
        methods: {
            sub() {
               
            },
            ...mapActions([
                // 'data_service_platform'
        ])
        },
        computed: {
            ...mapState({
                // get_data_service_platform: state => state.get_data_service_platform
            })
        },
        created() {
           
        },
        ready() {
        },
        events: {
            refresh: function (e) {
                // this.uploader_success();
                console.log(e);

            }
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
</style>