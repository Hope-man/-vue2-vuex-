import {
    urls
} from './urls';

import 'bootstrap-notify/bootstrap-notify';
const tmpl_loading = `<div class="overlay">
                            <i></i>
                        </div>`;

// const Server = "http://192.168.1.224/"
// const Server = "http://gpsapi.1mobility.cn/"
const Server = 'http://192.168.1.224:8070/';
// const Server = 'http://192.168.1.224:8077/';  // dev
// // const Server = 'http://app.gcarclub.com/'


// 权限对接
const AuthServer = 'http://192.168.1.223:8089/';//获取权限菜单 测试
// const AuthServer = 'http://securitypreapi.1mobility.cn/';//获取权限菜单 预生产
// const AuthServer = 'http://securityapi.1mobility.cn/';//获取权限菜单 生产

const AuthMgr = "http://192.168.1.247:9002/#login"; //权限的登录页
// const AuthMgr = "http://securitypre.1mobility.cn/#login"; //权限的登录页 预生产
// const AuthMgr = "http://security.1mobility.cn/#login"; //权限的登录页 生产

function Notify_success(msg) {
    $.notify(
        //options
        {
            title: '<strong>操作成功</strong>',
            icon: 'fa fa-paw',
            message: msg
        },
        //setting
        {
            type: 'success',
            animate: {
                enter: 'animated rollIn',
                exit: 'animated rollOut'
            },
            placement: {
                from: "bottom",
                align: "left"
            },
            offset: {
                x: 20,
                y: 100
            },
            delay: 500,
            timer: 3000,
        });
}

function handle_invalid_token() {
    sessionStorage.setItem('prev', window.location.href);
    sessionStorage.removeItem('token');
    Notify_fail("登录超时，请重新登录");
        window.location.href = AuthMgr;
    return;
}

function Notify_fail(msg) {
    $.notify(
        //options
        {
            title: '<strong>错误信息</strong>',
            icon: 'fa fa-paw',
            message: msg
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
            timer: 3000,
        });
}

class Ajax {
    constructor(url) {
        this.url = url;

        this.cfg = {
            //type: method,
            url: Server + url,
            // data: JSON.stringify(options),
            // data: options,
            // contentType: 'application/json;charset=UTF-8',
            // dataType: 'json',
            // beforeSend: function (xhr) {},
            // error: function (response) {
            //     reject(response);
            // },
            // success: function (response) {
            //     resolve(response);
            // }
        }
    }

    _ajax(method, options, improt, serverurl) {
        let token = sessionStorage.getItem('token');
        return new Promise((resolve, reject) => {

            if (improt) {

                let formData = new FormData();

                for( let i in options ){
                    formData.append(i, options[i]);
                }
                $.ajax({
                    url: serverurl || this.cfg.url,
                    type: method,
                    data: formData,
                    processData: false,
                    contentType: false,
                    beforeSend: function (xhr) {
                        if (token !== null) {
                            xhr.setRequestHeader("HaiYi-Access-Token", token);
                        }
                    },
                    success: function (response) {
                        resolve(response);
                        if (response.code == '0000') {
                            response.data.errorList.forEach(item => {
                                Notify_fail(item.errorReason);
                            });
                            Notify_success("上传成功"+ response.data.successList.length+ "条");

                            document.getElementById('addForm').reset();
                            // Notify_success(response.message);
                        } else if (response.code === '1007') { //token 失效
                            handle_invalid_token();
                            return;
                        }  else {
                            Notify_fail(response.message);
                        }
                    },
                    error: function (response) {
                        reject(response);
                        Notify_fail("接口挂掉了哦！！！！！");
                    }

                });

            } else {

                if (serverurl) {
                    this.cfg.url = serverurl + this.url;
                }
                let tmp_cfg = $.extend(true, {}, this.cfg, {
                    type: method,
                    contentType: 'application/json;charset=UTF-8',
                    dataType: 'json',
                    // beforeSend: function (xhr) {
                    //     // console.log(xhr);
                    // },
                    beforeSend: function (xhr) {
                        if (token !== null) {
                            xhr.setRequestHeader("HaiYi-Access-Token", token);
                        }
                    },
                    error: function (response) {
                        reject(response);
                        Notify_fail("接口挂掉了哦！！！！！");
                    },
                    success: function (response) {
                        resolve(response);
                        if (response.code == '0000') {
                            // Notify_success(response.message);
                        } else if (response.code === '1007') { //token 失效
                            handle_invalid_token();
                            return;
                        }  else {
                            Notify_fail(response.message);

                        }
                    }
                });
                tmp_cfg.data = (method === 'GET' ? options : JSON.stringify(options));

                $.ajax(tmp_cfg);
            }
        });
    }
}
class GET extends Ajax {
    constructor(url) {
        super(url)
    }

    fetch(options) {
        return super._ajax("GET", options)
    }

}
class POST extends Ajax {
    constructor(url) {
        super(url)
    }

    fetch(options, improt) {
        return this._ajax('POST', options, improt)
    }
}

// GET 权限
class POSTAuth extends Ajax {
    constructor(url) {
        super(url)
    }
    fetch(options, improt) {
        return super._ajax("POST", options, improt, AuthServer)
    }
}

//HOME
//data_service_platform
export const file = new POST(urls.file);
export const user_list = new POST(urls.user_list);
export const user_id=new GET(urls.user_id);
export const supplier_page=new POST(urls.supplier_page);
export const supplier_update= new POST(urls.supplier_update);
export const data_business_model=new GET(urls.data_business_model);
export const user_type_list=new GET(urls.user_type_list);
export const commit_audi_createt=new POST(urls.commit_audi_createt);
// export const data_type_model_id=new GET(urls.data_type_model_id);
//export const service_platform_list=new GET(urls.service_platform_list);
export const data_center_list = new POST(urls.data_center_list);
export const supplier_list = new GET(urls.supplier_list);
export const data_create = new POST(urls.data_create);
export const data_status_update = new POST(urls.data_status_update);
export const data_service_platform = new GET(urls.data_service_platform);
export const model_list = new POST(urls.model_list);
//export const platform_list = new GET(urls.platform_list);
export const model_select_list = new GET(urls.model_select_list);
export const add_model = new POST(urls.add_model);
export const model_update = new POST(urls.model_update);
export const status_list = new GET(urls.status_list);
export const user_type = new GET(urls.user_type);
export const model_page = new POST(urls.model_page);

export const model_center_list = new GET(urls.model_center_list);
export const audit_param = new POST(urls.audit_param);
export const bs_model_name = new GET(urls.bs_model_name);
export const create_user = new POST(urls.create_user);
export const audit_create = new POST(urls.audit_create);
export const examine_info = new GET(urls.examine_info);
export const audit_list = new POST(urls.audit_list);
export const audit_update = new POST(urls.audit_update);
export const audit_result = new POST(urls.audit_result);
export const audit_log = new POST(urls.audit_log);
export const audit_status = new POST(urls.audit_status);
export const user_quasi_driving = new GET(urls.user_quasi_driving);



// 权限
export const user_roles = new POSTAuth(urls.user_roles);

export {
    AuthMgr
};
