new Vue({
    el: '#app',
    data: {
        msg: {},
        info: '申请达人',
        is: true,
        isColro: false
    },
    created() {
        this.getId();
    },
    methods: {
        getId: function () {
            // 获取url的方法
            function getQueryString(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            }
            // console.log(getQueryString("id"));

            var member_Id = getQueryString("id");
            console.log(member_Id);
            var _this = this;
            $.ajax({
                type: 'get',
                // url: baseUrl + '/v1/member/info?target_member_id=1000',
                url: baseUrl + '/v1/member/info?target_member_id=' + member_Id,
                beforeSend: function () {
                    $("#loading").show();
                },
                complete: function () {
                    $("#loading").hide();
                },
                success: function (res) {
                    console.log(res.data);
                    // 获取存储的数据去判断
                    var objective = localStorage.getItem('target');

                    if (res.data.master == 'NONE') {
                        console.log('none')
                        return;
                    };
                    if (localStorage.target === objective) {
                        // console.log('我是有localStorage的')
                        if (res.data.master == 'REVIEW') {
                            _this.info = '审核中';
                            _this.isColro = true;
                        }
                    } ;
                    if (res.data.master == 'COMMON' || res.data.master == 'OFFICIAL') {
                        window.location.href = "becomeExpert.html";
                    };
                    // 把数据负值给data的定义的空对象
                    _this.msg = res.data;
                },
                error: function (err) {
                    console.log(err);
                    console.log('失败')
                }
            })
        },
        getExpert() {
            var _this = this;
            $.ajax({
                type: 'post',
                url: baseUrl + '/v2/member_master',
                success: function (res) {
                    // 跟换内容
                    _this.info = '审核中';
                    // 动态添加一个类,添加颜色;
                    _this.isColro = true;

                    // 存储数据
                    window.localStorage.setItem('target', '120');
                    var local = window.localStorage.getItem('target');
                    var locals = JSON.parse(local);

                },
                error: function (err) {
                    console.log(err);
                }
            })
        },
        // 安卓调用方法
        myFunction() {
            var inpObj = $('.info_gl>p>a').attr("data-id");
            inpObj = inpObj + "";
            console.log(inpObj);
            window.android.get(inpObj);
        }
    }
})