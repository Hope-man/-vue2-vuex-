<template>
    <div>
        <div class="page-container">

            <!-- Page content -->
            <div class="page-content">

                <app-sidebar></app-sidebar>

                <!-- Main content -->

                <router-view class="view content" transition transition-mode="out-in">
                </router-view>


            </div>

            <!-- /page content -->
        </div>
        <app-footer></app-footer>
    </div>
</template>

<script>

    import Sidebar from './Sidebar.vue'
    import Footer from './Footer.vue'


    module.exports = {
        name: 'Container',
        data: function () {
            return {
                menu: this.$parent.$data.menu || []
            }
        },
        replace: false,
        components: {
            'app-sidebar': Sidebar,
            'app-footer': Footer
        }
    }

</script>

<style>
    .view {
        background: #f5f5f5;
    }

</style>