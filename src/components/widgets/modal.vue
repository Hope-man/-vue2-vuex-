<template>
    <div class="modal fade" :id="id">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title">{{ title }}</h4>
                </div>
                <div class="modal-body">
                    <slot name="modal-body"></slot>
                </div>
                <div class="modal-footer">
                    <slot name="modal-button"></slot>
                    <button type="button" class="btn btn-default" data-dismiss="modal" @click="close()">关闭</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <!-- /.modal -->
</template>
<script>
    //import Vue from 'vue'
    import  {modal} from  'vue-strap'
//    import hash from 'hash-sum'

    export default {
        data() {
            return {
                title: ''
            }
        },
        components: {
            //modalView:this.d_view
        },
        props: {
            mtitle: String,
            view: Object
        },
        methods: {
            show () {
                $('#'+ this.id).modal('show');
            },
            hide () {
                $('#'+ this.id).modal('hide');
            }
        },
        computed: {
            id: {
                get() {
//                    return hash(this._uid);
                }
            }
        },
        ready() {
            this.$set('title', this.mtitle);
        },
        created() {
            //Vue.component('app-content', this.view)
        }

    }
</script>