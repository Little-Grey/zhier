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
            // console.log(_this);
            $.ajax({
                type: 'get',
                // baseUrl-接口在common.js
                url: baseUrl + '/v1/member/info?time=123&sign=ABC&target_member_id=1000',
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