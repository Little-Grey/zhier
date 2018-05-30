new Vue({
    el: '#app',
    data: {
        msg: {},
        levelLeft: 0, //左边的
        levelRight: 0, //右边的
        show: true,
        // dengji: 9, //假数据
        // level: 0, //假数据
        // exp: 270,//假数据
        // exp_up:271//假数据
    },
    created() {
        this.getExpert();

    },
    mounted() {

    },
    methods: {
        getExpert: function () {
            var _this = this;
            // 获取url的方法
            function getQueryString(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            }
            var member_Id = getQueryString("member_id");
            console.log(member_Id);
            $.ajax({
                type: 'get',
                // url: baseUrl + '/v1/member/info?time=123&sign=ABC&target_member_id=1000',
                url: baseUrl + '/v1/member/info?target_member_id=' + member_Id,
                beforeSend: function () {
                    $("#loading").show();
                },
                complete: function () {
                    $("#loading").hide();
                },
                success: function (res) {
                    console.log(res.data);
                    // 等级
                    _this.level = res.data.level;
                    if (_this.level >= 1) {
                        console.log('哈哈哈哈');
                        _this.show = false;
                    }
                    if (_this.level >= _this.level) {
                        console.log('嘿嘿嘿嘿');
                        _this.show = false;
                        _this.levelLeft = res.data.level - 1;
                        _this.levelRight = res.data.level + 1;
                    }


                    /* 假数据的判断 */

                    // if (_this.dengji == 1) {
                    //     console.log('哈哈哈哈');
                    //     _this.show = false;
                    // }
                    // console.log(res.data.level)
                    // if (_this.dengji) {
                    //     console.log('嘿嘿嘿嘿');
                    //     _this.levelLeft = _this.dengji - 1;
                    //     _this.levelRight = _this.dengji + 1;
                    // }

                    // 进度条
                    // 申明变量.负值
                    _this.exp = res.data.exp;
                    _this.exp_up = res.data.exp_up;

                    _this.exp >= _this.exp_up ? _this.$refs.state_propress_div.style.width = 0 + '%' : _this.$refs.state_propress_div.style.width = (_this.exp / _this.exp_up * 100) + '%';

                    // 把数据负值给定义的msg
                    _this.msg = res.data;

                },

                error: function (err) {
                    console.log(err);
                    console.log('失败');
                }
            })
        }
    }
})