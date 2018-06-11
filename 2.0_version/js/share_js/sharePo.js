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
            // 获取url的方法
            function getQueryString(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            }

            var article_id = getQueryString("article_id");
            var _this = this;
            $.ajax({
                type: 'get',
                url: baseUrl + '/v1/article/po?article_id='+article_id,
                // url: baseUrl + '/v1/article/po?article_id=1641',
                success: function (res) {
                    // console.log(res);
                    _this.msg = res.data;
                },
                error: function (err) {
                    console.log(err);
                }
            })
        }
    }
})