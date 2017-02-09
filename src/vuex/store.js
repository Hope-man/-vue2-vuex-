// import Vue from 'vue'
// import Vuex from 'vuex'
//
// Vue.use(Vuex);
//
//
// import home from './modules/home';
// import base from './modules/base';
// import car from './modules/car';
// import user from './modules/user';
// import model from './modules/model';
// //import car from './modules/car';
//
// // const debug = process.env.NODE_ENV !== 'production'
//
// export default new Vuex.Store({
//     modules: {
//         home,
//         base,
//         car,
//         user,
//         model
//     }
// })


import Vue from 'vue'
import Vuex from 'vuex'

import {
    // 权限
    user_roles,
    // user
    user_list,
    user_id,
    data_business_model,
    user_type_list,
    commit_audi_createt,
    data_type_model_id,

    supplier_page,
    supplier_update,

    data_center_list,
    supplier_list,
    data_create,
    data_status_update,
    data_service_platform,

    // model

    model_list,
    model_select_list,
    add_model,
    model_center_list,
    model_update,
    status_list,
    user_type,
    model_page,

    // HOME
    audit_param,
    audit_create,
    bs_model_name,
    create_user,
    examine_info,
    audit_list,
    audit_update,
    audit_result,
    audit_log,
    audit_status,
    user_quasi_driving,
    

} from '../api/apis.js'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        get_user_roles:'',
        get_user_list: '',
        get_user_id: '',
        get_supplier_page: '',
        get_supplier_update: '',
        get_data_center_list: '',
        get_supplier_list: '',
        get_data_create: '',
        get_data_status_update: '',
        get_data_service_platform: '',
        get_data_business_model: '',
        get_user_type_list: '',
        get_commit_audi_createt: '',
        get_data_type_model_id: '',
        get_model_list: '',
        get_model_page: '',
        get_model_select_list: '',
        get_add_model: '',
        get_model_center_list: '',
        get_model_update: '',
        get_status_list: '',
        get_user_type: '',
        get_audit_param: '',
        get_bs_model_name: '',
        get_create_user: '',
        get_audit_create:'',
        get_examine_info: '',
        get_audit_list: '',
        get_audit_update: '',
        get_audit_result:'',
        get_audit_log:'',
        get_audit_status:'',
        get_user_quasi_driving:'',

    },
    // actions
    actions: {
        user_roles({commit}, options) {
            commit('user_roles', options)
        },
        user_list({commit}, options) {
            commit('user_list', options)
        },
        user_id({commit}, options) {
            commit('user_id', options)
        },
        supplier_page({commit}, options){
            commit('supplier_page', options)
        },
        supplier_update({commit}, options){
            commit('supplier_update', options)
        },

        data_center_list({commit}, options) {
            commit('data_center_list', options)
        },
        supplier_list({commit}, options) {
            commit('supplier_list', options)
        },
        data_create({commit}, options) {
            commit('data_create', options)
        },
        data_status_update({commit}, options) {
            commit('data_status_update', options)
        },
        data_service_platform({commit}, options) {
            commit('data_service_platform', options)
        },
        data_business_model({commit}, options) {
            commit('data_business_model', options)
        },
        user_type_list({commit}, options) {
            commit('user_type_list', options)
        },
        commit_audi_createt({commit}, options) {
            commit('commit_audi_createt', options)
        },
        data_type_model_id({commit}, options) {
            commit('data_type_model_id', options)
        },
        model_list({commit}, options) {
            commit('model_list', options)
        },
        model_select_list({commit}, options) {
            commit('model_select_list', options)
        },

        add_model({commit}, options) {
            commit('add_model', options)
        },
        model_center_list({commit}, options) {
            commit('model_center_list', options)
        },
        model_update({commit}, options) {
            commit('model_update', options)
        },
        status_list({commit}, options) {
            commit('status_list', options)
        },
        user_type({commit}, options) {
            commit('user_type', options)
        },
        model_page({commit}, options) {
            commit('model_page', options)
        },
        audit_param({commit}, options) {
            commit('audit_param', options)
        },
        bs_model_name({commit}, options) {
            commit('bs_model_name', options);
        },
        create_user({commit}, options) {
            commit('create_user', options);
        },
        audit_create({commit}, options) {
            commit('audit_create', options);
        },
        examine_info({commit}, options) {
            commit('examine_info', options);
        },
        audit_list({commit}, options) {
            commit('audit_list', options)
        },
        audit_update({commit}, options) {
            commit('audit_update', options)
        },
        audit_result({commit}, options) {
            commit('audit_result', options)
        },
        audit_log({commit}, options) {
            commit('audit_log', options)
        },
        audit_status({commit}, options) {
            commit('audit_status', options)
        },
        user_quasi_driving({commit}, options) {
            commit('user_quasi_driving', options)
        }


    },
    // mutations
    mutations: {
        user_roles(state, options) {
            user_roles.fetch(options).then(respone => {
                state.get_user_roles = respone
            });
        },
        user_list(state, options) {
            user_list.fetch(options).then(respone => {
                state.get_user_list = respone
            });
        },
        user_id(state, options){
            user_id.fetch(options).then(respone => {
                state.get_user_id = respone
            });
        },
        commit_audi_createt(state, options) {
            commit_audi_createt.fetch(options).then(respone => {
                state.get_commit_audi_createt = respone
            });
        },
        data_type_model_id(state, options) {
            data_type_model_id.fetch(options).then(respone => {
                state.get_data_type_model_id = respone
            });
        },
        supplier_page (state, options) {
            supplier_page.fetch(options).then(respone => {
                state.get_supplier_page = respone
            });
        },
        supplier_update (state, options) {
            supplier_update.fetch(options).then(respone => {
                state.get_supplier_update = respone
            });
        },

        data_center_list(state, options) {
            data_center_list.fetch(options).then(respone => {
                state.get_data_center_list = respone
            });
        },
        supplier_list(state, options) {
            supplier_list.fetch(options).then(respone => {
                state.get_supplier_list = respone
            });
        },
        data_create(state, options) {
            data_create.fetch(options).then(respone => {
                state.get_data_create = respone
            });
        },
        data_status_update(state, options) {
            data_status_update.fetch(options).then(respone => {
                state.get_data_status_update = respone
            });
        },
        data_service_platform(state, options) {
            data_service_platform.fetch(options).then(respone => {
                state.get_data_service_platform = respone
            });
        },
        data_business_model(state, options) {
            data_business_model.fetch(options).then(respone => {
                state.get_data_business_model = respone
            });
        },
        user_type_list(state, options) {
            user_type_list.fetch(options).then(respone => {
                state.get_user_type_list = respone
            });
        },
        model_list(state, options) {
            model_list.fetch(options).then(respone => {
                state.get_model_list = respone
            })
        },
        model_select_list(state, options) {
            model_select_list.fetch(options).then(respone => {
                state.get_model_select_list = respone
            })
        },

        add_model(state, options) {
            add_model.fetch(options).then(respone => {
                state.get_add_model = respone
            })
        },
        model_center_list(state, options) {
            model_center_list.fetch(options).then(respone => {
                state.get_model_center_list = respone
            })
        },
        model_update(state, options) {
            model_update.fetch(options).then(respone => {
                state.get_model_update = respone
            })

        },
        status_list(state, options) {
            status_list.fetch(options).then(respone => {
                state.get_status_list = respone
            })
        },
        user_type(state, options) {
            user_type.fetch(options).then(respone => {
                state.get_user_type = respone
            })
        },
        model_page(state, options) {
            model_page.fetch(options).then(respone => {
                state.get_model_page = respone;
            })
        },
        audit_param(state, options) {
            audit_param.fetch(options).then(respone => {
                state.get_audit_param = respone;
            })
        },
        bs_model_name(state, options) {
            bs_model_name.fetch(options).then(respone => {
                state.get_bs_model_name = respone;
            })
        },
        create_user(state, options) {
            create_user.fetch(options).then(respone => {
                state.get_create_user = respone
            })
        },
        audit_create(state, options) {
            audit_create.fetch(options).then(respone => {
                state.get_audit_create = respone
            })
        },
        examine_info(state, options) {
            examine_info.fetch(options).then(respone => {
                state.get_examine_info = respone
            })
        },
        audit_list(state, options) {
            audit_list.fetch(options).then(respone => {
                state.get_audit_list = respone;
            })
        },
        audit_update(state, options) {
            audit_update.fetch(options).then(respone => {
                state.get_audit_update = respone;
            })
        },
        audit_result(state, options) {
            audit_result.fetch(options).then(respone => {
                state.get_audit_result = respone;
            })
        },
        audit_log(state, options) {
            audit_log.fetch(options).then(respone => {
                state.get_audit_log = respone;
            })
        },
        audit_status(state, options) {
            audit_status.fetch(options).then(respone => {
                state.get_audit_status = respone;
            })
        },
        user_quasi_driving(state, options) {
            user_quasi_driving.fetch(options).then(respone => {
                state.get_user_quasi_driving = respone;
            })
        }
    }
})
