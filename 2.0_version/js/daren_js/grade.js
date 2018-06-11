new Vue({
    el: '#app',
    data: {
        msg: {},
        levelLeft: 0, //左边的
        levelRight: 0, //右边的
        show: true,
        // dengji: 3, //假数据
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
            // 判断string字符串里面,是不是纯数字
            function isNumber(val) {
                var regPos = /^\d+(\.\d+)?$/; //非负浮点数
                var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
                if (regPos.test(val) || regNeg.test(val)) {
                    return true;
                } else {
                    return false;
                }
            };
            // 获取url的方法
            function getQueryString(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            }
            var member_Id = getQueryString("member_id");
            // 判断传过来的id,是不是存数字,是纯数字,就执行第一个v1接口,不是纯数字,就是执行v3接口.
            if (isNumber(member_Id)) {
                // console.log('是纯数字');
                url = baseUrl + '/v1/member/info?target_member_id=' + member_Id;
            } else {
                // console.log('是字符串');
                url = baseUrl + '/v3/member/info?member_id' + member_Id;
            };

            $.ajax({
                type: 'get',
                // url: baseUrl + '/v3/member/info?target_member_id=' + member_Id,
                url: url,
                beforeSend: function () {
                    $("#loading").show();
                },
                complete: function () {
                    $("#loading").hide();
                },
                success: function (res) {
                    // console.log(res.data);
                    // console.log(res.data.level)
                    // 等级
                    _this.level = res.data.level;
                    if (_this.level == 1) {
                        // console.log('哈哈哈哈');
                        _this.show = false;
                    }
                    if (_this.level) {
                        // console.log('嘿嘿嘿嘿');
                        // _this.show = true;
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

                    // _this.exp >= _this.exp_up ? _this.$refs.state_propress_div.style.width = 0 + '%' : _this.$refs.state_propress_div.style.width = (_this.exp / _this.exp_up * 100) + '%';
                    // (当前得经验/(当前经验+距离升级需要得经验)*100)+'%'
                    _this.exp == 0 ? _this.$refs.state_propress_div.style.width = 0 + '%' : _this.$refs.state_propress_div.style.width = (_this.exp / (_this.exp + _this.exp_up) * 100) + '%';

                    // _this.exp >= _this.exp_up ? _this.$refs.state_propress_div.style.width = 0 + '%' : _this.$refs.state_propress_div.style.width = (_this.exp + _this.exp_up )* 100 + '%';

                    // exp / (exp+exp_up) * 100 %

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