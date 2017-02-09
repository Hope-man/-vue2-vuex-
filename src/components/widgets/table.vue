<template>
    <div>
        <div class="panel panel-flat border-top-lg border-top-warning">
            <!--{{this.dsTable?this.dsTable.page_size:11}}-->
            <div class="table-responsive">
                <table class="table">
                    <thead>
                    <tr>
                        <th v-for="item in columns">{{item.text}}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <template v-for="item in dsTable.items">
                        <tr :data-id="item.id">
                            <template v-for="citem in columns ">
                                <td>
                                    <span v-if="typeof citem.template !=='undefined'" class="btn-block"
                                          <!--v-on:click="baseDateil( $event,citem.field)">{{{citem.template}}}</span>-->
                                    <!--<span v-if="citem.type ==='radius'" class="status-mark {{item[citem.field]}} position-left"></span>-->
                                    <span v-if="citem.type ==='date'">{{item[citem.field]|date}}</span>
                                    <!--<span v-if="citem.type ==='html'">{{{item[citem.field] || '-'}}} </span>-->
                                    <span v-if="typeof citem.type==='undefined'">{{item[citem.field] || "-"}}</span>
                                </td>
                            </template>
                        </tr>
                    </template>
                    </tbody>
                </table>
                <div v-if="noData" class="alert alert-danger no-border no-alerts">
                    <span class="text-semibold">没有检索到数据~</span>
                </div>
            </div>
        </div>
        <p style="text-align: right">当前共<span style="color:#ECBC29">{{totalSize}}</span>条结果</p>
        <div class="text-center bootpag-default">
            <ul class="pagination bootpag pagination-sm">
                <li v-bind:class="{ 'disabled': cur == 1}"><a v-on:click="firstClick()">首页</a></li>
                <li class="prev" v-bind:class="{ ' disabled': cur == 1}"><a v-on:click="preClick()">上一页</a></li>
                <li v-for="per in pages" v-bind:class="{ 'active': cur == per.text}" data-lp="per.text">
                    <a v-on:click="pageClick(per.text)">{{ per.text }}</a>
                </li>
                <li class="next" v-bind:class="{'disabled': cur == totalPage }"><a v-on:click="nextClick()">下一页</a></li>
                <li v-bind:class="{ 'disabled': cur == totalPage}"><a v-on:click="lastClick()">尾页</a></li>
            </ul>
        </div>
    </div>
</template>
<script>

    export default {

        props: {
            pageCfg: ['pagecfg'], //初始化配置
            columns: '',  //列配置
            dsTable: {}  //数据源
        },
        data () {
            return {
                // 初始页
//                cur: this.dsTable.page || 1,

                data: this.dsTable,
                // 分页条每一边显示个数
                pagebar_limit: 5,
                // 底部分页基数 默认10
//                page_size: this.dsTable.page_size || 10,
                // 总页数
                totalPage: 0,
                // 记录总数
                totalSize: 0,
                noData: false
            }
        },

        methods: {
            baseDateil (e, col) {
                let key = e.target.dataset['key'],
                    row_id = $(e.target).parents('tr').data('id');
                let col_ds = this.columns.filter(item => item.field === col);
                let row = this.dsTable.items.filter(item => item.id === row_id);

                let callback = col_ds[0].callback[key];
                callback.call(this, e, row[0]);
            },
            // 首页
            firstClick () {
                if (this.cur > 1) {
                    this.cur = 1;
                    this.getData();
                }
            },
            // 尾页
            lastClick () {
                if (this.cur < this.totalPage) {
                    this.cur = this.totalPage;
                    this.getData();
                }
            },
            // 上一页
            preClick () {
                if (this.cur > 1) {
                    this.cur--;
                    this.getData();
                }
            },
            // 下一页
            nextClick () {
                if (this.cur < this.totalPage) {
                    this.cur++;
                    this.getData();
                }
            },
            // 页码
            pageClick (data) {
                if (data != this.cur) {
                    this.cur = data;
                    this.getData();

                }
            },
            // 刷新显示记录数
            refreshPageCon () {
                this.start = (this.cur - 1) * this.limit + 1;
                if (this.totalSize >= this.limit * this.cur) {
                    this.end = this.limit * this.cur;
                } else {
                    this.end = this.totalSize;
                }
            },
            // 分页请求
            getData () {
                let _this = this;
                _this.$dispatch('refresh', this.cur);
            },
            // getPage (curPage, totalPage, pageNum) {
            //     let leftPage, rightPage;
            //     curPage = curPage > 1 ? curPage : 1;
            //     curPage = curPage > totalPage ? totalPage : curPage;
            //     totalPage = curPage > totalPage ? curPage : totalPage;
            //     // 左侧页数
            //     leftPage = curPage - Math.floor(pageNum / 2);
            //     leftPage = leftPage > 1 ? leftPage : 1;

            //     // 右侧页数
            //     rightPage = curPage + Math.floor(pageNum / 2);
            //     rightPage = rightPage > totalPage ? totalPage : rightPage;

            //     let curPageNum = rightPage - leftPage + 1;
            //     if(totalPage < 9) {

            //     } else {
            //         // 左侧调整
            //         if (curPageNum < pageNum && leftPage > 1) {
            //             leftPage = leftPage - (pageNum - curPageNum);
            //             leftPage = leftPage > 1 ? leftPage : 1;
            //             curPageNum = rightPage - leftPage + 1;
            //         }

            //         // 右侧调整
            //         if (curPageNum < pageNum && rightPage < totalPage) {
            //             rightPage = rightPage + (pageNum - curPageNum);
            //             rightPage = rightPage > totalPage ? totalPage : rightPage;
            //         }
            //     }


            //     var arr = [];
            //     for (var i = leftPage; i <= rightPage; i++) {
            //         arr.push(i);
            //     }
            //     return arr;
            // }

            //pageNum 当前页码
            //pageCount 总页数
            //sideNum 分页系数  分页条中二分之一显示几个数字页码
            pagebar_calc(pageNum, pageCount, sideNum) {
                pageNum = parseInt(pageNum);
                pageCount = parseInt(pageCount);
                var startNum = 0;
                var endNum = 0;
                if (pageCount <= sideNum) {
                    endNum = pageCount;
                } else {
                    if ((sideNum + pageNum) >= pageCount) {
                        endNum = pageCount;
                    } else {
                        endNum = sideNum + pageNum;
                        if ((sideNum + pageNum) <= (2 * sideNum + 1)) {
                            if ((2 * sideNum + 1) >= pageCount) {
                                endNum = pageCount;
                            } else {
                                endNum = 2 * sideNum + 1;
                            }
                        } else {
                            endNum = sideNum + pageNum;
                        }
                    }
                }
                if (pageNum <= sideNum) {
                    startNum = 1;
                } else {
                    if ((pageNum + sideNum) >= pageCount) {
                        if ((2 * sideNum + 1) >= pageCount) {
                            if ((pageCount - 2 * sideNum) >= 1) {
                                startNum = pageCount - 2 * sideNum;
                            } else {
                                startNum = 1;
                            }
                        } else {
                            startNum = pageCount - 2 * sideNum;
                        }
                    } else {
                        if ((pageNum - sideNum) >= 1) {
                            startNum = pageNum - sideNum;
                        } else {
                            startNum = 1;
                        }
                    }
                }
                return this._pagebar_json(startNum, endNum, pageNum);
            },
            _pagebar_json(startNum, endNum, pageNum) {

                let tmpPageBar = [];
                for (var i = startNum; i <= endNum; i++) {
                    var o = {
                        text: i
                    };
                    if (i === pageNum) {
                        o.isCurrent = true;
                    }
                    tmpPageBar.push(o);
                }
                return tmpPageBar;
            },
        },
        computed: {
            pages () {

                if (this.totalPage == '0') {
                    this.noData = true
                } else {
                    this.noData = false
                }
                return this.pagebar_calc(this.cur, this.totalPage, this.pagebar_limit);
            }
        },
        created() {
            console.log(this.dsTable);
            this.$watch('dsTable', () => {
                this.page_size = this.dsTable.page_size;
                this.totalPage = this.dsTable.total_page || 0;
                this.totalSize = this.dsTable.total_size || 0;
                this.cur = this.dsTable.page || 1
            }, {
                deep: true
            });
        }


    }

</script>
<style>
    .btn-block {
        width: 60px;
    }

    .btn-block a {
        display: block;
        padding: 2px 0;
    }
</style>