new Vue({
    el: '#app',
    data: {
        msg: {},
        products:{},
        isShow:true,
        // fenshu:10,//评分假数据
        // list:[//图片假数据
        //     '../../images/share_img/timg.jpeg',
        //     '../../images/share_img/111.jpeg',
        //     '../../images/share_img/222.jpeg',
        //     '../../images/share_img/333.jpeg',
        //     '../../images/share_img/444.jpeg',
        //     '../../images/share_img/555.jpeg',
        //     '../../images/share_img/333.jpeg',
        //     '../../images/share_img/444.jpeg',
        //     '../../images/share_img/555.jpeg'
        // ]
    },
    created() {
        this.getGk();
    },
    methods: {
        getGk: function () {
            var _this = this;
            $.ajax({
                type: 'get',
                url: baseUrl + '/v1/article/diary?article_id=1677&category_id=38',
                success: function (res) {
                    // console.log(res.data);
                    _this.msg = res.data;
                    _this.products = res.data.product[0];
                },
                error: function (err) {
                    console.log(err)
                }
            })
        }
    }
})