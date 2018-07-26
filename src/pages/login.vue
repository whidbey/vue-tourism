<template>
    <div class="login-page">
        <div class="login-view">
            <img src="../assets/images/login.jpg"/>
        </div>
        <div class="login-form">
            <div class="form-pannel">
                <x-input placeholder="用户名" v-model="userPin">
                    <i slot="label" class="icon iconfont icon-user"></i>
                </x-input>
                <x-input type="password"
                         v-model="password"
                         placeholder="输入密码">
                    <i slot="label" class="icon iconfont icon-lock"></i>
                </x-input>
                <x-input>
                </x-input>
                <vf-button class="login-btn"
                           radius="half"
                           long="full"
                           @click.native="checkLogin">登录
                </vf-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {XInput, Group, XButton} from 'vux'
    import VfButton from '@vfly/vfly-ui/src/components/button/button';
    import account from '../api/account'

    export default {
        name: 'login',
        components: {
            VfButton,
            Group,
            XInput,
            XButton
        },
        data () {
            return {
                userPin: '',
                password: ''
            }
        },
        mounted() {
        },
        methods: {
            checkLogin() {
                account.login({
                    userPin: this.userPin,
                    password: this.password
                }).then(res => {
                        console.log('res', res)
                        if (res.resultCode === 200) {
                            this.fnPushRoute('index')
                            console.log('res.data', res.data)
                        } else {
                        }
                    })
            }
        }
    }
</script>

<style scoped>

</style>
