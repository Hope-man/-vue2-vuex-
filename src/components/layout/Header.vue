<template>

	<div>
		<!-- Main navbar -->
		<div class="navbar navbar-inverse">
			<div class="navbar-header">
				<a class="navbar-brand" href="/"><img src="/static/images/logo.png" alt=""></a>

				<ul class="nav navbar-nav visible-xs-block">
					<li><a data-toggle="collapse" data-target="#navbar-mobile"><i class="icon-tree5"></i></a></li>
					<li><a class="sidebar-mobile-main-toggle"><i class="icon-paragraph-justify3"></i></a></li>
				</ul>
			</div>

			<div class="navbar-collapse collapse" id="navbar-mobile">
				<ul class="nav navbar-nav">
					<li><a class="sidebar-control sidebar-main-toggle hidden-xs"><i class="icon-paragraph-justify3"></i></a></li>
				</ul>

				<ul class="nav navbar-nav navbar-right">



					<li class="dropdown dropdown-user">
						<a class="dropdown-toggle" data-toggle="dropdown">
							<img src="/static/images/placeholder.jpg" alt="">
							<span>{{name}}</span>
							<i class="caret"></i>
						</a>

						<ul class="dropdown-menu dropdown-menu-right">
							<li><a @click="on_logout();"><i class="icon-switch2"></i> 退出</a></li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
		<!-- /main navbar -->

		<!-- Page header -->
		<div class="page-header">
			<div class="breadcrumb-line breadcrumb-line-wide">
				<ul class="breadcrumb">
					<li><a href="/"><i class="icon-home2 position-left"></i> 征信系统</a></li>
					<!--<li class="active">list</li>-->
				</ul>

				<!--<ul class="breadcrumb-elements">
                    <li><a href="#"><i class="icon-comment-discussion position-left"></i> Support</a></li>
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                            <i class="icon-gear position-left"></i> Settings
                            <span class="caret"></span>
                        </a>

                        <ul class="dropdown-menu dropdown-menu-right">
                            <li><a href="#"><i class="icon-user-lock"></i> Account security</a></li>
                            <li><a href="#"><i class="icon-statistics"></i> Analytics</a></li>
                            <li><a href="#"><i class="icon-accessibility"></i> Accessibility</a></li>
                            <li class="divider"></li>
                            <li><a href="#"><i class="icon-gear"></i> All settings</a></li>
                        </ul>
                    </li>
                </ul>-->
			</div>

			<!--<div class="page-header-content">
                <div class="page-title">
                    <h4><i class="icon-arrow-left52 position-left"></i> <span class="text-semibold">Home</span> - Dashboard <small>Hello, Victoria!</small></h4>
                </div>

                <div class="heading-elements">
                    <div class="heading-btn-group">
                        <a href="#" class="btn btn-link btn-float has-text"><i class="icon-bars-alt text-primary"></i><span>Statistics</span></a>
                        <a href="#" class="btn btn-link btn-float has-text"><i class="icon-calculator text-primary"></i> <span>Invoices</span></a>
                        <a href="#" class="btn btn-link btn-float has-text"><i class="icon-calendar5 text-primary"></i> <span>Schedule</span></a>
                    </div>
                </div>
            </div>-->
		</div>
		<!-- /page header -->
	</div>

</template>
<script>
	import  {AuthMgr} from  '../../api/apis';
    export  default {
		data(){
            return {
                name: '',
                
            }
        },
        methods: {
            on_logout() {
				sessionStorage.removeItem('token'),
				sessionStorage.removeItem('username');
				window.location.href = AuthMgr;
				return;
			}
        },
		created() {
			let _this =this;
			let timer = setInterval(function(){
				_this.name = sessionStorage.getItem('username');
				if(_this.name!==null){
					clearInterval(timer);
				}
			},100);
		}
    }
</script>
<style>
	.navbar-brand {
		padding: 8px 20px 0;
	}
	.navbar-brand img{
		height: 26px;
	}
	.form-horizontal .control-label:not(.text-right){
        text-align:right;
    }
</style>