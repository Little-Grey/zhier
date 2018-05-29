new Vue({
    el: '#app',
    data: {
        msg: {}
    },
    created() {
        this.getuser()
    },
    methods: {
        getuser: function () {
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
            // console.log(_this);
            $.ajax({
                type: 'get',
                // baseUrl-接口在common.js
                // url: baseUrl + '/v1/member/info?time=123&sign=ABC&target_member_id=1000',
                url: baseUrl + '/v1/member/info?target_member_id='+member_Id,
                beforeSend: function () {
                    $("#loading").show();
                },
                complete: function () {
                    $("#loading").hide();
                },
                success: function (res) {
                    _this.msg = res.data;
                },
                error: function (err) {
                    console.log(err);
                }
            })
        }
    }
})