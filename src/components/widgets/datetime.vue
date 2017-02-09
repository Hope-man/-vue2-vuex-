<template>
    <div>
        <!--<input size="16" type="text" value="2012-06-15 14:45" readonly class="form_datetime">-->
        <input type="text" class="form-control form_datetime" readonly>
    </div>
</template>

<script>
    import   'bootstrap-datetimepicker.js/js/bootstrap-datetimepicker.js';
    import   'bootstrap-datetimepicker.js/js/locales/bootstrap-datetimepicker.zh-CN.js';



    export  default{
        ready(){
            $('.form_datetime').datetimepicker({format: 'yyyy-mm-dd hh:ii',autoclose:true,language: 'zh-CN'});
        }
    }
</script>

<style>
	@import '../../../node_modules/bootstrap-datetimepicker.js/css/bootstrap-datetimepicker.min.css';

    /*.datetimepicker-days .day{
        padding:4px 5px !important;
    }
    .datetimepicker-hours .hour{
         padding:4px 5px !important;
    }
    .datetimepicker-minutes .minute{
        padding:4px 5px !important;
    }*/
</style>