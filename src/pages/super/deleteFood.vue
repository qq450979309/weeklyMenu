<template>
    <div class="deleteFood">
        <nav class="header-wrapper">
            <router-link to="/">
            </router-link>
            <div class="input-wrapper">
                <input v-model="keyword" class="searchInput" type="text" @keyup.enter="search()" placeholder="请输入菜品名" />
                <div class="btn" @click="search()">搜索</div>
            </div>
        </nav>
        <div class="operation-wrapper">
            <el-button class="delete" type="danger" size="mini" @click="beforeDelete()">删除</el-button>
            <el-button class="selectAll" type="primary" size="mini" @click="selectAll($event)">全选</el-button>
        </div>
        <div class="result-wrapper">
            <FoodCard size="normal" :showSelect="true" :foodInfo="item" v-for="(item, idx) in foods" :key="idx"></FoodCard>
        </div>
    </div>
</template>
       
<script>
import { prefix } from '@/publicAPI/config'
import mHeader2 from '@/components/Public/mHeader2'
import FoodCard from '@/components/foodCard'

export default {
    name: 'deleteFood',
    components: {
        mHeader2,
        FoodCard
    },
    data () {
        return {
            img_food: require('./../../../static/food/ws.jpg'),
            keyword: '',
            lastKeyword: '',
            keywords: [],
            idDeleting: [],
            foods: []
        }
    },

    methods: {
        beforeDelete () {
            this.idDeleting = []
            this.foods.forEach((elem) => {
                if (elem.checked) {
                    this.idDeleting.push(elem.foodId)
                }
            })
            this.$confirm('确认删除菜品吗?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.deleteFoods()
            }).catch(() => {
                console.log('取消本次修改')
            })
        },

        deleteFoods () {
            let that = this
            this.$axios.post(`${prefix}/admin/deleteFood`, {
                    foodsId: that.idDeleting
                })
                .then((res) => {
                    if (res.data.success) {
                        this.search()
                        this.$alert('删除成功!', '温馨提示', {
                            confirmButtonText: '好的',
                            callback: () => {
                                this.$router.push('/super')
                            }
                        })
                    } else {
                        alert(res.data.msg)
                    }
                })
                .catch((err) => {
                    alert(err)
                })
        },

        selectAll (ev) {
            if (ev.currentTarget.innerText === '全选') {
                this.foods.forEach((elem) => {
                    this.$set(elem, 'checked', true)
                })
                ev.currentTarget.innerText = '取消全选'
            } else {
                this.foods.forEach((elem) => {
                    this.$set(elem, 'checked', false)
                })
                ev.currentTarget.innerText = '全选'
            }
        },

        search (val) {
            this.lastKeyword = this.keyword
            this.$axios.get(`${prefix}/food/getFoodsByKeyword?keyword=${val || this.keyword}`)
            .then((res) => {
                if (res.data.success) {
                    this.foods = [...res.data.relatedObject.myList]
                    this.foods.forEach((elem) => {
                        this.$set(elem, 'checked', false)
                    })
                    this.idDeleting = []
                }
            })
            .catch((err) => {
                alert(err)
            })
        }
    },

    mounted () {
        this.search()
    }
}
</script>

<style lang="postcss" type="text/css" rel="stylesheet/css" scoped>
@import "../../common.css";

.deleteFood {
    position: absolute;
    width: 100%;
    height: 100%;
    font-size: px2rem(14px);
        
    .header-wrapper {
        position: relative;
        padding: px2rem(5px) 0;
        width: 100%;
        height: px2rem(40.5px);
        text-align: center;
        color: #FFF;
        box-shadow: 0 12px 14px 0 rgba(209, 209, 209, .27);

        .flag {
            display: inline-block;
            position: relative;
            top: px2rem(2px);
            left: px2rem(-15px);
            width: px2rem(24px);
            height: px2rem(24px);

            .back_link {
                color: $white;
            }
        }
        
        .title {
            display: inline-block;
            position: relative;
            top: px2rem(10px);
            width: px2rem(100px);
            height: px2rem(24px);
        }
        
        .input-wrapper {
            display: inline-block;
            position: relative;

            .searchInput {
                width: px2rem(265px);
                height: px2rem(30px);
                padding-left: px2rem(28px);
                font-size: px2rem(12px);
                color: $black;
                border: px2rem(1px) solid $black;
                border-radius: px2rem(4px);

                &:focus {
                    color: $black;
                }
            }

            .btn {
                color: $black;
                display: inline-block;
                margin-left: px2rem(10px);
                font-size: px2rem(12px);
            }
        }
    }

    .init {
        .hot-wrapper {
            height: px2rem(106px);
            background: $white;

            .title {
                height: px2rem(36px);
                margin-left: px2rem(15px);
                line-height: px2rem(36px);
                color: $gray2;
                border-bottom: px2rem(1px) solid $gray1;
            }

            .list {
                padding: px2rem(4px) 0;

                .item {
                    display: inline-block;
                    width: 20%;
                    height: px2rem(32px);
                    line-height: px2rem(32px);
                    text-align: center;
                    color: $black2;
                }
            }
        }
    }

    .operation-wrapper {
        position: relative;
        text-align: left;
        top: px2rem(5px);
        height: px2rem(30px);

        .delete {
            display: inline-block;
            position: absolute;
            left: px2rem(15px);
        }

        .selectAll {
            display: inline-block;
            position: absolute;
            right: px2rem(15px);
        }
    }

    .result-wrapper {
        padding: 0 px2rem(15px);

        .food {
            height: px2rem(76px);
            padding: px2rem(5px) 0;
            border-bottom: px2rem(1px) solid $gray2;

            & a {
                display: flex;
                height: 100%;

                .img, .desc {
                    display: inline-block;
                }

                .img {
                    width: px2rem(110px);
                    height: 100%;
                }

                .desc {
                    width: 100%;
                    height: 100%;
                    margin-left: px2rem(4px);
                    vertical-align: top;

                    .name {
                        max-width: 80%;
                        color: $black2;
                        font-size: px2rem(16px);
                    }

                    .material, .hot {
                        max-width: px2rem(280px);;
                        margin-top: px2rem(3px);
                        color: $gray2;
                        font-size: px2rem(12px);
                    }
                }
            }

            &:last-child {
                border-bottom: 0 solid $gray2;
            }
        }
    }
}
</style>
