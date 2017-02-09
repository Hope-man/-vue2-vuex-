<template>
    <div class="base">
        <div class="page-header page-header-lg panel border-top-info">
            <div class="page-header-content">
                <div class="">
                    <!--<h4><i class="icon-arrow-left52 position-left"></i> <span class="text-semibold">用户管理</span></h4>-->
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/user' }">用户管理</el-breadcrumb-item>
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
                    <div class="form-group first">
                        <label class="col-lg-1 control-label">用户姓名</label>
                        <div class="col-lg-2">
                            <input type="text" class="el-input__inner" placeholder="用户姓名" v-model="searchForm.user_name"
                                   @keyup.enter="on_list()"/>
                        </div>
                        <label class="col-lg-2 control-label">身份证/组织机构代码</label>
                        <div class="col-lg-2">
                            <input type="text" class="el-input__inner" placeholder="身份证/组织机构代码"
                                   v-model="searchForm.idcard" @keyup.enter="on_list()"/>
                        </div>


                        <label class="col-lg-1 control-label">用户类型</label>
                        <div class="col-lg-2">
                            <el-select v-model="searchForm.type_selected.value">
                                <el-option v-for="item in searchForm.type_selected.option" :label="item.label"
                                           :value="item.value"></el-option>
                            </el-select>
                        </div>
                    </div>


                    <div class="form-group form-group-xs form-no-bottom">
                        <label class="col-lg-1 control-label">服务平台</label>
                        <div class="col-lg-2">
                            <el-select v-model="searchForm.service.value">
                                <el-option v-for="item in searchForm.service.option" :label="item.label"
                                           :value="item.value"></el-option>
                            </el-select>
                        </div>
                        <label class="col-lg-2 control-label">业务名称</label>
                        <div class="col-lg-2">
                            <el-select v-model="searchForm.bs_name.value">
                                <el-option v-for="item in searchForm.bs_name.option" :label="item.label"
                                           :value="item.value"></el-option>
                            </el-select>
                        </div>
                        <label class="col-lg-1 control-label">当前状态</label>
                        <div class="col-lg-2">
                            <el-select v-model="searchForm.self_status.value">
                                <el-option v-for="item in searchForm.self_status.option" :label="item.label"
                                           :value="item.value"></el-option>
                            </el-select>
                        </div>
                        <div class="col-lg-2">
                            <button type="submit" class=" btn btn-info" @click="on_list()">搜索</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="panel panel-body border-left-info">
            <button type="button" class="btn btn-info" @click="addUser">新建用户</button>
        </div>

        <div class="">
            <template>
                <el-table
                        :data="tableData"
                        border
                        style="width: 100%"
                >
                    <el-table-column
                            prop="user_name"
                            label="用户姓名"
                            width="90">
                    </el-table-column>
                    <el-table-column
                            prop="idcard"
                            label="身份证/组织机构代码"
                            width="160">
                    </el-table-column>
                    <el-table-column
                            prop="user_type_display"
                            label="用户类型"
                            width="90">
                    </el-table-column>
                    <el-table-column
                            prop="audit_count"
                            label="审核次数"
                            width="90">
                    </el-table-column>
                    <el-table-column
                            inline-template
                            label="最后申请平台"
                            width="105">
                        <span class="time-block">
                            <span>{{row.Service_platform_display || '-'}}</span>
                        </span>
                    </el-table-column>
                    <el-table-column
                            inline-template
                            label="最后申请业务"
                            width="105">
                        <span class="time-block">
                            <span>{{row.model_name || '-'}}</span>
                        </span>
                    </el-table-column>
                    <el-table-column
                            inline-template
                            label="当前状态"
                            width="90">
                         <span class="time-block">
                            <span>{{row.audit_type_display || '-'}}</span>
                        </span>
                    </el-table-column>
                    <el-table-column
                            inline-template
                            label="审核人"
                            width="70">
                        <span class="time-block">
                            <span>{{row.modifier || '-'}}</span>
                        </span>
                    </el-table-column>
                    <el-table-column
                            inline-template
                            label="最后申请时间最后操作时间"
                            width="150">
                        <span class="time-block">
                            <span>{{row.create_time || '-'}}</span>
                            <span>{{row.modifier_time || '-'}}</span>
                        </span>
                    </el-table-column>
                    <el-table-column
                            inline-template
                            :context="_self"
                            label="操作"
                            width="90">
                            <span>
                                <el-button
                                        @click.native.prevent="lookRow($index, tableData)"
                                        type="text"
                                        size="small">查看详情
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


        <template>
            <el-dialog title="新建用户" v-model="dialogFormVisible">
                <el-form :model="add_user" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="用户类型" :label-width="formLabelWidth">
                        <el-select v-model="add_user.selected.value">
                            <el-option
                                    v-for="item in add_user.selected.option"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>

                    </el-form-item>

                    <!-- 0 个人 & 1企业-->
                    <template v-if="add_user.selected.value == 0">
                        <el-form-item label="用户姓名" :label-width="formLabelWidth" prop="user_name">
                            <input type="text" class="el-input__inner" v-model="add_user.user_name" maxlength="10"/>
                        </el-form-item>
                        <el-form-item label="身份证" :label-width="formLabelWidth" prop="numberID">
                            <input type="text" class="el-input__inner" v-model="add_user.numberID" maxlength="18"/>
                        </el-form-item>
                    </template>
                    <template v-else>
                        <el-form-item label="企业名称" :label-width="formLabelWidth" prop="enter_name">
                            <input type="text" class="el-input__inner" v-model="add_user.enter_name" maxlength="50"/>

                        </el-form-item>
                        <el-form-item label="组织机构代码" :label-width="formLabelWidth" prop="enter_numberID">
                            <input type="text" class="el-input__inner" v-model="add_user.enter_numberID"
                                   maxlength="50"/>

                        </el-form-item>
                    </template>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="sureUser">确 定</el-button>
                </div>
            </el-dialog>
        </template>

    </div>
</template>
<script>


    import moment from 'moment'

    import {Pagination, Table} from 'element-ui'

    import {mapState, mapActions} from 'vuex'

    export default {
        data () {
            return {
                searchForm: {
                    user_name: '',
                    idcard: '',
                    type_selected: {
                        option: [],
                        value: ''
                    },
                    service: {
                        option: [],
                        value: '',
                    },
                    bs_name: {
                        option: [],
                        value: '',
                    },
                    self_status: {
                        option: [],
                        value: '',
                    }
                },
                add_user: {
                    selected: {
                        option: [{label: '个人', value: 0}, {label: "企业", value: 1}],
                        value: 0,
                    },
                    user_name: '',
                    numberID: '',
                    enter_name: '',
                    enter_numberID: '',
                },
                formLabelWidth: '120px',
                dialogFormVisible: false,
                page: {
                    total: 1,
                    page_size: 10,
                    page: 1
                },
                tableData: [],
                rules: {
                    user_name: [
                        {required: true, message: '请输入用户姓名', trigger: 'blur'},
                    ],
                    numberID: [
                        {
                            required: true,
                            validator: (rule, value, callback) => {
                                if (/^[0-9a-zA-Z]{18}$/.test(value) == false) {
                                    callback(new Error("请输入18位正确的身份证号码"));
                                } else {
                                    callback();
                                }
                            }, trigger: 'blur'
                        }
                    ],
                    enter_name: [
                        {required: true, message: '请输入企业名称', trigger: 'blur'},
                    ],
                    enter_numberID: [
                        {required: true, message: '请输入组织机构代码', trigger: 'blur'},
                    ]
                }
            }
        },
        component: {
            Pagination,
            Table
        },

        methods: {
            sureUser() {
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        let data = {
                            user_type: this.add_user.selected.value,
                            user_name: this.add_user.user_name,
                            idcard: this.add_user.numberID
                        }

                        // 0 个人 & 1 企业
                        if (this.add_user.selected.value == 1) {
                            data.user_name = this.add_user.enter_name;
                            data.idcard = this.add_user.enter_numberID;
                        }

                        this.create_user(data);

                    } else {
                        return false
                    }
                });

//                this.add_model({
//                    user_name: this.name,
//                    service_platform: this.selected
//                })
            },
            addUser() {
                this.dialogFormVisible = true;
                if (this.$refs.ruleForm) {
                    this.$refs.ruleForm.resetFields();
                }
            },
            lookRow(index, rows) {
                this.$router.push({
                    path: '/user/detail',
                    query: {userId: rows[index].id, userType: rows[index].user_type}
                });
            },
            handleCurrentChange(val) {
                this.page.page = val;
                this.on_list();
            },
            on_list () {
                this.user_list({
                    page: this.page.page,
                    page_size: this.page.page_size,
                    user_name: this.searchForm.user_name,
                    idcard: this.searchForm.idcard,
                    user_type: this.searchForm.type_selected.value,
                    service_platform: this.searchForm.service.value,
                    model_name: this.searchForm.bs_name.value,
                    audit_status: this.searchForm.self_status.value
                })

            },

            ...mapActions([
                'user_list',
                'user_type',
                'data_service_platform',
                'status_list',
                'bs_model_name',
                'create_user'
            ])
        },
        computed: {
            ...mapState({
                get_user_list: state => state.get_user_list,
                get_user_type: state => state.get_user_type,
                get_data_service_platform: state => state.get_data_service_platform,
                get_status_list: state => state.get_status_list,
                get_bs_model_name: state => state.get_bs_model_name,
                get_create_user: state => state.get_create_user
            })
        },
        watch: {
            get_user_list: {
                handler: function (n, o) {
                    if (n.code !== '0000') {
                        return false
                    }

                    this.tableData = n.data.items.map(item => {
                        item.create_time = item.create_time ? moment(item.create_time).format('YYYY-MM-DD HH:mm:ss') : '-';
                        item.modifier_time = item.modifier_time ? moment(item.modifier_time).format('YYYY-MM-DD HH:mm:ss') : '-';
                        return item;
                    });


                    this.page.total = n.data.total_page;
                    this.page.page_size = n.data.page_size;
                }
            },
            get_user_type: {
                handler: function (n, o) {
                    if (n.code !== '0000') {
                        return false
                    }
                    for (let i in n.data) {
                        let obj = {
                            value: i,
                            label: n.data[i]
                        };
                        this.searchForm.type_selected.option.push(obj);
                    }
                }
            },
            get_data_service_platform: {
                handler: function (n, o) {
                    if (n.code !== '0000') {
                        return false
                    }

                    for (let i in n.data) {
                        let obj = {
                            value: i,
                            label: n.data[i]
                        };
                        this.searchForm.service.option.push(obj);
                    }
                }
            },
            get_status_list: {
                handler: function (n, o) {
                    if (n.code !== '0000') {
                        return false
                    }

                    for (let i in n.data) {
                        let obj = {
                            value: i,
                            label: n.data[i]
                        };
                        this.searchForm.self_status.option.push(obj);
                    }
                }
            },
            get_bs_model_name: {
                handler: function (n, o) {
                    if (n.code !== '0000') {
                        return false
                    }
                    n.data.map(item => {
                        item.value = item.id;
                        item.label = item.model_name;
                        return item;
                    });

                    this.searchForm.bs_name.option = n.data;
                }
            },
            get_create_user: {
                handler: function (n, o) {
                    if (n.code !== '0000') {
                        return false
                    }
                    this.dialogFormVisible = false;
                    this.on_list();
                }
            }
        },
        created() {
        },
        mounted() {
            this.user_list({page: 1, page_size: 10});
            this.user_type({});
            this.data_service_platform({});
            this.status_list({});
            this.bs_model_name({});
        },
        beforeMount() {

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

    .panel {
        padding: 20px;
    }
</style>