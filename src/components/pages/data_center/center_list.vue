<template>
    <div class="base">
        <div class="page-header page-header-lg panel border-top-info" style="padding-bottom: 0;">
            <div class="page-header-content">
                <div class="page-title" style="padding: 17px 0;">
                    <!--<h4><i class="icon-arrow-left52 position-left"></i> <span class="text-semibold">数据中心</span></h4>-->
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/' }">数据中心</el-breadcrumb-item>
                        <!--<el-breadcrumb-item>活动管理</el-breadcrumb-item>-->
                        <!--<el-breadcrumb-item>活动列表</el-breadcrumb-item>-->
                        <!--<el-breadcrumb-item>活动详情</el-breadcrumb-item>-->
                    </el-breadcrumb>
                </div>
            </div>
        </div>

        <div class="panel panel-flat border-left-info">
            <div class="panel-body">
                <div action="#" class="form-horizontal">
                    <div class="form-group form-group-xs">
                        <label class="col-lg-2 col-md-2  col-xs-2 control-label">数据名称:</label>
                        <div class="col-lg-2  col-md-2 col-xs-2">
                            <!--<input type="text" class="form-control" v-model="data_name" placeholder="" maxlength="10" v-on:keyup.enter="on_list()">-->
                            <el-input v-model="search.name" auto-complete="off"></el-input>
                        </div>
                        <label class="col-lg-2 col-md-2  col-xs-2 control-label">数据类型:</label>
                        <div class="col-lg-2 col-md-2  col-xs-2">
                            <el-select v-model="search.type" placeholder="请选择">
                                <el-option v-for="(item,index) in data_type_str" :label="item" :value="index">
                                </el-option>
                            </el-select>
                        </div>
                        <label class="col-lg-2 col-md-2  col-xs-2 control-label">数据归属:</label>
                        <div class="col-lg-2 col-md-2  col-xs-2">
                            <el-select v-model="search.platform" placeholder="请选择">
                                <el-option v-for="item in data_platform" :label="item.label" :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="form-group form-group-xs form-no-bottom">
                        <label class="col-lg-2 col-md-2 col-xs-2 control-label">数据来源:</label>
                        <div class="col-lg-2 col-md-2  col-xs-2">
                            <el-select v-model="search.source" placeholder="请选择">
                                <el-option v-for="item in supplierData" :label="item.abbreviation_name" :value="item.id">
                                </el-option>
                            </el-select>
                            <!--<select name="select" class="form-control">
                                <option value=" " selected>请选择</option>
                                <option v-for="item in supplierData" v-bind:value="item.id">{{item.abbreviation_name}}</option>
                            </select>-->
                        </div>
                        <label class="col-lg-2 col-md-2 col-xs-2 control-label">状态:</label>
                        <div class="col-lg-2 col-md-2 col-xs-2">
                            <!--0开启 1关闭-->
                            <el-select v-model="search.status" placeholder="请选择">
                                <el-option v-for="(item,index) in status" :label="item" :value="index">
                                </el-option>
                            </el-select>
                            <!--<select name="select" class="form-control">
                                <option value=" " selected>请选择</option>
                                <option></option>
                            </select>-->
                        </div>
                        <div class="col-lg-2 col-md-2 col-xs-2 col-lg-offset-2 col-md-offset-2 col-xs-offset-2">
                            <button type="button" class=" btn btn-info" @click="searchList()">查询</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <!--新建数据按钮-->
        <!--<template>
            <el-button type="info" @click="dialogFormVisible=true" style="margin-bottom:20px;">新建数据</el-button>
        </template>-->

        <!--列表-->
        <div class="">
            <template>
                <el-table :data="tableData" border style="width: 100%">
                    <el-table-column prop="data_name" label="数据名称" width="100">
                    </el-table-column>
                    <el-table-column prop="data_type" label="数据类型" width="120">
                    </el-table-column>
                    <el-table-column prop="data_ascription_display" label="数据归属" width="100">
                    </el-table-column>
                    <el-table-column prop="abbreviation_name" label="数据来源" width="100">
                    </el-table-column>
                    <el-table-column prop="item_count" label="查询件数" width="110">
                    </el-table-column>
                    <el-table-column inline-template :context="_self" label="操作" width="120">
                        <span>

                            
                            <el-switch v-model="switchVal[$index].state" on-text="" off-text="" @change="deleteRow($index, tableData)">
                            </el-switch>
                            <i class="el-icon-picture" @click="showImgDia($index, tableData)"></i>
                        </span>
                    </el-table-column>
                </el-table>
            </template>

            <div class="block" style="text-align: center;margin-top: 30px">
                <el-pagination @current-change="handleCurrentChange" :current-page="page.page" :page-size="1" layout="prev, pager, next, jumper"
                    :total="page.total">
                </el-pagination>
            </div>
        </div>

        <!--<app-table :columns="columns" ></app-table>-->
        <!--弹框-->
        <el-dialog title="新建数据" v-model="dialogFormVisible">
            <el-form :model="form" :rules="rules" ref="form" label-width="140px">
                <el-form-item label="数据名称" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="事件标识" :label-width="formLabelWidth">
                    <el-input v-model="form.flag" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="数据归属" :label-width="formLabelWidth">
                    <el-select v-model="form.ascription" placeholder="请选择数据归属">
                        <el-option label="基础资料" value="0"></el-option>
                        <el-option label="极车公社" value="1"></el-option>
                        <el-option label="易人易车" value="2"></el-option>
                        <el-option label="e租汇" value="3"></el-option>
                        <el-option label="用好车" value="4"></el-option>
                        <el-option label="品牌车队" value="5"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="数据类型" :label-width="formLabelWidth">
                    <el-select v-model="form.type" placeholder="请选择数据类型">
                        <el-option label="个人" value="0"></el-option>
                        <el-option label="企业" value="1"></el-option>
                        <el-option label="个人/企业" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="数据来源" :label-width="formLabelWidth">
                    <el-select v-model="form.source" placeholder="请选择数据来源">
                        <el-option v-for="item in supplierData" v-bind:label="item.abbreviation_name" v-bind:value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="数据描述" :label-width="formLabelWidth">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <!--<el-button @click="dialogFormVisible = false">取 消</el-button>-->
                <el-button type="primary" @click="addData();">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="图例" v-model="dialogImg" size="tiny">
            <img class="big-img" v-bind:src="imgSrc">
        </el-dialog>

        <!--改变状态-->
        <el-dialog title="提示" v-model="dialogVisible" size="tiny">
            <span>
            是否改变此数据查询功能？
            </span>
            <span slot="footer" class="dialog-footer">
                
                <el-button @click="dialog_pop(false)">取 消</el-button>
                <el-button type="primary" @click="dialog_pop(true)">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>


    //    import appTable from './../../widgets/table'
    //    import Modal from '../../widgets/modal'

    import moment from 'moment'
    import {Pagination, Table, MessageBox} from 'element-ui'

    import {mapState, mapActions} from 'vuex'

    export default {
        data () {
            return {
                historyPage: '',
                data_name: '',
                data_source: '',
                data_type: '',
                page: {
                    total: 1,
                    page_size: 10,
                    page: 1
                },
                tableData: [],
                data_type_str:['个人','企业','个人/企业'],
                status:['开启','关闭'],
                dialogFormVisible:false,
                dialogImg:false,
                imgSrc:'',
                form:{
                    name:'',
                    flag:'',
                    ascription:'',
                    type:'',
                    source:'',
                    desc:''
                },
                search:{
                    name:'',
                    type:'',
                    platform:'',
                    source:'',
                    status:''
                },
                supplierData:[],
                data_platform:[],
                formLabelWidth: '120px',
                value: '',
                switchVal:{},
                dialogVisible:false,
                crrt_row:null,
                rules: {
                    name:[
                        { required: true, max:20, message: '请输入20字以内的用户姓名', trigger: 'blur' }
                    ],
                }
            }
        },
        component: {
            Pagination,
            Table
        },

        methods: {
            dialog_pop(flag){
                let switch_state = this.$data.switchVal[this.$data.crrt_row].state,
                    switch_id = this.$data.switchVal[this.$data.crrt_row].id,
                    upVal = '';
                if(flag === false){//取消
                    this.$data.switchVal[this.$data.crrt_row].state = !switch_state;
                    this.$data.dialogVisible=false;
                }else if(flag === true){//确定
                    if(switch_state === true){
                        upVal=0
                    }else if(switch_state === false){
                        upVal=1
                    }
                    this.data_status_update({
                        id:switch_id,
                        status:upVal
                    }); 
                }
            },
            deleteRow(index, rows) {
                this.$data.dialogVisible=true;

                this.$data.crrt_row=index;
                
            },
            showImgDia(index, rows){
                this.dialogImg=true;
                this.imgSrc=rows[index].detail_url;
            },
            handleCurrentChange(val) {
                this.page.page = val;
                this.on_list();
            },
            addData(ev) {
                
                this.$refs.form.validate((valid) => {
                    console.log(valid);
                    if (valid) {

                        this.data_create({
                            data_ascription:this.form.ascription,
                            data_dec:this.form.desc,
                            data_name:this.form.name,
                            data_type:this.form.type,
                            event_flag:this.form.flag,
                            supplier_id:this.form.source
                        });
                    } else {
                        console.log('err');
                        return false;
                    }
                });
            },
            optSwitch(){
                this.$switch({
                    text:'ab'
                }).then(action =>{
                    console.log(action);
                })
            },
            on_list () {
                this.data_center_list({
                    data_name:this.search.name,
                    data_type:this.search.type,
                    data_ascription:this.search.platform,
                    supplier_id:this.search.source,
                    status:this.search.status,
                    page: this.page.page,
                    page_size: this.page.page_size,
                })

            },
            searchList() {
                this.page.page=1,
               this.on_list();
            },

            ...mapActions(['data_center_list','supplier_list','data_create','data_status_update','data_service_platform'])
        },
        computed: {
            ...mapState({
                get_data_center_list: state => state.get_data_center_list,
                get_supplier_list: state => state.get_supplier_list,
                get_data_create : state => state.get_data_create,
                get_data_status_update: state => state.get_data_status_update,
                get_data_service_platform: state => state.get_data_service_platform
            })
        },
        watch: {
            'get_data_center_list': {
                handler: function (n, o) {
                    this.page.total = n.data.total_page;
                    this.page.page_size = n.data.page_size;

                    n.data.items= n.data.items.map((item,index) => {
                        item.data_type = this.data_type_str[item.data_type];
                        // 数据状态 0:开启；1:关闭
                        if(item.status === 0){
                            item.switchState = true;
                        }else if(item.status === 1){
                            item.switchState = false;
                        }
                        this.switchVal[index] = {state:item.switchState,id:item.id};
                        item.data_ascription_display = item.data_ascription_display?item.data_ascription_display:'-';
                        return item;
                    });
                    this.tableData = n.data.items;
                    
                }
            },
            'get_supplier_list': {
                handler: function (n, o) {

                    n.data= n.data.map(item => {
                        item.data_type = this.data_type_str[item.data_type];
                        return item;
                    });
                    this.supplierData = n.data;
                    
                }
            },
            'get_data_create':{
                handler: function(n,o){
                    
                }
            },
            'get_data_status_update':{
                handler:function(n,o){
                    if(n.code !== '0000') return;
                    let switch_state = ''
                    if(n.data.status === 0){
                        switch_state = true;
                    }else if(n.data.status === 1){
                        switch_state = false;
                    }
                    this.$data.switchVal[this.$data.crrt_row].state = switch_state;
                    this.$data.dialogVisible=false;
                }
            },
            'get_data_service_platform': {
                handler: function (n, o) {
                    if(n.code !== '0000') return;
                    for(let i in n.data){
                        this.data_platform.push({
                            id:i,
                            label:n.data[i]
                        })
                    }
                }
            },
        },
        created() {
            this.data_service_platform({});
        },
        mounted() {
            this.data_center_list({
                page: 1, 
                page_size: 10,
                data_ascription: '',
                data_name:'',
                data_type:'',
                status:'',
                supplier_id:''    
            });
            this.supplier_list({});
            
        },
        beforeMount() {

        },

        events: {
            refresh: function (e) {
                this.pageCfg.cur = e;

                this.on_list();
            }
        }
    }
</script>
<style>
    .form-no-bottom {
        margin-bottom: 0;
    }
    
    .el-table__header,
    .el-table__body {
        width: 100% !important;
    }
    
    .el-table .cell,
    .el-table th > div {
        padding: 0 10px !important;
    }
    
    .big-img {
        width: 100%;
    }
</style>