<template>
    <div class="base">
        <div class="page-header page-header-lg panel border-top-info" style="padding-bottom: 0;">
            <div class="page-header-content">
                <div class="page-title" style="padding: 17px 0;">
                    <h4><i class="icon-arrow-left52 position-left"></i> <span class="text-semibold">供应商</span></h4>
                </div>
            </div>
        </div>

        <!--<div class="panel panel-flat border-left-info">
            <div class="panel-body">

                <div action="#" class="form-horizontal">
                    <div class="form-group form-group-xs form-no-bottom">
                        <label class="col-lg-2 control-label">供应商名称:</label>
                        <div class="col-lg-3">
                            <input type="text" class="form-control" v-model="search_name" placeholder="请输入供应商名称"
                                   maxlength="10" v-on:keyup.enter="on_list()">
                        </div>
                        <div class="col-lg-2">
                            <button type="submit" class=" btn btn-primary" @keyup.enter="searchList()">查询</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>-->
        <!--<div class="panel panel-body border-left-info">
            <button type="button" class="btn btn-info" v-on:click="addSupply()">添加供应商</button>
        </div>-->

        <div class="">
            <template>
                <el-table
                        :data="tableData"
                        border
                        style="width: 100%"
                >
                    <el-table-column
                            prop="full_name"
                            label="供应商全称"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="abbreviation_name"
                            label="供应商简称"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="contacts"
                            label="联系人"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="contacts_phone"
                            label="联系电话"
                            width="100">
                    </el-table-column>                                    
                    <el-table-column
                            inline-template
                            :context="_self"
                            label="操作"
                            width="120">
      <span>
        <el-button
                @click.native.prevent="deleteRow($index, tableData)"
                type="text"
                size="small">编辑信息

        </el-button>
      </span>
                    </el-table-column>
                </el-table>
            </template>

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
        <!--<app-table :columns="columns" ></app-table>-->
                <el-dialog title="添加供应商" v-model="dialogFormVisible">
                    <el-form  :model="form" ref="dynamicForm" :rules="rules">
                        <el-form-item label="公司全称" :label-width="formLabelWidth">
                            <el-input auto-complete="off" v-model="form.full_name" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="公司简称" :label-width="formLabelWidth">
                            <el-input auto-complete="off" v-model="form.abbreviation_name" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="联系人" :label-width="formLabelWidth" prop="contacts">
                            <el-input auto-complete="off" v-model="form.contacts" ></el-input>
                        </el-form-item>
                        <el-form-item label="联系电话" :label-width="formLabelWidth" prop="contacts_phone">
                            <el-input auto-complete="off" v-model="form.contacts_phone"></el-input>
                        </el-form-item>
                        <el-form-item label="联系邮箱" :label-width="formLabelWidth" prop="contacts_email">
                            <el-input auto-complete="off" v-model="form.contacts_email"></el-input>
                        </el-form-item>
                       
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="ensure()">确 定</el-button>
                        <el-button @click="dialogFormVisible = false">取 消</el-button>                        
                    </div>
                </el-dialog>
    </div>
</template>
<script>


    //    import appTable from './../../widgets/table'
    //    import Modal from '../../widgets/modal'

    import moment from 'moment'
    import {Pagination, Table} from 'element-ui'

    import {mapState, mapActions} from 'vuex'

    export default {
        data () {
            return {
                historyPage: '',
                search_name: '',
                id:'',
                page: {
                    total: 1,
                    page_size: 10,
                    page: 1
                },
                tableData: [],
                dialogFormVisible: false,
                formLabelWidth: '120px',
                form:{
                    abbreviation_name:'',                   
                    contacts:'',
                    contacts_email:'',
                    contacts_phone:'',
                    full_name:''
                },
                rules:{                   
                    contacts: [
                         { required: true, message: '请填写联系人', trigger: 'change' },
                         { min: 1, max: 10, message: '长度不能超过10个', trigger: 'change' }
                    ],
                    contacts_phone: [
                         {
                            required:false,
                            validator:(rule,value,callback)=>{
                                if(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(value) == false){
                                    callback(new Error("请输入正确的手机号"));
                                }else{
                                    callback();
                                }
                            }, trigger:'blur'
                        },
                        {
                            validator:(rule,value,callback)=>{
                                if(/^\d+$/.test(value) == false){
                                    callback(new Error("请输入正确的手机号"));
                                }else{
                                    callback();
                                }
                            }, max:11, trigger:'blur,change'
                        }

                    ],
                    contacts_email: [                        
                        { required: true,type: 'email', message: '请输入正确的邮箱地址', trigger: 'change' },
                        { max: 100, message: '长度不能超过100个', trigger: 'change' }
                    ]
                }
            }
        },
        component: {
            Pagination,
            Table
        },

        methods: {
            deleteRow(index, rows) {
                this.id=rows[index].id;
                this.dialogFormVisible = true;
                this.form.abbreviation_name=rows[index].abbreviation_name;
                this.form.contacts=rows[index].contacts;
                this.form.contacts_email=rows[index].contacts_email;
                this.form.contacts_phone=rows[index].contacts_phone;
                this.form.full_name=rows[index].full_name;
               

                //this.addr_modal();
                // alert(this.id);
                // console.log(this.id);
                //console.log(rows[index]);
            },
//            handleSizeChange(val) {
//                console.log(`每页 ${val} 条`);
//            },
            handleCurrentChange(val) {
                this.page.page = val;
                this.on_list();
               // console.log(`当前页: ${val}`);
            },
            addSupply() {

            },
            ensure(){
                
                
               
                this.$refs.dynamicForm.validate((valid) => {
                    if (valid) {  
                        //alert('submit!');                   
                        this.dialogFormVisible = false;
                        this.supply_update();
                    } else {
                       // console.log('error submit!!');
                        return false;
                    }
                });
                
                
            },
            supply_update(){                
                 this.supplier_update({
                    id: this.id, 
                    contacts: this.form.contacts,
                    contacts_email:this.form.contacts_email,
                    contacts_phone:this.form.contacts_phone
                });
                
            },
            addrs_modal() {
                this.$refs.modaladdr.show()
            },
            on_list () {
                this.supplier_page({
                    page: this.page.page,
                    page_size: this.page.page_size, 
                })
 
            },
            searchList() {

            },

            ...mapActions(['supplier_page']),
            ...mapActions(['supplier_update']),

        },
        computed: {
            ...mapState({
                get_supplier_page: state => state.get_supplier_page
            }),
            ...mapState({
                get_supplier_update: state => state.get_supplier_update
            })
        },
        watch: {
            'get_supplier_page': {
                handler: function (n, o) {
                    
                    n.data.items = n.data.items.map(item => {
                        item.contacts =item.contacts.trim();
                        item.contacts_email = item.contacts_email.trim();
                        item.contacts_phone = item.contacts_phone.trim();
                        return item;
                    }); 
                     this.tableData = n.data.items;                  
                    this.page.total = n.data.total_page;
                    this.page.page_size = n.data.page_size;
                }
            },
            'get_supplier_update':{
                handler: function (n, o) {

                    this.tableData = n.data.items;                    
                    this.page.total = n.data.total_page;
                    this.page.page_size = n.data.page_size;
                }
            },
        },
        created() {
        },
        mounted() {
            this.supplier_page({page: 1, page_size: 10});
            
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

    .el-table__header, .el-table__body {
        width: 100% !important;
    }

    .el-table .cell, .el-table th > div {
        padding: 0 10px !important;
    }
    /*.el-input__inner{
        width:40% !important;
    }*/
</style>