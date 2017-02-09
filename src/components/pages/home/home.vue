<template>
    <div class="content-wrapper">
        <div class="page-header page-header-lg panel border-top-info" style="padding-bottom: 0;">
<div class="page-header-content">
    <div class="page-title" style="padding: 17px 0;">
<!--<h4><i class="icon-arrow-left52 position-left"></i> <span class="text-semibold">提请审核1</span></h4>-->
<el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">提请审核</el-breadcrumb-item>
    <!--<el-breadcrumb-item>活动管理</el-breadcrumb-item>-->
    <!--<el-breadcrumb-item>活动列表</el-breadcrumb-item>-->
    <!--<el-breadcrumb-item>活动详情</el-breadcrumb-item>-->
</el-breadcrumb>
</div>
</div>
</div>
<div class="row" style="margin-bottom: 20px">
<div class="col-lg-12">
    <div class="panel panel-flat border-left-info">
        <!--<div class="panel-heading">-->
        <!--<h6 class="panel-title">提请申请</h6>-->
        <!--</div>-->
        <div class="panel-body">
            <div class="form-horizontal">
                <fieldset class="content-group">
                    <!--<legend class="text-bold">Text addon</legend>-->

                    <!--<div class="form-group">
                        <label class="control-label col-lg-2">服务平台</label>
                        <div class="col-lg-10">
                            <el-select v-model="value" placeholder="请选择平台" @change='add_platform()'>
                                <el-option v-for="item in options" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                           
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-lg-2">业务模型</label>
                        <div class="col-lg-10">
                            <el-select v-model="value2" placeholder="请选择业务模型" @click=''>
                                <el-option v-for="item in yewus" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                           
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-lg-2">用户类型</label>
                        <div class="col-lg-10">
                            <el-select v-model="value3" placeholder="请选择用户类型" @change='add_business_model()'>
                                <el-option v-for="item in users" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                            
                        </div>
                    </div>
                    <div class="form-group hide" id="idCard_list">
                        <label class="control-label col-lg-2" v-if='value3==0'>身份证号码</label>
                        <label class="control-label col-lg-2" v-else>组织机构代码</label>
                        <div class="col-lg-10">
                            <el-input placeholder="" v-model="idCard_input">
                            </el-input>
                           
                        </div>
                    </div>
                    <div class="text-right">
                        <button type="button" class="btn btn-info" @click="sub()">提交申请<i
                                            class="icon-arrow-right14 position-right"></i></button>
                    </div>-->


                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" label-position="right">
                        <el-form-item label="服务平台" prop="value">
                            <el-select v-model="ruleForm.value" placeholder="请选择服务平台" clearable  @change='add_platform()'>
                                <el-option v-for="item in options" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="业务模型" prop="value2">
                            <el-select v-model="ruleForm.value2" placeholder="请选择业务模型" clearable  @change='get_model_id()'>
                                <el-option v-for="item in yewus" :label="item.label" :value="item.value">

                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="用户类型" prop="value3">
                            <el-select v-model="ruleForm.value3" placeholder="请选择用户类型" clearable  @change='add_business_model()'>
                                <el-option v-for="item in users" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="身份证号码" prop="resource" v-if='ruleForm.value3==0' id="idCard_list" class="">
                            <el-input type="text" v-model="ruleForm.resource"></el-input>
                        </el-form-item>
                        <el-form-item label="组织机构代码" prop="desc" v-else-if='ruleForm.value3==1' id="idCard_list" class="">
                            <el-input type="text" v-model="ruleForm.desc"></el-input>
                        </el-form-item>
                        <i label=""  v-else ></i>
                            <el-button type="primary" @click="handleSubmit" class="btn_sunmit">提交申请</el-button>
                        </el-form-item>
                    </el-form>
                </fieldset>
            </div>
        </div>
    </div>
</div>
</div>
<!--<button @click="renderChart">xxxx</button>-->
</div>
</template>
<style>
    .show{
        display: block;
    }
    .hide{
        display: none;
    }
    .btn_sunmit{
        margin-left: 90% !important;
    }
</style>
<script>


    import moment from 'moment'

    //    import appSelect from '../../widgets/slect2'
    import Select from 'element-ui'
    import webloader from '../../widgets/webuploader'




    import { mapState, mapActions } from 'vuex' // 上传

    export default {
        data() {
            return {
                options: [],
                users: [],
                yewus: [],
                auto: true,                
                model_id: null,
                idCard_input:null,
                ruleForm: {
                    value: '',
                    value2: '',
                    value3: null,
                    resource: null,
                    desc: null
                },
                rules: {
                    value: [
                        { required: true, message: '请选择服务平台', trigger: 'change' }
                    ],
                    value2: [
                        { required: true, message: '请选择业务模型', trigger: 'change' }
                    ],
                    value3: [
                        { required: true, message: '请选择用户类型', trigger: 'change' }
                    ],
                    resource: [
                        {
                            required:false,
                            validator:(rule,value,callback)=>{
                                if(/^[0-9a-zA-Z]{18}$/.test(value) == false){
                                    callback(new Error("请输入18位正确的身份证号码"));
                                }else{
                                    callback();
                                }
                            }, trigger:'blur'
                        }
                    ],
                    desc: [
                        { required: true, message: '请填写组织机构代码', trigger: 'blur' },
                         { max: 50, message: '超过长度', trigger: 'change'}
                    ]
                },
                audit_info:{}


            }
        },
        component: {
            //            appSelect,
            //            webloader
            Select
        },

        watch: {
            'get_data_service_platform': {
                handler: function (n, o) {
                    if (n.code !== '0000') {
                        return false
                    }
                    // if(n.data.length==0){
                    //     this.yewus.length=0; 
                    //     this.users.length=0;
                    //     return false;
                    // }
                    this.options.length=0;
                    for (let i in n.data) {
                        let obj = {
                            value: i,
                            label: n.data[i]
                        };
                        this.options.push(obj);
                    }
                }
            },
            'get_data_business_model': {
                handler: function (n, o) {
                    if (n.code !== '0000') {
                        return false
                    }
                    if (n.data.length == 0) return
                    this.yewus.length=0;
                    for (let i in n.data) {                        
                        let obj = {
                            value: (n.data[i].id).toString(),
                            label: n.data[i].model_name
                        };
                        this.yewus.push(obj);
                    }

                }
            },
            'get_commit_audi_createt': {
                handler: function (n, o) {
                    if (n.code !== '0000') {
                        return false
                    }
                    n.data.preCreateParam.map(item => {
                        this.audit_info[item.name] = item.value;
                    });
                    console.log(this.audit_info);
                    this.$router.push({path: '/home/fill_info', query: { model_id: this.audit_info.model_id,user_id: this.audit_info.id,platform_id:this.ruleForm.value,user_type:this.ruleForm.value3} });
                }
            },
            'get_user_type_list': {
                handler: function (n, o) {
                    if (n.code !== '0000') {
                        return false
                    }
                    if (n.data.length == 0) return
                    this.users.length=0;
                    for (let i in n.data) {
                        
                        let obj = {
                            value: i,
                            label: n.data[i]
                        };
                        this.users.push(obj);
                    }
                }
            },
        },
        methods: {
            sub() {

                
                //                this.$router.push(`/home/fill_info`);//
                //this.$router.push({ path: '/home/fill_info', query: { id: 1 } });//
            },
            uploader_success() {
                this.$refs.uploader.img_url.map(item => {
                    console.log(item.url);
                })
            },
            on_list() {


            },
            get_model_id() {
                let id=this.ruleForm.value2;
                id=parseInt(id);
                this.user_type_list({model_id:id});
            },
            handleSubmit(ev) {
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        idCard_list.classList = 'show';
                        
                        this.idCard_input= (this.ruleForm.value3==0)? this.ruleForm.resource:this.ruleForm.desc;

                        this.commit_audi_createt({
                            idcard: this.idCard_input,
                            model_id: this.ruleForm.value2,
                            service_platform: this.ruleForm.value,
                            user_type: this.ruleForm.value3

                        });
                        
                    } else {
                       
                        return false;
                    }
                });
            },
            add_platform() {
                let key=this.ruleForm.value;
                console.log(this.platform_name);
                this.data_business_model({ service_platform: this.ruleForm.value });
            },
            add_business_model() {
                var idCard_list = document.querySelector('#idCard_list');
                idCard_list.classList = 'show';
                
            },
            ...mapActions([
            'data_service_platform',
            'data_business_model',
            'user_type_list',
            'commit_audi_createt'
        ])
        },
        computed: {
            ...mapState({
                get_data_service_platform: state => state.get_data_service_platform,
                get_data_business_model: state => state.get_data_business_model,
                get_user_type_list: state => state.get_user_type_list,
                get_commit_audi_createt: state => state.get_commit_audi_createt,
            })
        },
        created() {
            this.data_service_platform({});
            // this.user_type_list({});
            // console.log(webloader);
        },
        ready() {
            // console.log(this.$refs)
        },
        events: {
            refresh: function (e) {
                this.uploader_success();
                console.log(e);
                //                console.log(this.$refs)

            }
        }
    }


</script>