new Vue({
    el: '#app',
    data: {
        msg: {}
    },
    created() {
        this.getPo();
    },
    methods: {
        getPo: function () {
            var _this = this;
            $.ajax({
                type: 'get',
                url: baseUrl + '/v1/article/po?article_id=1641',
                success: function (res) {
                    console.log(res);
                    _this.msg = res.data;
                },
                error: function (err) {
                    console.log(err);
                }
            })
        }
    }
})