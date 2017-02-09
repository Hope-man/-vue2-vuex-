<template>

    <!-- Main sidebar -->
    <div class="sidebar sidebar-main sidebar-default">
        <div class="sidebar-content">
            <!-- Main navigation -->
            <div class="sidebar-category sidebar-category-visible">
                <!--<div class="category-title h6">-->
                    <!--<span></span>-->
                    <!--<ul class="icons-list">-->
                        <!--<li>-->
                            <!--<a href="javascript:;" data-action="collapse"></a>-->
                        <!--</li>-->
                    <!--</ul>-->
                <!--</div>-->
                <sidebar-menu></sidebar-menu>
            </div>
            <!-- /main navigation -->
        </div>
    </div>
    <!-- /main sidebar -->

</template>

<script>
    
  import SidebarMenu from './../widgets/sidebar-menu'

  module.exports = {
    data: function () {
      return {
        menu: this.$parent.$data.menu || []
      }
    },
    components: {
      'sidebar-menu': SidebarMenu
    }
  }
</script>
