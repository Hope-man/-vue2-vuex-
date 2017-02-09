<template>
    <div class="base">
        <div class="page-header page-header-lg panel border-top-info" style="padding-bottom: 0;">
            <div class="page-header-content">
                <div class="page-title" style="padding: 17px 0;">
                    <!--<h4><i class="icon-arrow-left52 position-left"></i> <span class="text-semibold">业务模型</span></h4>-->
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/model' }">业务模型</el-breadcrumb-item>
                        <el-breadcrumb-item>极车公社-入会申请</el-breadcrumb-item>
                        <!--<el-breadcrumb-item>活动列表</el-breadcrumb-item>-->
                        <!--<el-breadcrumb-item>活动详情</el-breadcrumb-item>-->
                    </el-breadcrumb>
                </div>
            </div>
        </div>
        <div class="panel panel-flat border-left-info">
            <div class="panel-body">
                <div action="#" class="form-horizontal">
                    <div class="form-group form-group-xs form-no-bottom">
                        <label class="col-lg-2 control-label">用户姓名:</label>
                        <div class="col-lg-2">
                            <input type="text" class="form-control el-input__inner" v-model="form.name"
                                   placeholder="用户姓名" maxlength="10" v-on:keyup.enter="on_list()">

                        </div>
                        <label class="col-lg-2 control-label">身份证/组织机构代码:</label>
                        <div class="col-lg-2">
                            <input type="text" class="form-control el-input__inner" v-model="form.num"
                                   placeholder="身份证/组织机构代码" maxlength="10" v-on:keyup.enter="on_list()">

                        </div>
                    </div>
                    <div class="form-group form-group-xs form-no-bottom" style="margin-top: 20px">
                        <label class="col-lg-2 control-label">当前状态:</label>
                        <div class="col-lg-2">
                            <el-select v-model="selected.value" placeholder="请选择">
                                <el-option
                                        v-for="item in selected.option"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <label class="col-lg-2 control-label">用户类型:</label>
                        <div class="col-lg-2">
                            <el-select v-model="selected1.value" placeholder="请选择">
                                <el-option
                                        v-for="item in selected1.option"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="col-lg-2">
                            <label class="col-lg-5"></label>
                            <button type="submit" class=" btn btn-info" @click="on_list()">搜索</button>
                        </div>
                    </div>
                </div>
            </div>
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
                            prop="user_name"
                            label="业务名称"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="idcard"
                            label="身份证/组织机构代码"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="user_type_display"
                            label="用户类型"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="audit_count"
                            label="审核次数"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="audit_type_display"
                            label="当前状态"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="modifier"
                            label="审核人"
                            width="110">
                    </el-table-column>
                    <el-table-column
                            prop="create_time"
                            label="最后申请时间"
                            width="110">
                    </el-table-column>
                    <el-table-column
                            prop="modifier_time"
                            label="最后操作时间"
                            width="110">
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
                                        size="small">查看详情
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


    </div>
</template>
<script>


    import moment from 'moment'
    import {Select, Input, Dialog} from 'element-ui'
    import {mapState, mapActions} from 'vuex'


    export default {
        data () {
            return {
                selected: {
                    option: [],
                    value: '',
                },
                selected1: {
                    option: [],
                    value: '',
                },
                input: '',
                page: {
                    total: 1,
                    page_size: 10,
                    page: 1
                },
                tableData: [],

                form: {
                    name: '',
                    num: '',
                },
                formLabelWidth: '120px',
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
            addModel() {
                this.add_model({
                    model_name: this.form.name,
                    service_platform: this.selected.selected3
                })
            },
            detailNumber() {

            },
            on_list () {
                this.model_page({
                    page: this.page.page,
                    page_size: this.page.page_size,
                    model_id: this.id,
                    user_name: this.form.name,
                    user_type: this.selected1.value,
                    audit_status: this.selected.value,
                    idcard: this.form.num
                })
            },

            ...mapActions([
                'status_list',
                'user_type',
                'model_page'
            ])


        },
        computed: {
            ...mapState({
                get_status_list: state => state.get_status_list,
                get_user_type: state => state.get_user_type,
                get_model_page: state => state.get_model_page,
            })
        },
        watch: {
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
                        this.selected.option.push(obj);
                    }

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
                        this.selected1.option.push(obj);
                    }
                }
            },
            get_model_page: {
                handler: function (n, o) {
                    if (n.code !== '0000') {
                        return false
                    }
                    this.tableData = n.data.items.map(item => {
                        item.create_time = moment(item.create_time).format('YYYY-MM-DD HH:mm:ss');
                        item.modifier_time = moment(item.modifier_time).format('YYYY-MM-DD HH:mm:ss');
                        return item
                    })

                }
            }

        },
        created() {
            this.id = this.$route.query.id;

            this.status_list({});
            this.user_type({});
            this.model_page({
                model_id: this.id,
                page: this.page.page,
                page_size: this.page.page_size
            })


        },
    }
</script>
<style>
    .form-no-bottom {
        margin-bottom: 0;
    }
</style>