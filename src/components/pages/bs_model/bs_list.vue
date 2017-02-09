<template>
    <div class="base">
        <div class="page-header page-header-lg panel border-top-info">
            <div class="page-header-content">
                <div class="">
                    <!--<h4><i class="icon-arrow-left52 position-left"></i> <span class="text-semibold">业务模型</span></h4>-->
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/model' }">业务模型</el-breadcrumb-item>
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
                    <div class="form-group form-no-bottom">
                        <label class="col-lg-1 control-label">业务名称:</label>
                        <div class="col-lg-2">
                            <input type="text" class="form-control el-input__inner" v-model="ruleForm.search_name"
                                   placeholder="业务名称" maxlength="10" v-on:keyup.enter="on_list()"/>

                        <input type="number">
                        </div>
                        <label class="col-lg-1 control-label">服务平台:</label>
                        <div class="col-lg-2">
                            <el-select v-model="selected.selected1" placeholder="请选择">
                                <el-option
                                        v-for="item in options"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <label class="col-lg-1 control-label">已选数据:</label>
                        <div class="col-lg-2">
                            <el-select v-model="selected.selected2" placeholder="请选择">
                                <el-option
                                        v-for="item in options2"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
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
            <button type="button" class="btn btn-info" @click="add">新建模型</button>
        </div>

        <div class="">
            <!--table-->
            <template>
                <el-table
                        :data="tableData"
                        border
                        style="width: 100%"
                >
                    <el-table-column
                            prop="model_name"
                            label="业务名称"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="Service_platform_display"
                            label="服务平台"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            inline-template
                            label="审核申请"
                            width="120">
                              <span>
                                <el-button
                                        @click.native.prevent="detailNumber($index, tableData)"
                                        type="text"
                                        size="small">{{row.apply_count}} 件
                                </el-button>
                              </span>
                    </el-table-column>
                    <el-table-column
                            inline-template
                            label="已选数据"
                            width="100">
                        <span>
                            {{row.center_name || '-'}}
                        </span>
                    </el-table-column>
                    <el-table-column
                            inline-template
                            label="创建时间"
                            width="110">
                        <span  class="time-block">
                            <span> {{ row.time }}</span>
                            <span>{{ row.modifier_time }}</span>
                        </span>
                    </el-table-column>

                    <el-table-column
                            inline-template
                            :context="_self"
                            label="操作"
                            width="120">
                              <span>
                                <el-button
                                        @click.native.prevent="details($index, tableData)"
                                        type="text"
                                        size="small">编辑模型
                                </el-button>
                              </span>
                    </el-table-column>
                </el-table>
            </template>

            <!--page-->
            <div class="block" style="text-align: center;margin-top: 30px">
                <el-pagination
                        @current-change="handleCurrentChange"
                        :current-page="page.page"
                        :page-size="page.page_size"
                        layout="prev, pager, next, jumper"
                        :total="page.total">
                </el-pagination>
            </div>
        </div>

        <!--model-->
        <template>
            <el-dialog title="新建业务模块" v-model="dialogFormVisible">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="服务平台" :label-width="formLabelWidth" prop="selected3">
                        <el-select v-model="ruleForm.selected3" placeholder="请选择">
                            <el-option
                                    v-for="item in options"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="模型名称" :label-width="formLabelWidth" prop="name">
                        <input type="text" class="el-input__inner " v-model="ruleForm.name" maxlength="20"
                               auto-complete="off"/>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addModel()">确 定</el-button>
                </div>
            </el-dialog>
        </template>
    </div>
</template>
<script>

    import moment from 'moment'
    import {Select, Input, Dialog} from 'element-ui'
    import {mapState, mapActions} from 'vuex'
    
    export default {
        data () {
            return {
                name: '',
                options: [],
                options2: [],
                selected: {
                    selected1: '',
                    selected2: '',
                    selected3: '',

                },
                input: '',
                page: {
                    total: 1,
                    page_size: 10,
                    page: 1
                },
                tableData: [],

                dialogFormVisible: false,
                ruleForm: {
                    name: '',
                    search_name: '',
                    selected3: ''

                },
                formLabelWidth: '120px',
                rules: {
                    name: [
                        {required: true, message: '请输入模型名称', trigger: 'blur'},
                    ],
                    selected3: [
                        {required: true, message: '请选择服务平台', trigger: 'change'}
                    ],
                }
            }
        },

        component: {
            Select,
            Input,
            Dialog
        },
        methods: {
            details(index, rows) {
                console.log(rows[index]);

                this.$router.push({path: '/model/detail', query: {id: rows[index].id}})

            },
            handleCurrentChange(val) {
                this.page.page = val;
                this.on_list();
                console.log(`当前页: ${val}`);
            },
            addModel(ev) {
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        this.add_model({
                            model_name: this.ruleForm.name,
                            service_platform: this.selected.selected3
                        })
                    } else {
                        return false
                    }
                })


            },
            add() {
                this.dialogFormVisible = true;
                if (this.$refs.ruleForm) {
                    this.$refs.ruleForm.resetFields();
                }
            },
            detailNumber(index, rows) {
                this.$router.push({path: '/model/some', query: {id: rows[index].id}})
            },
            on_list () {
                this.model_list({
                    page: this.page.page,
                    page_size: this.page.page_size,
                    model_name: this.form.search_name,
                    center_id: this.selected.selected2,
                    service_platform: this.selected.selected1
                })
            },

            ...mapActions([
                'model_list',
                'model_select_list',
                'data_service_platform',
                'add_model'
            ])


        },
        computed: {
            ...mapState({
                get_model_list: state => state.get_model_list,
                get_model_select_list: state => state.get_model_select_list,
                get_data_service_platform: state => state.get_data_service_platform,
                get_add_model: state => state.get_add_model,
            })
        },
        watch: {
            'get_model_list': {
                handler: function (n, o) {
                    if (n.code !== '0000') {
                        return false
                    }

                    this.tableData = n.data.items.map(item => {
                        item.center_model = [];
                        item.time = moment(item.create_time).format('YYYY-MM-DD HH:mm:ss');
                        item.modifier_time = moment(item.modifier_time).format('YYYY-MM-DD HH:mm:ss');
                        if (item.center_models) {
                            item.center_models.map(i => {
                                item.center_model.push(i.abbreviation_name)
                            })
                        }
                        item.center_name = item.center_model.join(',');
                        return item
                    });

                    this.page.total = n.data.total_page;
                    this.page.page_size = n.data.page_size;

//                    this.options = n.data
                }
            },
            'get_model_select_list': {
                handler: function (n, o) {
                    if (n.code !== '0000') {
                        return false
                    }
                    this.options2 = n.data.map(item => {
                        item.value = item.id,
                            item.label = item.data_name
                        return item
                    });
                }
            },
            'get_data_service_platform': {
                handler: function (n, o) {
                    if (n.code !== '0000') {
                        return false
                    }

                    for (let i in n.data) {
                        let obj = {
                            value: i,
                            label: n.data[i]
                        };
                        this.options.push(obj);
                    }
                }
            },
            'get_add_model': {
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
            this.model_list({});
            this.data_service_platform({});
            this.model_select_list({status: 0})


        },
    }
</script>
<style>
    .form-no-bottom {
        margin-bottom: 0;
    }
    .time-block {
        display: block;
        padding: 4px 0;
    }
    .time-block span {
        display: block;
    }
</style>