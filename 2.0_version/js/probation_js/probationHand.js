new Vue({
    el: '#app',
    data: {
        msg: {},
        help: true,//邀请好友助力
        register: false,//登陆按钮
        support: false,//支持他
        // popup:true,//登录模块
        globals:false,// 点击好友助力,显示出来的模态 
    },
    created() {},
    methods: {
        btnLogIn: function () {
            var _this = this;
            console.log(1);
            $('.enter').css({
                // 'display':'block',
                'transform': 'translateY(-8.133333rem)',
                'animation': 'popup 0.5s linear'
            })
        },
        // 点击模态框
        btnModal() {
            console.log(2);
            $('.enter').css({
                'transform': 'translateY(8.133333rem)',
                // 'display':'none'popup_drop
                'animation': 'popup_drop 0.5s linear'
            })
        },
        //点击登录按钮
        btnRegister() {
            console.log(3)
            var _this = this;
            if ($('#checkbox_id').is(':checked')) {
                // do something}
                $('.enter').css({
                    'transform': 'translateY(8.133333rem)',
                    'animation': 'popup_drop 0.5s linear'
                })
                _this.register = false;
                _this.support = true;
                // console.log('_this.register'+'============='+_this.register);
                // console.log('_this.suport'+'============='+_this.support );
                console.log('选中');
            } else {
                console.log('不选中');
            }
        },
        // 点击支持ta
        btnClick(){
            console.log(5)
        },
        // 点击邀请好友助力
        btnClickFriend(){
            var _this = this;
            console.log('点击好友助力,显示出来的模态');
            _this.globals = true;
        },
        //点击邀请好友阻力,然后出现的模态框,再点击,隐藏
        btnClickGloval(){
            var _this = this;
            console.log('点击屏幕,隐藏模态');
            _this.globals = false;
        }
    }
})