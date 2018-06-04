<!-- [pagination_component]   @Author: 郑君婵   @DateTime: 2017-07-03 -->
<template>
<nav class="pagination_component">
    <ul class="pagination" v-if="pagination.pageCount > 1" :class="sizeClass">
        <!--<li v-if="showPrevious()" :class="{ 'disabled' : pagination.currentPage <= 1 }">-->
            <!--<span v-if="pagination.currentPage <= 1">-->
                <!--<span aria-hidden="true">{{ config.previousText }}</span>-->
            <!--</span>-->

            <!--<a v-if="pagination.currentPage > 1 " :aria-label="config.ariaPrevioius" @click.prevent="changePage(pagination.currentPage - 1)">-->
                <!--<span aria-hidden="true">{{ config.previousText }}</span>-->
            <!--</a>-->
        <!--</li>-->

        <li v-if="showFirst()" class="quickBtn">
            <a @click.prevent="changePage(1)">1</a>
            <span class="right_0"><i>...</i></span>
        </li>

        <li v-for="num in array" :class="{ 'active': num == pagination.currentPage }">
            <a @click.prevent="changePage(num)">{{ num }}</a>
        </li>

        <li v-if="showLast()" class="quickBtn">
            <span class="left_0"><i>...</i></span>
            <a @click.prevent="changePage(pagination.pageCount)">{{ pagination.pageCount }}</a>
        </li>

        <!--<li v-if="showNext()" :class="{ 'disabled' : pagination.currentPage === pagination.pageCount || pagination.pageCount === 0 }">-->
            <!--<span v-if="pagination.currentPage === pagination.pageCount || pagination.pageCount === 0">-->
                <!--<span aria-hidden="true">{{ config.nextText }}</span>-->
            <!--</span>-->

            <!--<a v-if="pagination.currentPage < pagination.pageCount" :aria-label="config.ariaNext" @click.prevent="changePage(pagination.currentPage + 1)">-->
                <!--<span aria-hidden="true">{{ config.nextText }}</span>-->
            <!--</a>-->
        <!--</li>-->
    </ul>
</nav>
</template>

<script>
export default {
    props: {
        pagination: {
            type: Object,
            required: true
        },
        callback: {
            type: Function,
            required: true
        },
        scrollTo: '',
        options: {
            type: Object
        },
        size: {
            type: String
        }
    },
    computed: {
        array() {
            if (this.pagination.pageCount <= 0) {
                return [];
            }

            let arr = [];
            let to = this.getTo();
            let from = this.getFrom();

            while (from <= to) {
                arr.push(from);
                from++;
            }
            return arr;
        },
        config() {
            return Object.assign({
                offset: 2,
                ariaPrevious: 'Previous',
                ariaNext: 'Next',
//                previousText: '«',
//                nextText: '»',
                isScroll: true,
                scroll: {
                    x: 0,
                    y: 0
                },
                alwaysShowPrevNext: false
            }, this.options);
        },
        sizeClass() {
            if (this.size === 'large') {
                return 'pagination-lg';
            } else if (this.size === 'small') {
                return 'pagination-sm';
            } else {
                return '';
            }
        }
    },
    watch: {
        'pagination.perPage'(newVal, oldVal) {
            if (+newVal !== +oldVal) {
                this.callback();
            }
        }
    },
    methods: {
        showPrevious() {
            return this.config.alwaysShowPrevNext || this.pagination.currentPage > 1;
        },
        showNext() {
            return this.config.alwaysShowPrevNext || this.pagination.currentPage < this.pagination.pageCount;
        },
        showFirst() {
            return this.pagination.pageCount > this.getBtnLength() && this.pagination.currentPage > this.config.offset + 1;
        },
        showLast() {
            let to = this.getTo();

            return to < this.pagination.pageCount;
        },
        changePage(page) {
            if (this.pagination.currentPage === page) {
                return;
            }

            this.$set(this.pagination, 'currentPage', page);
            this.callback();
            if (!this.scrollTo) {
                window.scrollTo(0, 0);
            }
            if (this.config.isScroll) {
                window.scrollTo(this.config.scroll.x, this.config.scroll.y);
            }
        },
        getFrom() {
            let from = this.pagination.currentPage - this.config.offset;
            let maxFrom = this.pagination.pageCount - this.config.offset * 2;
            if (from > maxFrom) {
                from = maxFrom;
            }

            if (from < 1) {
                from = 1;
            }
            return from;
        },
        getTo() {
            let from = this.getFrom();
            let to = from + (this.config.offset * 2);

            if (to >= this.pagination.pageCount) {
                to = this.pagination.pageCount;
            }

            return to;
        },
        getBtnLength() {
            return this.config.offset * 2 + 1;
        }
    }
};
</script>

<style lang="less">
@import './pagination.less';
</style>
