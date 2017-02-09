<template>
    <div class="content-wrapper audit-info">
        <div class="page-header page-header-lg panel border-top-info" style="padding-bottom: 0;">
            <div class="page-header-content">
                <div class="page-title" style="padding: 17px 0;">
                    <h4><i class="icon-arrow-left52 position-left"></i> <span class="text-semibold">提请审核 > 填写信息(极车公社-入会审核)</span>
                    </h4>
                </div>
            </div>
        </div>
        <div class="row" style="margin-bottom: 20px">

            <div class="col-lg-12">
                <div class="panel panel-flat border-left-info">
                    <!--<div class="panel-heading">-->
                    <!--<h6 class="panel-title">提请申请</h6>-->
                    <!--</div>-->
                    <div class="panel-heading heading-mar">
                        <h6 class="panel-title">基础信息</h6>
                        <!--<div class="heading-elements">-->
                        <!--<span class="label bg-success heading-text">基础信息</span>-->
                        <!--</div>-->
                    </div>

                    <div class="panel-body">
                        <div class="form-horizontal">

                            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px">
                                <div class="form-group">
                                    <div class="col-sm-6" v-if="field.user_name.is_show">
                                        <el-form-item label="用户姓名" prop="user_name">
                                            <el-input v-model="ruleForm.user_name"></el-input>
                                        </el-form-item>
                                    </div>
                                    <div class="col-sm-6" v-if="field.company_name.is_show">
                                        <el-form-item label="企业名称" prop="company_name">
                                            <el-input v-model="ruleForm.company_name"></el-input>
                                        </el-form-item>
                                    </div>
                                    <div class="col-sm-6" v-if="field.email.is_show">
                                        <el-form-item label="Email" prop="email">
                                            <el-input v-model="ruleForm.email"></el-input>
                                        </el-form-item>
                                    </div>
                                    <div class="col-sm-6" v-if="field.file_encoding.is_show">
                                        <el-form-item label="档案编码" prop="file_encoding">
                                            <el-input v-model="ruleForm.file_encoding"></el-input>
                                        </el-form-item>
                                    </div>
                                    <div class="col-sm-6" v-if="field.drivers_license_number.is_show">
                                        <el-form-item label="驾驶证号码" prop="drivers_license_number">
                                            <el-input v-model="ruleForm.drivers_license_number" placeholder="请输入驾驶证号码"></el-input>
                                        </el-form-item>
                                    </div>
                                    <div class="col-sm-6" v-if="field.bank_card_number.is_show">
                                        <el-form-item label="银行卡号" prop="bank_card_number">
                                            <el-input v-model="ruleForm.bank_card_number"></el-input>
                                        </el-form-item>
                                    </div>
                                    <div class="col-sm-6" v-if="field.engine_number.is_show">
                                        <el-form-item label="发动机号码" prop="engine_number">
                                            <el-input v-model="ruleForm.engine_number"></el-input>
                                        </el-form-item>
                                    </div>
                                    <div class="col-sm-6" v-if="field.frame_number.is_show">
                                        <el-form-item label="车架号码" prop="frame_number">
                                            <el-input v-model="ruleForm.frame_number"></el-input>
                                        </el-form-item>
                                    </div>
                                    <div class="col-sm-6" v-if="field.idcard.is_show">
                                        <el-form-item label="身份证号" prop="idcard">
                                            <el-input v-model="ruleForm.idcard"></el-input>
                                        </el-form-item>
                                    </div>
                                    <div class="col-sm-6" v-if="field.initial_licensing_time.is_show">
                                        <el-form-item prop="initial_licensing_time" label="初次领证日期" required>
                                            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.initial_licensing_time" style="width: 100%;"></el-date-picker>
                                        </el-form-item>
                                    </div>
                                    <div class="col-sm-6" v-if="field.license_plate_number.is_show">
                                        <el-form-item label="车牌号码" prop="license_plate_number">
                                            <el-input v-model="ruleForm.license_plate_number" aria-valuemax="4"></el-input>
                                        </el-form-item>
                                    </div>
                                    <div class="col-sm-6" v-if="field.phone.is_show">
                                        <el-form-item label="手机号" prop="phone">
                                            <el-input v-model="ruleForm.phone" :maxlength="11"></el-input>
                                        </el-form-item>
                                    </div>
                                    <div class="col-sm-6" v-if="field.qq.is_show">
                                        <el-form-item label="QQ" prop="qq">
                                            <el-input v-model="ruleForm.qq"></el-input>
                                        </el-form-item>
                                    </div>
                                    <div class="col-sm-6" v-if="field.quasi_driving_type.is_show">
                                        <el-form-item label="准驾车型" prop="quasi_driving_type">
                                            <el-select v-model="ruleForm.quasi_driving_type" placeholder="请选择活动区域">
                                                <el-option label="区域一" value="shanghai"></el-option>
                                                <el-option label="区域二" value="beijing"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                    <div class="col-sm-6" v-if="field.sex.is_show">
                                        <el-form-item label="性别" prop="sex">
                                            <!--<el-radio-group v-model="ruleForm.sex">-->
                                            <el-radio class="radio" v-model="ruleForm.sex" label="1">男</el-radio>
                                            <el-radio class="radio" v-model="ruleForm.sex" label="2">女</el-radio>
                                            <!--</el-radio-group>-->
                                        </el-form-item>
                                    </div>

                                </div>
                                <div class="form-group">
                                    <div class="col-sm-6" v-if="field.idcard_positive_photo.is_show">
                                        <el-form-item label="身份证正面照片" prop="idcard_positive_photo">
                                            <el-upload v-model="ruleForm.idcard_positive_photo" :action=url type="drag" :headers="headers" :thumbnail-mode="true" :on-preview="positivePreview"
                                                :on-remove="positiveRemove" :on-success="positiveSuccess" :on-error="positiveError"
                                                :default-file-list="positive.fileList">
                                                <i class="el-icon-upload"></i>
                                                <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
                                                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                                            </el-upload>
                                        </el-form-item>
                                    </div>
                                    <div class="col-sm-6" v-if="field.idcard_handheld_photo.is_show">
                                        <el-form-item label="手持身份证照片" prop="idcard_handheld_photo">
                                            <el-upload v-model="ruleForm.idcard_handheld_photo" :action=url type="drag" :headers="headers" :thumbnail-mode="true" :on-preview="handcardPreview" :on-remove="handcardRemove" :on-success="handcardSuccess"
                                                :on-error="handcardError" :default-file-list="handcard.fileList">
                                                <i class="el-icon-upload"></i>
                                                <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
                                                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                                            </el-upload>
                                        </el-form-item>
                                    </div>
                                    <div class="col-sm-6" v-if="field.photo.is_show">
                                        <el-form-item label="照片" prop="photo">
                                            <el-upload v-model="ruleForm.idcard_handheld_photo":action=url type="drag" :headers="headers" :thumbnail-mode="true" :on-preview="photoPreview" :on-remove="photoRemove"
                                                :on-success="photoSuccess" :on-error="photoError" :default-file-list="photo.fileList">
                                                <i class="el-icon-upload"></i>
                                                <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
                                                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                                            </el-upload>
                                        </el-form-item>
                                    </div>
                                </div>

                                <div class="text-right">
                                    <button type="button" class="btn btn-info" @click="handleSubmit()">提交<i class="icon-arrow-right14 position-right"></i></button>
                                </div>
                            </el-form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--<button @click="renderChart">xxxx</button>-->
    </div>
</template>
<script>

// audit_param
    import moment from  'moment'

    //    import Upload from '../../widgets/slect2'
    import {Upload, Radio} from 'element-ui'
    import {mapState, mapActions} from 'vuex'

    import {file} from '../../../api/apis.js' // 上传

    export default {
        data() {
            var checkAge = (rule, value, callback) => {
                if (!value) {
                return callback(new Error('年龄不能为空'));
                }
                setTimeout(() => {
                if (!Number.isInteger(value)) {
                    callback(new Error('请输入数字值'));
                } else {
                    if (value < 18) {
                    callback(new Error('必须年满18岁'));
                    } else {
                    callback();
                    }
                }
                }, 1000);
            };
            return {
                photo:{
                    fileList: [{
                        // name: '1.jpg',
                        // url: 'http://192.168.1.224/resources/zxsys/statics/img/2016/12/28/20161228822902.jpg',
                    }],
                },
                positive:{
                    fileList: [{
                        // name: '1.jpg',
                        // url: 'http://192.168.1.224/resources/zxsys/statics/img/2016/12/28/20161228822902.jpg',
                    }],
                },
                handcard:{
                    fileList: [{
                        // name: '1.jpg',
                        // url: 'http://192.168.1.224/resources/zxsys/statics/img/2016/12/28/20161228822902.jpg',
                    }],
                },
                url: file.cfg.url,
                headers:{
                    'HaiYi-Access-Token':''
                },
                field:{
                    user_name:{
                        is_show:false
                    },
                    company_name:{
                        is_show:false
                    },
                    bank_card_number:{
                        is_show:false
                    },
                    drivers_license_number:{
                        is_show:false
                    },
                    email:{
                        is_show:false
                    },
                    engine_number:{
                        is_show:false
                    },
                    file_encoding:{
                        is_show:false
                    },
                    frame_number:{
                        is_show:false
                    },
                    idcard: {
                        is_show:false
                    },
                    initial_licensing_time: {
                        is_show:false
                    },
                    license_plate_number: {
                        is_show:false
                    },
                    phone:{
                        is_show:false
                    },
                    qq:{
                        is_show:false
                    },
                    quasi_driving_type:{
                        is_show:false
                    },
                    sex:{
                        is_show:false
                    },
                    idcard_handheld_photo:{
                        is_show:false
                    },
                    photo:{
                        is_show:false
                    },
                    idcard_positive_photo:{
                        is_show:false
                    }
                },
                ruleForm: {//验证
                    user_name:'',
                    company_name:'',
                    bank_card_number:'',
                    drivers_license_number:'',
                    email:'',
                    engine_number:'',
                    file_encoding:'',
                    frame_number:'',
                    idcard: '',
                    initial_licensing_time: '',
                    license_plate_number: '',
                    phone:'',
                    qq:'',
                    quasi_driving_type:'',
                    sex:'1',
                    photo:'',
                    idcard_handheld_photo:'',//手持身份证照片
                    idcard_positive_photo:''//身份证正面照
                },
                rules: {
                    user_name:[
                        { required: false, max:10, message: '请输入10字以内的用户姓名', trigger: 'blur' }
                    ],
                    company_name:[
                        { required: false, max:50, message: '请输入50字以内的企业名称', trigger: 'blur' }
                    ],
                    bank_card_number:[
                        { required: false, message: '请输入银行卡号', trigger: 'blur' },
                        { min:5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur' }
                    ],
                    drivers_license_number:[
                        { required: false, max: 20, message: '请填写正确的驾驶证号码', trigger: 'blur' }
                    ],
                    email:[
                        { required: false,type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
                    ],
                    engine_number:[
                        { required: false, max: 20, message: '请输入正确的发动机号码（20字以内）', trigger: 'blur' }
                    ],
                    file_encoding:[
                        { required: false, max: 20, message: '请输入正确的档案编码（20字以内）', trigger: 'blur' }
                    ],
                    frame_number:[
                        { required: false, max:20, message: '请输入正确的车架号（20字以内）', trigger: 'blur' }
                    ],
                    idcard: [
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
                    initial_licensing_time: [
                        { type: 'date', required: false, message: '请选择日期', trigger: 'change' }
                    ],
                    license_plate_number:[
                        { required: false, max:20, message: '请输入正确的车牌号', trigger: 'blur' }
                    ],
                    phone:[
                        
                        {
                            required:false,
                            validator:(rule,value,callback)=>{
                                if(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(value) == false){
                                    callback(new Error("请输入正确的手机号"));
                                }else{
                                    callback();
                                }
                            }, trigger:'blur'
                        }
                        // {
                        //     validator:(rule,value,callback)=>{
                        //         if(/^\d+$/.test(value) == false){
                        //             callback(new Error("请输入正确的手机号"));
                        //         }else{
                        //             callback();
                        //         }
                        //     }, max:11, trigger:'blur,change'
                        // }
                    ],
                    qq:[
                        { required: false, max: 20, message: '20字以内', trigger: 'blur' }
                    ],
                    quasi_driving_type:[
                        { required: false, message: '请选择准驾车型', trigger: 'change' }
                    ],
                    sex:[
                        { required: false, message: '请选择性别', trigger: 'change' }
                    ],
                    photo:[
                        { required: false, message: '请上传用户照片', trigger: 'change' }
                    ],
                    idcard_handheld_photo:[
                        { required: false, message: '请上传手持身份证照片', trigger: 'change' }
                    ],
                    idcard_positive_photo:[
                        { required: false, message: '请上传身份证正面照片', trigger: 'change' }
                    ],
                },
                audit_info:{
                    user_id:'',
                    model_id:'',
                    platform_id:'',
                    user_type:''
                }
            }
        },
        component: {
            Upload,
            Radio
        },
        watch: {
            'get_audit_param': {
                handler: function (n, o) {
                    if(n.code !== '0000') return;
                    let data = n.data;
                    for(let key in data){
                        this.field[key].is_show = true;
                        this.rules[key][0].required = data[key].required;
                        if(data[key].name==='photo' || data[key].name==='idcard_positive_photo' || data[key].name==='idcard_handheld_photo'){
                            this[key].fileList[0].url = data[key].value;
                            return
                        }
                        this.ruleForm[key] = data[key].value;
                    }

                }
            },
            'get_audit_create':{
                handler: function (n, o) {
                    if(n.code !== '0000') return;
                    // id ： 审核id
                    // userId：用户id
                    // auditStatus：审核状态
                    this.$router.push({path: '/user/request', query: { id:n.data.id, userId:n.data.user_id, auditStatus:n.data.audit_status}});
                    // /user/request?modelId=55&userId=53
                }
            }
        },
        methods: {
            //照片
            photoRemove(file, fileList) {
                 this.ruleForm.photo='';
            },
            photoPreview(file) {
            },
            photoReset() {
                this.$refs.ruleForm.resetFields();
            },
            photoSuccess(response, file, fileList){
                if(response.data === null)return;
                this.ruleForm.photo = response.data[0].url;
            },
            photoError(err, response, file){
            },
            //手持身份证
            handcardRemove(file, fileList) {
            },
            handcardPreview(file) {
            },
            handcardReset() {
                this.$refs.ruleForm.resetFields();
            },
            handcardSuccess(response, file, fileList){
                this.ruleForm.idcard_handheld_photo = response.data[0].url;
            },
            handcardError(err, response, file){
            },
            //身份证正面照
            positiveRemove(file, fileList) {
            },
            positivePreview(file) {
            },
            positiveReset() {
                this.$refs.ruleForm.resetFields();
            },
            positiveSuccess(response, file, fileList){
                this.ruleForm.idcard_positive_photo = response.data[0].url;
            },
            positiveError(err, response, file){
            },

            handleSubmit(ev) {
                
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        this.audit_create({
                            company_name:this.ruleForm.company_name,
                            bank_card_number:this.ruleForm.bank_card_number,			
                            drivers_license_number:this.ruleForm.drivers_license_number,			
                            email:this.ruleForm.email,			
                            engine_number:this.ruleForm.engine_number,			
                            file_encoding:this.ruleForm.file_encoding,			
                            frame_number:this.ruleForm.frame_number,			
                            id:parseInt(this.audit_info.user_id),		
                            idcard:this.ruleForm.idcard,			
                            idcard_handheld_photo:this.ruleForm.idcard_handheld_photo,			
                            idcard_positive_photo:this.ruleForm.idcard_positive_photo,			
                            initial_licensing_time:this.ruleForm.initial_licensing_time,			
                            license_plate_number:this.ruleForm.license_plate_number,			
                            model_id:parseInt(this.audit_info.model_id),	
                            phone:this.ruleForm.phone,			
                            photo:this.ruleForm.photo,			
                            qq:this.ruleForm.qq,			
                            quasi_driving_type:this.ruleForm.quasi_driving_type,			
                            service_platform:this.audit_info.platform_id,
                            sex	:this.ruleForm.sex,		
                            user_name:this.ruleForm.user_name,			
                            user_type:this.audit_info.user_type
                        });
                    } else {
                        console.log('err');
                        return false;
                    }
                });
            },
            ...mapActions(['audit_param','audit_create'])
        },
        computed: {
            ...mapState({
                get_audit_param: state => state.get_audit_param,
                get_audit_create: state => state.get_audit_create
            })
        },
        created() {

            this.audit_info.user_id=this.$route.query.user_id;
            this.audit_info.model_id=this.$route.query.model_id;
            this.audit_info.platform_id=this.$route.query.platform_id;
            this.audit_info.user_type=this.$route.query.user_type;
            
            this.audit_param({
                model_id:this.audit_info.model_id,
                user_id:this.audit_info.user_id
            });
//            let v = webloader({
//                on_upload_success: function (file) {

//                }
//            })
            this.headers['HaiYi-Access-Token'] = sessionStorage.token;
        },

        mounted() {

        },
        beforeMount() {
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


<style>
    .heading-mar {
        border-bottom: 1px #ccc solid;
        margin-bottom: 20px;
    }
    
    input[type="file"] {
        display: none;
    }
    
    .el-dragger__cover h4 {
        display: none;
    }
    
    .el-upload .el-dragger {
        width: 200px;
        height: 100px;
    }
    
    .el-upload .el-dragger .btn {
        margin-top: 30px;
        width: 60px;
        padding: 0
    }
    
    .el-upload .el-dragger__cover__interact .btn:not(:first-child) {
        margin-left: 0;
    }
    
    .el-upload__tip {
        display: none !important;
    }
    
    .el-upload .el-dragger .el-icon-upload {
        margin: 0;
        padding: 10px 0;
    }
    
    .audit-info .form-horizontal .radio {
        padding-top: 0;
    }
</style>