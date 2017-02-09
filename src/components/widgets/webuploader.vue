<template>
    <div>
        <div id="uploader">
            <!--用来存放item-->
            <div :class="id">选择图片</div>
            <div :id= id class="uploader-list"></div>
        </div>
        <!--<span v-my-select="selected" class=""></span>-->
        <!--<span class="container uploader">上传</span>-->
        <!--<div id="uploader" class="hidden" >-->
            <!--<div id="thelist" class="uploader-list"></div>-->
            <!--<div class="btns">-->
                <!--<div id="picker">选择文件</div>-->
                <!--<button id="ctlBtn" class="btn btn-default">开始上传</button>-->
            <!--</div>-->
        <!--</div>-->
    </div>
</template>

<script>
    import WebUploader from 'webuploader'
    import bootbox  from 'bootbox'
//    import hash from 'hash-sum'


    /*svg 图片 */
    let bigIcon = '<svg width="20" height="20" viewBox="0 0 200 200" version="1.1">' +
        '<defs><style type="text/css"><![CDATA[@font-face { font-family: ifont; src: url("//at.alicdn.com/t/font_1442373896_4754455.eot?#iefix") format("embedded-opentype"), url("//at.alicdn.com/t/font_1442373896_4754455.woff") format("woff"), url("//at.alicdn.com/t/font_1442373896_4754455.ttf") format("truetype"), url("//at.alicdn.com/t/font_1442373896_4754455.svg#ifont") format("svg"); }]]></style></defs><g class="transform-group"><g transform="scale(0.1953125, 0.1953125)"><path d="M682.56256 393.03168l-131.42016 0L551.1424 263.3728c0 0-7.35744-35.22048-41.69728-35.22048-39.3472 0-45.91616 35.22048-45.91616 35.22048l0 129.65888L332.1088 393.03168c0 0-33.55648 5.84192-33.55648 42.71104 0 36.29056 33.55648 43.70944 33.55648 43.70944l131.42016 0 0 129.664c0 0 9.96352 35.84 45.91616 35.84 36.10624 0 41.69728-35.84 41.69728-35.84L551.1424 479.45216l131.42016 0c0 0 35.84-10.55744 35.84-43.50464C718.40256 397.99296 682.56256 393.03168 682.56256 393.03168zM745.0624 695.03488c71.54176-63.58016 116.52608-155.6736 116.52608-258.1248 0-191.8208-157.62944-347.31008-352.06144-347.3152-194.44736 0-352.0768 155.48928-352.0768 347.31008 0 191.80032 157.62944 347.33056 352.0768 347.33056 37.94432 0 74.48064-5.94432 108.7232-16.90624l76.02176 122.3424c0 0 35.60448 42.59328 96.03584 11.74016 0 0 63.3856-41.93792 26.69568-101.58592L745.0624 695.03488zM510.46912 736.99328c-168.33024 0-304.78336-134.58944-304.78336-300.69248 0-166.07232 136.45312-300.68736 304.78336-300.68736 168.33536 0 304.7936 134.61504 304.7936 300.68736C815.26272 602.40384 678.80448 736.99328 510.46912 736.99328z" fill="#ffffff"/></g></g></svg>';


    let iconDel = '<svg width="20" height="20" viewBox="0 0 200 200" version="1.1"><defs><style type="text/css"><![CDATA[@font-face { font-family: ifont; src: url("//at.alicdn.com/t/font_1442373896_4754455.eot?#iefix") format("embedded-opentype"), url("//at.alicdn.com/t/font_1442373896_4754455.woff") format("woff"), url("//at.alicdn.com/t/font_1442373896_4754455.ttf") format("truetype"), url("//at.alicdn.com/t/font_1442373896_4754455.svg#ifont") format("svg"); }]]></style></defs><g class="transform-group"><g transform="scale(0.1953125, 0.1953125)"><path d="M557.312 525.248l265.28-263.904c12.544-12.48 12.608-32.704 0.128-45.248-12.512-12.576-32.704-12.608-45.248-0.128l-265.344 263.936-263.04-263.84c-12.448-12.48-32.704-12.544-45.248-0.064-12.512 12.48-12.544 32.736-0.064 45.28l262.976 263.776-265.152 263.744c-12.544 12.48-12.608 32.704-0.128 45.248 6.24 6.272 14.464 9.44 22.688 9.44 8.16 0 16.32-3.104 22.56-9.312l265.216-263.808 265.44 266.24c6.24 6.272 14.432 9.408 22.656 9.408 8.192 0 16.352-3.136 22.592-9.344 12.512-12.48 12.544-32.704 0.064-45.248l-265.376-266.176z" fill="#ffffff"/></g></g></svg>';


    export default  {
        props: {
            auto: '',
            url: '',
        },
        data() {
            return {
                uploader:'',
                img_url:'',
                on_upload_success:''
            }
        },
        directives: {
        },
        created() {

        },
        methods: {
            _makeThumb(file) {
                let $container = $('.'+ this.id).parent('#uploader').find('.uploader-list');
                console.log($container)
                let $li = $(
                        '<div id="' + file.id + '" class="file-item">' +
                        '<img>' +
                        '<div class="o-btn">' +
                            '<a class="btn-phone css-icon">'+ bigIcon +'</a>' +
                            '<a class="pic_del css-icon " data-dismiss="alert">'+ iconDel +'</a>' +
                        '</div>' +
                        '</div>'
                    ),
                    $img = $li.find('img');
                $container.append($li);


                this.uploader.makeThumb(file, (error, src) => {
                    if(error) {
                        $img.replaceWith('<span>不能预览</span>');

                        return
                    }
                    $img.attr('src',src);
                    $img.attr('data-url',src);
                });

                $container.find('.file-item').hover(
                    function () {
                        $(this).find('.o-btn').show();
                    },
                    function () {
                        $(this).find('.o-btn').hide();
                    }
                );

                //  点击查看预览图
                $container.find('.file-item').on('click', '.btn-phone', function (e) {
                    e.stopPropagation()
                    let img = $(this).parents('.file-item').find('img').attr('data-url');
                    $('body').append("<div class='popup-phone'><img src=" + img + " class='preview' /></div>");
                });
                // 删除预览图
                $('body').on('click', '.popup-phone', function () {
                    $(this).remove();
                });
                
                // 上传删除图片

                $container.find('.file-item').on('click','.pic_del', function (e) {
                    bootbox.confirm({
                        message: "确定要删除么？",
                        buttons: {
                            cancel: {
                                label: '<i class="fa fa-times"></i> 取消'
                            },
                            confirm: {
                                label: '<i class="fa fa-check"></i> 确定'
                            },
                        },
                        callback: function (result) {
                            if (!result) return;
                            // this.options.uploader = null;
//                            _this.options.uploader = null;
//                            del && del.call(_this, e);
                        }
                    });
                    return false;
                })

                
                
                
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
            let self = this;
            this._notify = null;
            this.uploader = new WebUploader.Uploader({
                server: this.url,
                auto: this.auto,
                swf: '../../../node_modules/webuploader/dist/Uploader.swf',
                accept: {
                    extensions: 'gif,jpg,jpeg,png',
                    mimeTypes: 'image/jpg,image/jpeg,image/png',
                },
                pick: {
                    id:$("." + this.id),
                    multiple: false
                },
                fileSingleSizeLimit: 5 * 1024 * 1024,
                duplicate: true
            });


            // 加入队列之前
            this.uploader.on('beforeFileQueued', file => {
                if (file.statusText == 'exceed_size') {
                    $.notify(
                        //options
                        {
                            title: '<strong>错误信息</strong>',
                            icon: 'fa fa-paw',
                            message: '图片大小不能超过5M'
                        },
                        //setting
                        {
                            type: 'danger',
                            animate: {
                                enter: 'animated bounceInDown',
                                exit: 'animated bounceOutUp'
                            },
                            placement: {
                                from: "bottom",
                                align: "left"
                            },
                            offset: {
                                x: 100,
                                y: 200
                            },
                            delay: 1500,
                            timer: 1000,
                        });
                }
//                let callback = this.options.before_queued;
//                callback && callback.call(this.options.uploader, file);
            });

            // 加入队列之后

            this.uploader.on('fileQueued', file => {
                self._makeThumb(file);
            });

//
//            this.uploader.on('uploadBeforeSend', function (obj, data, headers) {
//                let token = sessionStorage.getItem('token');
//                if (token !== null) {
//                    _.extend(headers, {
//                        "HaiYi-Access-Token": token,
//                    });
//                }
//            });
            //开始上传
            this.uploader.on("uploadStart", file => {
                this._notify = $.notify('<strong>文件上传</strong> 开始上传', {
                    type: 'info',
                    allow_dismiss: false,
                    showProgressbar: true,
                    placement: {
                        from: "bottom",
                        align: "left"
                    },
                    offset: {
                        x: 20,
                        y: 100
                    },
                    icon: 'fa fa-paw',
                });

//                let callback = this.options.on_upload_start;
//                callback && callback.call(this, file);
            });

            //上传进度
            this.uploader.on("uploadProgress", (file, percentage) => {
//                let callback = this.options.on_upload_progress;
//                callback && callback.call(this, file, percentage);
                this._notify.update({
                    type: 'warning',
                    message: '上传进度' + percentage.toFixed(2) * 100 + '....',
                    progress: percentage * 100
                });
            });



            //上传成功
            this.uploader.on('uploadSuccess', (file, response) => {
                let callback = this.on_upload_success;
                callback && callback.call(this, file, response);
                console.log(callback);

                this._notify.update({'type': 'success', 'message': '上传成功', progress: 100});
                setTimeout(() => {
                    this._notify.close();
                }, 1000);

                self.img_url = response.data
                self.$dispatch('refresh', response);

            });
            //上传失败
            this.uploader.on("uploadError", (file, reason) => {
                console.log(file);
//                let callback = this.options.on_upload_error;
//                callback && callback.call(this, file, reason);
                this._notify.update({'type': 'danger', 'message': '上传失败'});
                setTimeout(() => {
                    this._notify.close();
                }, 1000);
            });
        }
    }

</script>
<style>
    /*@import '../../../node_modules/webuploader/css/webuploader.css';*/
    .container {
        position: relative;
    }
    .uploader-list {
        width:100%
    }
    .file-item {
        width: 110px;
        height: 110px;
        position: relative;
        overflow: hidden;
        border: 1px #7cc123 solid;

    }
    .o-btn {
        width: 100%;
        height: 25px;
        display: none;
        background: rgba(0, 0, 0, 0.5);
        position: absolute;
        bottom: 0;
        left: 0;
        border-top: 1px #7cc123 solid;
    }
    .btn-phone {
        height: 25px;
        border-right: 1px #7cc123 solid;
    }
    .css-icon  svg {
        margin: 2px auto;
    }
    .css-icon {
        width: 50%;
        text-align: center;
        display: inline-block;
    }
    .popup-phone {
        width: 100%;
        height: 100%;
        position: fixed;
        background: rgba(0,0,0,0.5);
        left: 0;
        top:0;
        text-align: center;
        z-index: 100;
    }
    .preview {
        max-width: 940px;
        max-height: 600px;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
    }
    .webuploader-pick {
        width: 100px;
        height: 30px;
        line-height: 30px;
        padding: 0;
    }
    /*.select2-heig {*/
    /*height: 30px;*/
    /*}*/

    /*.select2 {*/
    /*width: 100% !important;*/
    /*}*/
</style>