<template>
    <div class="base-detail">
        <h6 class="content-group text-semibold">
            <a @click="backSkip()">基础信息</a>

        </h6>
        <div class="panel panel-white border-left-lg border-left-info mar-bott">
            <div class="panel-heading">
                <h6 class="panel-title" v-if="isButton">供应商详情</h6>
                <template v-else>
                    <h6 class="panel-title" v-if="isEdit">编辑供应商</h6>
                    <h6 class="panel-title" v-else>添加供应商</h6>
                </template>
            </div>
            <div class="panel-body">
                <div class="row base-detail-css" v-if="id">
                    <validator name="base_add">
                        <form class="form-horizontal">
                            <fieldset class="content-group">
                                <div class="form-group">
                                    <label class="control-label col-lg-2">供应商名称:</label>
                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" :readonly="isButton" initial="off"
                                               v-model="formData.brand_name"
                                               v-validate:supplier="['required']" maxlength="10"/>
                                        <label class="validation-error-label" v-if="$base_add.supplier.required">请输入供应商名称</label>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-lg-2">联系人:</label>
                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" :readonly="isButton" initial="off"
                                               v-model="formData.contact_name"
                                               v-validate:name="['required']" maxlength="10"/>
                                        <label class="validation-error-label"
                                               v-if="$base_add.name.required">请输入联系人</label>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-lg-2">联系电话:</label>
                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" :readonly="isButton" initial="off"
                                               v-model="formData.contact_phone"
                                               v-validate:phone="['required']" maxlength="11"/>
                                        <label class="validation-error-label"
                                               v-if="$base_add.phone.required">请输入联系电话</label>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-lg-2">邮箱:</label>
                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" :readonly="isButton" initial="off"
                                               v-model="formData.contact_email"
                                               v-validate:email="['required']" maxlength="30"/>
                                        <label class="validation-error-label"
                                               v-if="$base_add.email.required">请输入邮箱</label>
                                    </div>
                                </div>
                                <div class="text-right">
                                    <button type="button" class="btn btn-primary" :disabled="!$base_add.valid"
                                            v-on:click="supplierAdd()" v-if="!isButton"><i
                                            class="icon-arrow-right14 position-left"></i> 确定
                                    </button>
                                    <button type="button" class="btn btn-primary" v-on:click="back()">返回 <i
                                            class="icon-arrow-right14 position-right"></i>
                                    </button>
                                </div>
                            </fieldset>
                        </form>
                    </validator>
                </div>
                <div class="row base-detail-css" v-else>
                    <validator name="base_add">
                        <form class="form-horizontal" novalidate>
                            <fieldset class="content-group">
                                <div class="form-group">
                                    <label class="control-label col-lg-2">供应商名称:</label>
                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" v-model="formData.brand_name"
                                               v-validate:supplier="['required']" maxlength="10"/>
                                        <label v-if="$base_add.supplier.required" class="validation-error-label">请输入供应商名称</label>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-lg-2">联系人:</label>
                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" v-model="formData.contact_name"
                                               v-validate:name="['required']" maxlength="10"/>
                                        <label v-if="$base_add.name.required"
                                               class="validation-error-label">请输入联系人</label>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-lg-2">联系电话:</label>
                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" v-model="formData.contact_phone"
                                               v-validate:phone="['required']" maxlength="11"/>
                                        <label v-if="$base_add.phone.required"
                                               class="validation-error-label">请输入联系电话</label>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-lg-2">邮箱:</label>
                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" v-model="formData.contact_email"
                                               v-validate:email="['required']" maxlength="30"/>
                                        <label v-if="$base_add.email.required"
                                               class="validation-error-label">请输入邮箱</label>
                                    </div>
                                </div>
                                <div class="text-right">
                                    <button type="button" class="btn btn-primary" :disabled="!$base_add.valid"
                                            v-on:click="supplierAdd()"><i
                                            class="icon-arrow-right14 position-left"></i> 确定
                                    </button>
                                    <button type="button" class="btn btn-default btn-ladda btn-ladda-spinner"
                                            v-on:click="back()">返回 <i
                                            class="icon-arrow-right14 position-right"></i></button>
                                </div>
                            </fieldset>
                        </form>
                    </validator>
                </div>
            </div>
        </div>

        <app-modal v-ref:modalskip mtitle="">
            <div slot="modal-body" class="form-horizontal">
                <div class="alert alert-danger no-border" style="margin-bottom: 0">
                    确定取消?
                </div>
            </div>
            <button slot="modal-button" type="button" class="btn btn-primary" @click="backs()">确定</button>
        </app-modal>
    </div>
</template>
<script>


    import appTable from './../widgets/table'
    import {base_supplier_add, base_supplier_detail, base_supplier_update} from '../../vuex/actions'
    import {supplier_add, supplier_detail, supplier_update} from '../../vuex/getters'
    import Modal from '../widgets/modal'

    //    import validator  from 'vue-validator'

    export default {
        data () {
            return {
                formData: {},
                id: '',
                isButton: '', //表示详情页
                isEdit: '', //表示编辑
            }
        },

        components: {
//            validator
            'app-modal': Modal,
        },
        vuex: {
            actions: {
                base_supplier_add,
                base_supplier_detail,
                base_supplier_update
            },
            getters: {
                supplier_add,
                supplier_detail,
                supplier_update
            }
        },
        watch: {
            supplier_add: {
                handler: (n, o) => {
                    if (n.code !== '0000') {
                        return false
                    }
                    window.history.back();
                }
            },
            supplier_detail: {
                handler: function (n, o) {
                    if (n.code !== '0000') {
                        return false
                    }
                    this.formData = n.data;
                }
            },
            supplier_update: {
                handler: function (n, o) {
                    if (n.code !== '0000') {
                        return false
                    }
                    window.history.back();
                }
            }

        },
        methods: {
            back() {
                if (this.id) {
                    let path = location.pathname.substr(-2, 1);
                    this.$router.go(`/base/page/${path}/`);
                } else {
                    window.history.back();
                }
            },
            backs() {
                this.$refs.modalskip.hide();
                window.history.back();
            },
            backSkip() {
                if (this.formData.brand_name || this.formData.contact_phone || this.formData.contact_name || this.formData.contact_email) {
                    this.$refs.modalskip.show();
                } else {
                    this.$router.go(`/base`);
                }

            },
            supplierAdd() {
                if (!this.$base_add.valid) {
                    this.$refs.modalskip.show();
                    this.$resetValidation();
                } else {
                    let data = {
                        brand_name: this.formData.brand_name,
                        contact_email: this.formData.contact_email,
                        contact_name: this.formData.contact_name,
                        contact_phone: this.formData.contact_phone
                    };
                    if (this.id) {
                        data.id = this.id;
                        this.base_supplier_update(data);
                    } else {
                        this.base_supplier_add(data);
                    }
                }
            }
        },
        created() {
            let isShow = location.hash;
            if (isShow.match('detail') || isShow.match('edit')) {
                this.id = location.hash.split("#")[1].replace('id=', '');
                this.base_supplier_detail({id: this.id});
                this.isButton = location.hash.match('detail');
                this.isEdit = location.hash.match('edit');
            }

        },
        ready () {

        }
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

    .base-detail .panel-body {
        padding: 20px 20px 0 20px;
    }
</style>