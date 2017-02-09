<template>
    <div>
        <select class="select2-container" v-my-select="selected">
            <option value="0">请选择</option>
            <option v-for="item in options" :value="item.id">{{item.text}}</option>
        </select>
        <!--{{selected}}-->
    </div>
</template>

<script>
    import select2 from 'select2'

    export default  {
        props: {
            options: [],
            selected: '',
        },
        data() {
            return {
            }
        },
        directives: {
            mySelect: {
                twoWay: true,
                priority: 1000,
                params: ['options'],
                bind () {
                    let self = this;
                    $(this.el)
                        .select2()
                        .on('change', function () {
                            self.set(this.value);
                        });
                },
                update (value) {
                    $(this.el).val(value).trigger('change')
                },
                unbind () {
                    $(this.el).off().select2('destroy');
                }
            }
        },
        methods: {},
        ready() {

        }
    }

</script>
<style>
    @import '../../../node_modules/select2/dist/css/select2.css';

    /*.select2-heig {*/
        /*height: 30px;*/
    /*}*/

    /*.select2 {*/
        /*width: 100% !important;*/
    /*}*/
</style>