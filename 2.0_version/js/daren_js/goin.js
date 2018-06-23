new Vue({
    el: '#app',
    data: {
        msg: {},
        mmm: 'hhhhhh哈哈哈'
    },
    created() {
        this.getUsers()
    },
    methods: {
        getUsers: function () {
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
            var member_id = getQueryString("member_id");
            // var target_member_id = getQueryString("target_member_id");
            var url = '';
            // 判断传过来的id,是不是存数字,是纯数字,就执行第一个v1接口,不是纯数字,就是执行v3接口.
            if (isNumber(member_id)) {
                console.log('是纯数字');
                url = baseUrl + '/v1/member/info?target_member_id=' + member_id;
            } else {
                console.log('是字符串');
                url = baseUrl + '/v3/member/info?member_id=' + member_id;
                // url = 'https://dev.api.zhiervip.com/app/v3/member/info?member_id=MzThUizeNrg2O0O0O0O0O0O1';
            };

            $.ajax({
                type: 'get',
                // url: baseUrl + '/v1/member/info?target_member_id=' + member_Id,
                url:url,
                beforeSend: function () {
                    $("#loading").show();
                },
                complete: function () {
                    $("#loading").hide();
                },
                success: function (res) {
                    // console.log(res.data);

                    _this.msg = res.data;
                    // console.log(_this.msg);
                }
            })
        }
    }
})