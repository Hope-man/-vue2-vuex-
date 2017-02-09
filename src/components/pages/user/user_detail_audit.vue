<template>
    <div>
        <el-table
                :data="tableData"
                border
                style="width: 100%"
        >
            <el-table-column
                    prop="create_time"
                    label="申请时间"
                    width="100">
            </el-table-column>
            <el-table-column
                    inline-template
                    label="申请平台"
                    width="105">
                        <span class="time-block">
                            <span>{{row.Service_platform_display || '-'}}</span>
                        </span>
            </el-table-column>
            <el-table-column
                    inline-template
                    label="业务类型"
                    width="100">
                            <span class="time-block">
                            <span>{{row.model_name || '-'}}</span>
                            </span>
            </el-table-column>
            <el-table-column
                    prop="audit_type_display"
                    label="审核结果"
                    width="100">
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
                    :context="_self"
                    label="操作"
                    width="120">
                        <span>
                            <el-button
                                    @click.native.prevent="lookRow($index, tableData)"
                                    type="text"
                                    size="small">查看详情
                            </el-button>
                        </span>
            </el-table-column>
        </el-table>
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
                index: '',
                page: {
                    total: 1,
                    page_size: 10,
                    page: 1
                },
                tableData: [],

            }
        },
        component: {
            Pagination,
            Table
        },

        methods: {
            lookRow(index, rows) {
                this.$router.push({path: '/user/request', query: {id: rows[index].id,userId:rows[index].user_id,auditStatus:rows[index].audit_status}})
            },

            handleCurrentChange(val) {
                this.page.page = val;
                this.on_list();
                console.log(`当前页: ${val}`);
            },
            addSupply() {

            },
            on_list () {
                this.user_list({
                    page: this.page.page,
                    page_size: this.page.page_size,
                    user_name: this.user_name,
                    idcard: this.idcard,
                    user_type: this.user_type,
                    service_platform: this.service_platform,
                    model_name: this.model_name,
                    audit_status: this.audit_status


                })

            },
            searchList() {

            },

            ...mapActions(['audit_list'])
        },
        computed: {
            ...mapState({
                get_audit_list: state => state.get_audit_list,
                get_bs_model_name: state => state.get_bs_model_name
            })

        },
        watch: {
            'get_audit_list': {
                handler: function (n, o) {
                    if (n.code !== '0000') {
                        return false
                    }

                    this.tableData = n.data.items.map(item => {
                        item.create_time = item.create_time ? moment(item.create_time).format('YYYY-MM-DD HH:mm:ss') : '-';
                        item.modifier_time = item.modifier_time ? moment(item.modifier_time).format('YYYY-MM-DD HH:mm:ss') : '-';

                        return item;
                    });

                    this.tableData = n.data.items;

                    this.page.total = n.data.total_page;
                    this.page.page_size = n.data.page_size;
                }
            },
            'get_bs_model_name': {
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
            }
        },
        created() {
            this.index = this.$route.query.userId;
        },
        mounted() {
//            this.audit_list({page: 1, page_size: 10});
            this.audit_list({user_id: this.index});

        },
        beforeMount() {

        },

        events: {
            refresh: function (e) {
                this.pageCfg.cur = e;

                this.on_list();
            }
        },
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

    .first {
        margin-bottom: 10px;
    }
</style>
