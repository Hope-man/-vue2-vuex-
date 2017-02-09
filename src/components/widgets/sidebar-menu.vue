<template>

    <div class="category-content no-padding">
        <ul class="navigation navigation-main navigation-accordion">
            <template v-for="item in menu">
                <li v-if="item.child" class="treeview" :class="{'active':item.link==='/'+$route.path.split('/')[1]}">
                    <a v-link="{ path: item.link }">
                        <i class="fa item.icon"></i>
                        <span>{{ item.name }}</span>
                        <i v-if="item.child" class="fa fa-angle-left pull-right"></i>
                    </a>

                    <ul class="treeview-menu">
                        <li :class="{'active':item.link==='/'+$route.path.split('/')[1]}">
                            <a v-link="{ path: child.link }">
                                <i class="fa child.icon "></i> {{ child.name }}
                            </a>
                        </li>
                    </ul>
                </li>
                <li v-else :class="{'active':item.link==='/'+$route.path.split('/')[1]}">
                    <!--<a v-link="{path: item.link, exact: true}">-->
                    <!--<i class="fa {{ item.icon }}"></i>-->
                    <!--<span>{{ item.name }}</span>-->
                    <!--</a>-->
                    <a @click="goLinks(item.link)">
                        <i class="fa item.icon "></i>
                        <span>{{ item.name }}</span>
                    </a>
                </li>
            </template>
        </ul>
    </div>
</template>

<script>

    import {mapState, mapActions} from 'vuex'

    import  {AuthMgr} from  './../../api/apis';


    export default {

        data () {
            return {
                menu: this.$parent.$data.menu || []
            }
        },

        methods: {
            query(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            },

            set_first_token() {
                let token = this.query('token');

                sessionStorage.setItem('token', token);
                this.user_roles({token:sessionStorage.getItem('token')});


            },
            goLinks(link) {
                window.location.href = link;
            },
            ...mapActions([
                'user_roles',
            ])
        },
        watch: {
            get_user_roles: {
                handler: function (n, o) {
                    if (n.code !== '0000') return;
                    sessionStorage.setItem('username',n.data.name);
                    let api_menus = n.data.menus;
                    this.menu = api_menus;


                }
            }
        },
        computed: {
            ...mapState({
                get_user_roles: state => state.get_user_roles,
            })
        },
        created() {

            if (sessionStorage.getItem('token') === null) {
                this.set_first_token();
            }

            this.user_roles({token: sessionStorage.getItem('token')});
        }
    }

</script>