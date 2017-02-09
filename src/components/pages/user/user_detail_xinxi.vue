<template>
    <div class="content-wrapper">
        <div class="row" style="margin-bottom: 20px">
            <div class="col-lg-12">
                <div class="form-horizontal">
                    <fieldset class="content-group">
                        <div class="form-group">
                            <label class="control-label col-sm-1"></label>
                            <a href="#"
                               class="btn border-teal text-teal btn-flat btn-rounded btn-icon btn-xs valign-text-bottom"
                               @click="dialogVisible=true"><i class="icon-plus3"></i> 添加信息</a>

                        </div>
                        <div class="form-group detail_info">

                            <!--  0个人 -->
                            <template v-if="user_type_id == '0' ">

                                <el-form :model="valids" :rules="rules" ref="valids" label-width="100px"
                                         class="demo-ruleForm">

                                    <div class="mar-bottom col-sm-6" v-for="(item,key,index) in all_info"
                                         v-if="item.isType" :class="{'other_phones': item.other}">

                                        <div class="col-sm-12" v-if="!item.isImg">
                                            <!--<label class="control-label col-sm-4" v-if="item.isSex">{{item.name}}</label>-->
                                            <div class="col-sm-12" :class="{'mar-tops': item.isSex  }">
                                                <template v-if="item.isSex">
                                                    <el-form-item :label="item.name">
                                                        <el-radio-group v-model="item.value">
                                                            <el-radio :label="2">男</el-radio>
                                                            <el-radio :label="1">女</el-radio>
                                                        </el-radio-group>
                                                    </el-form-item>
                                                </template>
                                                <template v-if="item.isTime">
                                                    <el-form-item :label="item.name" :prop="item.valid" required class="set-time-width">
                                                        <el-date-picker placeholder="选择日期" v-model="item.value" :editable=false :clearable=false> </el-date-picker>
                                                    </el-form-item>
                                                </template>
                                                <template v-if="item.isSelect">

                                                    <el-form-item :label="item.name" :prop="item.valid">
                                                        <el-select v-model="item.value" placeholder="请选择准驾车型">
                                                            <el-option
                                                                    v-for="item in quasi_option"
                                                                    :label="item.label"
                                                                    :value="item.value">
                                                            </el-option>
                                                        </el-select>
                                                    </el-form-item>
                                                </template>
                                                <template v-if="item.isInput">
                                                    <el-form-item :label="item.name" :prop="item.valid" require>
                                                        <input type="text" class="form-control el-input__inner"
                                                               v-model.trim="item.value" :disabled="item.required"
                                                               :maxlength="item.maxLength"/>

                                                    </el-form-item>

                                                </template>
                                            </div>
                                        </div>

                                        <div class="col-sm-12" v-if="item.isImg">


                                            <!-- 照片 -->
                                            <template v-if="item.type == 'photo' ">
                                                <!-- 照片 -->
                                                <label class="control-label col-sm-3">{{item.name}}</label>

                                                <div class="col-sm-4">
                                                    <el-upload
                                                            :action=url
                                                            type="drag"
                                                            :thumbnail-mode="true"
                                                            :headers="headers"
                                                            :on-preview="handlePreview"
                                                            :on-success="handleSuccess_photo"
                                                            :default-file-list="fileList1"
                                                            :before-upload="before_file"
                                                    >
                                                        <i class="el-icon-upload"></i>
                                                        <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
                                                        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb
                                                        </div>
                                                    </el-upload>
                                                </div>
                                            </template>

                                            <!--  手持身份证照 -->
                                            <template v-if="item.type == 'idcard_handheld_photo' ">
                                                <label class="control-label col-sm-3">{{item.name}}</label>

                                                <div class="col-sm-4">
                                                    <el-upload
                                                            :action=url
                                                            type="drag"
                                                            :thumbnail-mode="true"
                                                            :headers="headers"
                                                            :on-preview="handlePreview"
                                                            :on-success="handleSuccess_idcard"
                                                            :default-file-list="fileList2"

                                                    >
                                                        <i class="el-icon-upload"></i>
                                                        <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
                                                        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb
                                                        </div>
                                                    </el-upload>
                                                </div>
                                            </template>
                                            <!--  身份证正面照 -->
                                            <template v-if="item.type == 'idcard_positive_photo' ">
                                                <label class="control-label col-sm-3">{{item.name}}</label>

                                                <div class="col-sm-4">
                                                    <el-upload
                                                            :action=url
                                                            type="drag"
                                                            :thumbnail-mode="true"
                                                            :headers="headers"
                                                            :on-preview="handlePreview"
                                                            :on-success="handleSuccess_pos"
                                                            :default-file-list="fileList3"
                                                    >
                                                        <i class="el-icon-upload"></i>
                                                        <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
                                                        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb
                                                        </div>
                                                    </el-upload>
                                                </div>
                                            </template>
                                            <!--  企业营业执照 -->
                                            <template v-if="item.type == 'enterprise_business_license' ">
                                                <label class="control-label col-sm-3">{{item.name}}</label>

                                                <div class="col-sm-4">
                                                    <el-upload
                                                            :action=url
                                                            type="drag"
                                                            :headers="headers"
                                                            :thumbnail-mode="true"
                                                            :on-preview="handlePreview"
                                                            :on-success="handleSuccess_ent"
                                                            :default-file-list="fileList4"
                                                    >
                                                        <i class="el-icon-upload"></i>
                                                        <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
                                                        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb
                                                        </div>
                                                    </el-upload>
                                                </div>
                                            </template>

                                        </div>
                                        <div class="form-group" v-if="item.type == 'other' ">
                                            <hr>
                                            <label class="control-label col-sm-2">{{item.name}}</label>

                                            <div class="col-sm-4 list-none">
                                                <el-upload
                                                        :action=url
                                                        type="drag"
                                                        :headers="headers"
                                                        :multiple="true"
                                                        :on-preview="handlePreview"
                                                        :on-success="handleSuccess_other"
                                                        :on-error="handleError"
                                                        :default-file-list="fileList"

                                                >
                                                    <i class="el-icon-upload"></i>
                                                    <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
                                                    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                                                </el-upload>

                                            </div>

                                            <div class="col-sm-12" v-for="(img, index) in imgList">
                                                <hr>
                                                <label class="control-label col-sm-2"></label>
                                                <div class="col-sm-4">
                                                    <img :src="img.url" width="190px" height="120px"/>
                                                </div>
                                                <div class="col-sm-6">
                                                    <div class="form-group">
                                                        <label class="control-label col-sm-4">其他证照</label>
                                                        <div class="col-sm-8">
                                                            <input type="text" class="form-control el-input__inner"
                                                                   v-model="others.values[index]"/>
                                                        </div>
                                                    </div>


                                                    <div class="form-group">
                                                        <label class="control-label col-sm-4">证照内容</label>

                                                        <div class="col-sm-8">
                                                        <textarea class="form-control el-input__inner" rows="4"
                                                                  v-model="others.texta[index]"></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </el-form>
                            </template>


                            <!-- 1企业 -->
                            <template v-else>
                                <el-form :model="ent_valids" :rules="ent_rules" ref="ent_valids" label-width="100px"
                                         class="demo-ruleForm">

                                    <div class="mar-bottom col-sm-6" v-for="(item,key,index) in ent_info"
                                         v-if="item.isType" :class="{'other_phones': item.other}">

                                        <div class="col-sm-12" v-if="item.isInput">
                                            <!--<label class="control-label col-sm-4" v-if="item.isSex">{{item.name}}</label>-->
                                            <div class="col-sm-8">
                                                <el-form-item :label="item.name" :prop="item.valid">
                                                    <input type="text" class="form-control el-input__inner"
                                                           v-model.trim="item.value" :disabled="item.required"
                                                           maxlength="50"/>
                                                </el-form-item>
                                            </div>
                                        </div>

                                        <!--  企业营业执照 -->

                                        <div class="col-sm-12" v-if="item.isImg">
                                            <template v-if="item.type == 'enterprise_business_license' ">
                                                <label class="control-label col-sm-3">{{item.name}}</label>

                                                <div class="col-sm-4">
                                                    <el-upload
                                                            :action=url
                                                            type="drag"
                                                            :headers="headers"
                                                            :thumbnail-mode="true"
                                                            :on-preview="handlePreview"
                                                            :on-success="handleSuccess_ent"
                                                            :default-file-list="fileList4"
                                                    >
                                                        <i class="el-icon-upload"></i>
                                                        <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
                                                        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb
                                                        </div>
                                                    </el-upload>
                                                </div>
                                            </template>
                                        </div>
                                        <!--  其他证照 -->

                                        <div class="form-group" v-if="item.type == 'other' ">
                                            <hr>
                                            <label class="control-label col-sm-2">{{item.name}}</label>

                                            <div class="col-sm-4 list-none">
                                                <el-upload
                                                        :action=url
                                                        type="drag"
                                                        :headers="headers"
                                                        :multiple="true"
                                                        :on-preview="handlePreview"
                                                        :on-success="handleSuccess_other"
                                                        :on-error="handleError"
                                                        :default-file-list="fileList"

                                                >
                                                    <i class="el-icon-upload"></i>
                                                    <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
                                                    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                                                </el-upload>

                                            </div>

                                            <div class="col-sm-12" v-for="(img, index) in imgList">
                                                <hr>
                                                <label class="control-label col-sm-2"></label>
                                                <div class="col-sm-4">
                                                    <img :src="img.url" width="190px" height="120px"/>
                                                </div>
                                                <div class="col-sm-6">
                                                    <div class="form-group">
                                                        <label class="control-label col-sm-4">其他证照</label>
                                                        <div class="col-sm-8">
                                                            <input type="text" class="form-control el-input__inner"
                                                                   v-model="others.values[index]" maxlength="30"/>
                                                        </div>
                                                    </div>


                                                    <div class="form-group">
                                                        <label class="control-label col-sm-4">证照内容</label>

                                                        <div class="col-sm-8">
                                                        <textarea class="form-control el-input__inner" rows="4"
                                                                  v-model="others.texta[index]"
                                                                  maxlength="30"></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </el-form>
                            </template>
                        </div>
                    </fieldset>

                    <button type="submit" class=" btn btn-info" @click="sure_form">保存</button>


                </div>
            </div>
        </div>

        <div class="popups" @click="close_popup" v-if="bigImg.imgShow">
            <img :src="bigImg.src" class="set-img"/>
        </div>


        <el-dialog title="自定义信息" v-model="dialogVisible" size="tiny">
            <template>
                <el-checkbox-group>


                    <template v-if="user_type_id == '0' ">
                        <template v-for="item in all_info">
                            <div class="checkbox custom—checkbox" v-if="!item.isType">
                                <label>
                                    <input type="checkbox" name="value" v-model="item.value"> {{item.name}}
                                </label>
                            </div>
                        </template>
                    </template>

                    <template v-else>
                        <template v-for="item in ent_info">
                            <div class="checkbox custom—checkbox" v-if="!item.isType">
                                <label>
                                    <input type="checkbox" name="value" v-model="item.value"> {{item.name}}
                                </label>
                            </div>
                            <div v-else class="not-custom">
                                无信息
                            </div>
                        </template>
                    </template>


                </el-checkbox-group>
            </template>
            <span slot="footer" class="dialog-footer">
                 <el-button @click="dialogVisible = false">取 消</el-button>
                 <el-button type="primary" @click="sure_custom">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import moment from  'moment'

    //    import Upload from '../../widgets/slect2'
    import {Upload, Radio} from 'element-ui'
    import {mapState, mapActions} from 'vuex'


    import {file} from '../../../api/apis.js' // 上传

    export default {
        data() {
            return {
                //  isType  是否显示true
                //  isInput  是否输入框
                //  required  是否禁用
                //  isImg  是否图片上传
                //  other  其他上传
                //  isSex  sex
                //  type  正面照 & 手持照 & 照片
                all_info: {
                    user_name: {
                        data: "user_name",
                        value: "",
                        name: "用户姓名",
                        isType: true,
                        isInput: true,
                        valid: 'user_name',
                        maxLength: '10'
                    },
                    idcard: {
                        data: "idcard",
                        value: "",
                        name: "身份证号",
                        isType: true,
                        isInput: true,
                        required: true,
                        valid: 'idcard'
                    },
                    bank_card_number: {
                        data: 'bank_card_number',
                        value: "",
                        name: "银行卡号",
                        isType: null,
                        isInput: true,
                        valid: ''
                    },
                    phone: {data: "phone", value: "", name: "手机号", isType: null, isInput: true, phone: ''},
                    license_plate_number: {
                        data: 'license_plate_number',
                        value: "",
                        name: '车牌号码',
                        isType: null,
                        isInput: true,
                        valid: '',
                        maxLength: '20'

                    },
                    frame_number: {
                        data: 'frame_number',
                        value: "",
                        name: '车架号码',
                        isType: null,
                        isInput: true,
                        valid: '',
                        maxLength: '20'
                    },
                    engine_number: {
                        data: 'engine_number',
                        value: "",
                        name: '发动机号码',
                        isType: null,
                        isInput: true,
                        valid: '',
                        maxLength: '20'

                    },
                    drivers_license_number: {
                        data: 'drivers_license_number',
                        value: "",
                        name: '驾驶证号码',
                        isType: null,
                        isInput: true,
                        valid: '',
                        required: true
                    },
                    file_encoding: {
                        data: 'file_encoding',
                        value: "",
                        name: '档案编码',
                        isType: null,
                        isInput: true,
                        valid: '',
                        maxLength: '20'
                    },

                    company_name: {
                        data: 'company_name',
                        value: "",
                        name: '公司名称',
                        isType: null,
                        isInput: true,
                        valid: '',
                        maxLength: '20'
                    },
                    initial_licensing_time: {
                        data: 'initial_licensing_time',
                        value: "",
                        name: '初次领证日期',
                        isType: null,
//                        isInput: true,
                        valid: '',
                        isTime: true,
                    },
                    quasi_driving_type: {
                        data: 'quasi_driving_type',
                        value: "",
                        name: '准驾车型',
                        isType: null,
//                        isInput: true,
                        valid: '',
                        isSelect: true
                    },
                    qq: {data: 'qq', value: "", name: 'QQ', isType: null, isInput: true, valid: '', maxLength: '20'},
                    email: {
                        data: 'email',
                        value: "",
                        name: 'Email',
                        isType: null,
                        isInput: true,
                        valid: '',
                        maxLength: '20'
                    },

                    sex: {data: '', value: "sex", name: '性别', isType: null, isSex: true,  valid: ''},
                    photo: {data: 'photo', value: "", name: '照片', isType: null, isImg: true, type: 'photo', valid: ''},
                    idcard_handheld_photo: {
                        data: 'idcard_handheld_photo',
                        value: '',
                        name: '手持身份证照',
                        isType: null,
                        isImg: true,
                        type: 'idcard_handheld_photo',
                        valid: ''
                    },
                    idcard_positive_photo: {
                        data: 'idcard_positive_photo',
                        value: '',
                        name: '身份证正面照',
                        isImg: true,
                        type: 'idcard_positive_photo',
                        valid: ''
                    },
                    user_attachment_list: {
                        data: '',
                        value: 'user_attachment_list',
                        name: "其他证照",
                        isType: true,
                        type: 'other',
                        other: true,
                        valid: ''
                    }
                },

                ent_info: {
                    user_name: {data: "user_name", value: "", name: "企业名称", isType: null, isInput: true, valid: ''},
                    idcard: {
                        data: "idcard",
                        value: '',
                        name: "组织机构",
                        isType: null,
                        isInput: true,
                        required: true,
                        valid: '',
                    },
                    enterprise_business_license: {
                        data: '',
                        value: '',
                        name: '企业营业执照',
                        isType: true,
                        isImg: true,
                        type: 'enterprise_business_license',
                        valid: '',

                    },
                    user_attachment_list: {
                        data: '',
                        value: 'user_attachment_list',
                        name: "其他证照",
                        isType: true,
                        type: 'other',
                        other: true,
                        valid: ''
                    }


                },
                user_info_data: '',
                fileList: [], // 其他照片
                fileList1: [], // 照片
                fileList2: [], // 手持身份证照
                fileList3: [], // 身份证正面照
                fileList4: [], // 企业照
                photo: 'photo',
                imgList: [], // 其他照片展示
                url: file.cfg.url,  // file
                dialogVisible: false,  // dialog
                id: '',
                others: { // 存续其他照片信息
                    values: {},
                    texta: {},
                },
                uploadData: {},
                valids: {
                    user_name: '',
                    idcard: '',
                    bank_card_number: '',
                    phone: '',
                    license_plate_number: '',
                    frame_number: '',
                    engine_number: '',
                    drivers_license_number: '',
                    file_encoding: '',
                    quasi_driving_type: '',
                    initial_licensing_time: '',
                    qq: '',
                    email: '',
                    company_name: '',
                },
                ent_valids: {
                    user_name: '',
                    idcard: '',

                },
                headers: {
                    'HaiYi-Access-Token': ''
                },


                bigImg: {
                    src: '',
                    imgShow: false,

                },
                user_type_id: '',

                rules: {
                    user_name: {required: true, message: '请输入用户', trigger: 'blur'},
//                    idcard: {required: false},
                    bank_card_number: {required: true, message: '请输入银行卡号', trigger: 'blur'},

                    phone: [

                        {
                            required:true,
                            validator:(rule,value,callback)=>{
                                if(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(value) == false){
                                    callback(new Error("请输入正确的手机号"));
                                }else{
                                    callback();
                                }
                            }, trigger:'blur'
                        }],
                    license_plate_number: {required: true, message: '请输入车牌号码', trigger: 'blur'},
                    frame_number: {required: true, message: '请输入正确的车架号（20字以内）', trigger: 'blur'},
                    engine_number: {required: true, message: '请输入发动机号码', trigger: 'blur'},
                    drivers_license_number: [{required: true, message: '请填写正确的驾驶证号码', trigger: 'blur'}],
                    file_encoding: [{required: true, message: '请输入正确的档案编码（20字以内）', trigger: 'blur'}],
//                    quasi_driving_type: {required: true, message: '请输入准驾车型', trigger: 'blur'},
//                    initial_licensing_time: {required: false, message: '请输入初次领证日期', trigger: 'change'},
                    qq: {required: true, message: '请输入qq', trigger: 'blur'},
                    email: {required: true, type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur'},
                    company_name: {required: true, message: '请输入公司名称', trigger: 'blur'},

                },
                ent_rules: {
                    user_name: {required: true, message: '请输入企业名称', trigger: 'blur'},
//                    idcard: {required: true, message: '请输入组织机构', trigger: 'blur'},
                },
                quasi_option:[]

            }
        },
        component: {
            Upload,
            Radio,
        },
        methods: {

            close_popup() {
                this.bigImg.imgShow = false;
            },
            handlePreview(file) {
                this.bigImg.src = file.url;
                this.bigImg.imgShow = true;
            },
            before_file(file) {
                // 上传前
                console.log(file);
            },
            sure_custom() {
                this.dialogVisible = false;


                if (this.user_type_id == 0) {

                    for (let i in this.all_info) {
                        if (typeof this.all_info[i].value == 'boolean') {
                            this.all_info[i].value = ''
                        }
                        this.all_info[i].isType = this.all_info[i].value || this.all_info[i].value == '' ? true : false;

                        if (this.all_info.user_attachment_list.data && this.all_info.user_attachment_list.data.length) {
                            this.all_info.user_attachment_list.isType = true
                        }

                        if(this.all_info.sex.value == true) {
                            this.all_info.sex.value = 2
                        }

                        this.all_info.user_name.isType = true


                    }
                } else {
                    for (let i in this.ent_info) {
                        if (typeof this.ent_info[i].value == 'boolean') {

                            this.ent_info[i].value = ''
                        }
                        this.ent_info[i].isType = this.ent_info[i].value || this.ent_info[i].value == '' ? true : false;
                        if (this.ent_info.user_attachment_list.data && this.ent_info.user_attachment_list.data.length) {
                            this.ent_info.user_attachment_list.isType = true
                        }
                    }
                }


            },
            handleSuccess_photo(file) {
                if (file.code !== '0000') {
                    return false
                }
                file.data.map(item => {
                    this.all_info.photo.value = item.url;
                    this.fileList1.push({url: item.url});
                });
            },
            handleSuccess_idcard(file) {
                if (file.code !== '0000') {
                    return false
                }
                file.data.map(item => {
                    this.all_info.idcard_handheld_photo.value = item.url;

                    this.fileList2.push({url: item.url})
                });

            },
            handleSuccess_pos(file) {
                if (file.code !== '0000') {
                    return false
                }
                file.data.map(item => {
                    this.all_info.idcard_positive_photo.value = item.url;

                    this.fileList3.push({url: item.url})
                });
            },
            handleSuccess_ent(file) {
                if (file.code !== '0000') {
                    return false
                }
                file.data.map(item => {
                    this.ent_info.enterprise_business_license.value = item.url;

                    this.fileList4.push({url: item.url})
                });
            },
            handleSuccess_other(file) {
                if (file.code !== '0000') {
                    return false
                }

                file.data.map(item => {
                    this.imgList.push(item);
                    this.fileList.push({url: item.url})

                });


            },

            handleError(file) {
                console.log(file);
            },
            sure_form() {

                let arr = [];
                let index = 0;
                let data = {
                    id: this.id,
                    user_type: this.user_type_id
                };

                for (let i in this.others.values) {
                    let obj = {};
                    obj.certificate_des = this.others.values[i];
                    obj.certificate_name = this.others.texta[i];
                    obj.user_id = this.id;
                    obj.certificate_url = this.imgList[index++].url;

                    arr.push(obj); // 拼接其他证照

                }

                if (this.user_type_id == '0') {
                    for (let i in this.all_info) {

                        this.valids[i] = this.all_info[i].value; // 验证

                        if (this.all_info[i].value) {
                            data[i] = this.all_info[i].value
                        }
                    }


                    // 0， 2 男
                    if (this.all_info.sex && this.all_info.sex.value == 2) {
                        data.sex = 0
                    }

                    if (this.all_info.user_attachment_list.value || this.all_info.user_attachment_list) {
                        data.user_attachment_list = arr;
                    }


                    this.$refs.valids.validate((valid) => {

                        if (valid) {
                            this.audit_update(data)

                        } else {
                            return false
                        }
                    })
                } else {
                    for (let i in this.ent_info) {

                        this.ent_valids[i] = this.ent_info[i].value; // 验证

                        if (this.ent_info[i].value) {
                            data[i] = this.ent_info[i].value
                        }

                        if (this.ent_info.user_attachment_list.value || this.ent_info.user_attachment_list) {
                            data.user_attachment_list = arr;
                        }
                    }

                    this.$refs.ent_valids.validate((valid) => {
                        if (valid) {
                            this.audit_update(data)

                        } else {
                            return false
                        }
                    })
                }

            },
            ...mapActions(['user_id', 'audit_update','user_quasi_driving'])

        },
        computed: {
            ...mapState({
                get_user_id: state => state.get_user_id,
                get_audit_update: state => state.get_audit_update,
                get_user_quasi_driving: state => state.get_user_quasi_driving
            })
        }
        ,
        watch: {
            'get_user_id': {
                handler: function (n, o) {
                    if (n.code !== '0000') {
                        return false
                    }

                    this.user_info_data = n.data;
                    this.user_type_id = n.data.user_type;


                    for (let i in n.data) {


                        // 0 个人  1 企业
                        if (this.user_type_id == '0') {


                            // 回显图片
                            if (n.data.photo) {
                                this.fileList1.push({url: n.data.photo})
                            }
                            if (n.data.idcard_handheld_photo) {
                                this.fileList2.push({url: n.data.idcard_handheld_photo})
                            }
                            if (n.data.idcard_positive_photo) {
                                this.fileList3.push({url: n.data.idcard_positive_photo})
                            }


                            for (let j in this.all_info) {


                                if (j == i) {
                                    this.all_info[j].value = n.data[i];  // 个人

                                    this.all_info[j].isType = this.all_info[j].value || this.all_info[j].value == '' ? true : false; // 个人


                                    // 验证 赋值
                                    if (n.data[i]) {
                                        this.all_info[j].valid = i
                                    }
                                    this.all_info.user_name.valid = 'user_name';
//                                    this.all_info.idcard.valid = 'idcard';


                                    this.all_info.user_name.isType = true;
//                                    this.all_info.idcard.isType = true;


                                    // 驾驶证

                                    this.all_info.drivers_license_number.value = n.data.idcard;
                                    this.all_info.drivers_license_number.isType = true;

//                                    // 性别
//                                    if (this.all_info[j].data == 2) {
//                                        this.all_info[j].isType = false;
//                                        this.all_info[j].value = null
//                                    }



                                    if (n.data.sex == 0) {
                                        this.all_info.sex.isType = true;
                                        this.all_info.sex.value = 2
                                    } else if (n.data.sex == 1){
                                        this.all_info.sex.isType = true;
                                        this.all_info.sex.value = 1
                                    }

                                    // 其他证照 回显
                                    if (n.data.user_attachment_list.length) {
                                        this.all_info.user_attachment_list.isType = true;
                                        this.imgList = n.data.user_attachment_list.map((item, i) => {
                                            this.others.values[i] = item.certificate_des;
                                            this.others.texta[i] = item.certificate_name;
                                            item.url = item.certificate_url;
                                            return item;
                                        })
                                    } else {
                                        this.all_info.user_attachment_list.isType = false;
                                        this.all_info.user_attachment_list.value = null;
                                    }


                                }
                            }
                        } else {

                            if (n.data.enterprise_business_license) {
                                this.fileList4.push({url: n.data.enterprise_business_license})
                            }

                            // 企业
                            for (let k in this.ent_info) {
                                if (k == i) {
                                    this.ent_info[k].value = n.data[i]
                                    this.ent_info[k].isType = this.ent_info[k].value || this.ent_info[k].value == '' ? true : false;


                                    if (n.data[i]) {
                                        this.ent_info[k].valid = i
                                    }
                                    this.ent_info.user_name.valid = 'user_name';
                                    this.ent_info.user_name.isType = true;

//                                    this.ent_info.idcard.valid = 'idcard';

//                                    this.ent_info.idcard.isType = true;


                                    if (n.data.user_attachment_list.length) {
                                        this.ent_info.user_attachment_list.isType = true;
                                        this.imgList = n.data.user_attachment_list.map((item, i) => {
                                            this.others.values[i] = item.certificate_des;
                                            this.others.texta[i] = item.certificate_name;
                                            item.url = item.certificate_url;
                                            return item;
                                        })
                                    } else {
                                        this.ent_info.user_attachment_list.isType = false;
                                        this.ent_info.user_attachment_list.value = null;
                                    }
                                }

                            }
                        }


                    }

                    this.form = this.all_info


                }
            }
            ,
            get_audit_update: {
                handler: function (n, o) {
                    if (n.code !== '0000') {
                        return false
                    }
                    this.$router.push('/user');
                }
            },
            get_user_quasi_driving: {
                handler: function (n, o) {
                    if(n.code !== '0000') {
                        return false
                    }


                    for (let i in n.data) {
                        let obj = {
                            value: i,
                            label: n.data[i]
                        };
                        this.quasi_option.push(obj);
                    }



                }
            }
        },
        created() {
            this.id = this.$route.query.userId;
            this.user_id({
                id: this.id}
                );
            this.user_quasi_driving({});

            this.headers['HaiYi-Access-Token'] = sessionStorage.token;

        },

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

    .custom—checkbox {
        width: 50%;
        display: inline-block;
    }

    .mar-bottom {
        margin-bottom: 20px;
    }

    .el-upload__tip {
        display: none !important;
    }

    .other_phones {
        width: 100%;
    }

    .el-upload .el-dragger .el-icon-upload {
        margin: 0;
        padding: 10px 0;
    }

    .list-none .el-upload__files {
        display: none;
    }

    .detail_info .el-draggeer__cover__btns span:last-child {
        display: none !important;
    }

    .content-wrapper {
        display: block;
    }

    .mar-tops {
        margin-top: 8px;
    }

    .popups {
        position: fixed;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.5);
        width: 100%;
        height: 100%;
        z-index: 99;
    }

    .set-img {
        max-width: 900px;
        max-height: 600px;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
    }
    .set-time-width .el-form-item__label{
        width: 120px !important;
    }
    .not-custom {
        display: none;
    }
    .not-custom:last-child {
        text-align: center;
        display: block;
    }

</style>