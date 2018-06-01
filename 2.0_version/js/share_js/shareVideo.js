new Vue({
    el: '#app',
    data: {
        msg: {}
    },
    created() {
        this.getVideo();
    },
    methods: {
        getVideo: function () {
            var _this = this;
            $.ajax({
                type: 'get',
                url: baseUrl + '/v1/article/video?article_id=1742',
                success: function (res) {
                    console.log(res);
                    _this.msg = res.data;
                },
                error: function (err) {
                    console.log(err)
                }
            })
        }
    }
})