<template>
    <div class="member-center-page">
        <div class="drawer-mask" @click="fnHideDrawer"></div>
        <div class="drawer-content">
            <div class="icon-avatar"></div>
            <ul class="user-info">
                <li class="info-item"
                    :key="key"
                    v-for="(item,key) in nav"
                    @click="fnClick(item.pathName)">
                    <i class="icon iconfont"
                       :class="'icon-' + item.icon"></i>
                    {{item.name}}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import account from '../api/account'

    export default {
        name: 'member-center',
        data() {
            return {
                nav: [
                    {
                        icon: 'stroke',
                        name: '我的行程',
                        pathName: 'orderList'
                    },
                    {
                        icon: 'zhuyetuangou',
                        name: '拼团旅行',
                        pathName: 'teamWork'
                    },
                    {
                        icon: 'contact',
                        name: '联系客服',
                        pathName: ''
                    },
                    {
                        icon: 'identity',
                        name: '切换身份',
                        pathName: ''
                    },
                    {
                        icon: 'setting',
                        name: '设置',
                        pathName: ''
                    },
                    {
                        icon: 'exit',
                        name: '退出',
                        pathName: 'exit'
                    }
                ]
            }
        },
        methods: {
            fnHideDrawer() {
                this.$emit('onHide')
            },
            fnClick(pathName) {
                if (pathName === 'exit') {
                    account.logOut()
                        .then(res => {
                            if (res.resultCode === 200) {
                                this.fnPushRoute('login')
                            }
                        })
                } else {
                    this.fnPushRoute(pathName)
                }
            }
        }
    }
</script>

<style scoped>

</style>
