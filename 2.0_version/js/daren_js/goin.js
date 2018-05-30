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
            // 获取url的方法
            function getQueryString(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            }
            var member_Id = getQueryString("member_id");

            $.ajax({
                type: 'get',
                url: baseUrl + '/v1/member/info?target_member_id=' + member_Id,
                beforeSend: function () {
                    $("#loading").show();
                },
                complete: function () {
                    $("#loading").hide();
                },
                success: function (res) {
                    console.log(res.data);

                    _this.msg = res.data;
                    console.log(_this.msg);
                }
            })
        }
    }
})