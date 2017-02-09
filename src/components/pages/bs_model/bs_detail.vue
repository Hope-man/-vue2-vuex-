<template>
    <div class="base-detail">
        <h6 class="content-group text-semibold">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/model' }">业务模型</el-breadcrumb-item>
                <el-breadcrumb-item>编辑模型</el-breadcrumb-item>
                <!--<el-breadcrumb-item>活动列表</el-breadcrumb-item>-->
                <!--<el-breadcrumb-item>活动详情</el-breadcrumb-item>-->
            </el-breadcrumb>

        </h6>

        <div class="panel panel-body border-left-info">
            <button type="button" class="btn btn-info" @click="dialogFormVisible = true">选择数据</button>
        </div>

        <el-dialog title="选择数据" v-model="dialogFormVisible">

            <template>
                <transferFrame
                        :source="source"
                        :targetKeys="targetKeys"
                        :search="true"
                        searchPlaceholder="请输入搜索内容"
                        @change="change">
                    <div :style="{float: 'right', margin: '5px'}">
                    </div>
                </transferFrame>
            </template>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="sure_select()">确 定</el-button>
            </div>
        </el-dialog>

        <div class="transfer">
            <ul v-if="isEmpty">
                <li>暂无数据</li>
            </ul>
            <draggable :list="select_right" :options="{group:'people'}" @start="dragging=true" @end="dragging=false">
                <ul class="list-group" v-for="item in select_right">
                    <li >
                        <span>{{item.data_name}}</span> <a @click="detailUrl(item.detail_url)">查看详情</a>
                    </li>
                </ul>
            </draggable>
        </div>

        <div class="btn-sure">
            <button type="button" class="btn btn-info" @click="sureModel">保存</button>
        </div>

        <!-- dialog -->
        <template>
            <el-dialog title="图例" v-model="dialogImg">
                <div class="setImg">
                    <img :src="imgDetail"/>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogImg = false">取 消</el-button>
                    <el-button type="primary" @click="addModel()">确 定</el-button>
                </div>
            </el-dialog>
        </template>
    </div>
</template>
<script>


    import transferFrame from './../../widgets/transfer/transfer-frame'
    import draggable from 'vuedraggable'

    import {mapState, mapActions} from 'vuex'

    export default {
        data () {
            return {
                isEmpty: true,
                id: '',
                dialogFormVisible: false,
                dialogImg: false,
                source: '',
                targetKeys: [],
                not_left_val: [],
                select_right: [],
                sure_arr: [],
                imgDetail: null,
            }
        },

        components: {
            transferFrame,
            draggable
        },
        watch: {
            get_model_center_list: {
                handler: function (n, o) {
                    if (n.code !== '0000') {
                        return false
                    }


                    this.select_right = n.data;

                    if (this.select_right.length > 0) {
                        this.isEmpty = false
                    }
                }
            },
            get_model_select_list: {
                handler: function (n, o) {
                    if (n.code !== '0000') {
                        return false
                    }
                    this.not_left_val = n.data;
                    this.source = this.getMockData()


                }
            },
            get_model_update: {
                handler: function (n, o) {
                    if (n.code !== '0000') {
                        return false
                    }
                    this.model_center_list({model_id: this.id});

                    this.$router.push({path: '/model'})


                }
            }
        },
        methods: {
            getMockData() {
                let mockData = [];

                for (let i = 0; i < this.not_left_val.length; i++) {

                    mockData.push({
                        key: this.not_left_val[i],
                        label: this.not_left_val[i].data_name,
                        title: this.not_left_val[i].data_name + "(" + this.not_left_val[i].abbreviation_name + ")",
//                        disabled: Math.random() * 3 < 1
                    });
                }

                return mockData;

            },
            detailUrl(img) {
                this.dialogImg = true;
                this.imgDetail = img
            },
            getTargetKeys() {
                return this.getMockData()
                    .filter(() => Math.random() * 2 > 1)
                    .map(item => item.key);
            },
            change (newTargetKeys, direction, moveDataKeys) {
                this.targetKeys = newTargetKeys
            },
            sure_select() {

                if (this.targetKeys.length > 0) {
                    this.isEmpty = false
                }

                this.select_right = this.targetKeys;

                this.dialogFormVisible = false;

            },
            sureModel() {
                let arrID = [];
                this.select_right.map(item => {
                    arrID.push(item.center_id || item.id);
                });

                let data = {
                    center_ids: arrID.join(','),
                    id: this.id,
                };

                this.model_update(data);
            },
            ...mapActions([
                'model_center_list',
                'model_select_list',
                'model_update'
            ])
        },
        computed: {
            ...mapState({
                get_model_center_list: state => state.get_model_center_list,
                get_model_select_list: state => state.get_model_select_list,
                get_model_update: state => state.get_model_update,
            })
        },
        created() {
            this.id = this.$route.query.id;
            this.model_select_list({status: 0});
            this.model_center_list({model_id: this.id});
        },

    }
</script>
<style>

    .base-detail-css .form-control {
        -webkit-border-radius: 3px !important;
        -moz-border-radius: 3px !important;
        border-radius: 3px !important;
    }

    .mar-bott {
        margin-bottom: 50px;
    }

    .transfer ul {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    .transfer li {
        border: 1px #ddd solid;
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 3px;
        padding: 12px 15px;
        background: #fff;
        margin-top: 10px;
        text-align: center;
        overflow: hidden;
    }
    .transfer .list-group {
        border: 0;
    }

    .transfer li a {
        float: right;
    }

    .base-detail .panel-body {
    }

    .btn-sure {
        text-align: right;
        margin-top: 20px;
    }

    .btn-sure .btn {
        margin-right: 40px;
        padding: 8px 30px;
    }

    .setImg {
        text-align: center;
    }

    .setImg img {
        max-width: 600px;
        max-height: 400px;
    }

</style>