new Vue({
    el: '#app',
    data: {
        msg: {},
        info: '申请达人',
        is: true,
        isColro: false,
        android: '',
        iphone: '',
    },
    created() {
        this.getId();

    },
    mounted() {
        // window.getId = this.getId;

        // 判断移动端是安卓还是ios
        // var u = navigator.userAgent;
        // if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) { //安卓手机
        //     console.log("安卓手机");
        //     this.android = 1;
        // } else if (u.indexOf('iPhone') > -1) { //苹果手机
        //     console.log("苹果手机");
        //     this.iphone = 2;
        // };

    },
    methods: {
        getId: function () {
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
            var url = '';
            // 判断传过来的id,是不是存数字,是纯数字,就执行第一个v1接口,不是纯数字,就是执行v3接口.
            if (isNumber(member_Id)) {
                // console.log('是纯数字');
                url = baseUrl + '/v1/member/info?target_member_id=' + member_Id;
            } else {
                // console.log('是字符串');
                url = baseUrl + '/v3/member/info?member_id=' + member_Id;
            };
            $.ajax({
                type: 'get',
                // url: baseUrl + '/v1/member/info?target_member_id=1000',
                // url: baseUrl + '/v1/member/info?target_member_id=' + member_Id,
                url: url,
                beforeSend: function () {
                    $("#loading").show();
                },
                complete: function () {
                    $("#loading").hide();
                },
                success: function (res) {
                    // console.log(res.code);
                    // 状态码,判断状态吗,如果等于他,就返回消息给安卓
                    if (res.code == 21005) {
                        var inpObj = 'TOKEN_ERROR';
                        inpObj = inpObj + "";
                        console.log(inpObj)
                        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                            window.webkit.messageHandlers["Native"].postMessage(inpObj);
                        } else {
                            // 安卓传输不了js json对象
                            // console.log(inpObj)
                            window.android.get(inpObj); //安卓方法
                        }
                    }

                    if (res.data.master == 'NONE') {
                        // console.log('none')
                        return;
                    };

                    if (res.data.master == 'REVIEW') {
                        _this.info = '审核中';
                        _this.isColro = true;
                    };
                    if (res.data.master == 'COMMON' || res.data.master == 'OFFICIAL') {
                        window.location.href = "becomeExpert.html?member_id=" + member_Id;
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
                    if (res.data.master == 'REVIEW') {
                        _this.info = '审核中';
                        _this.isColro = true;
                    };
                    // 存储数据
                },
                error: function (err) {
                    console.log(err);
                }
            })
        },
        // 安卓——ios调用方法
        myFunction_inforMation() {
            var inpObj = $('.info_gl>p>input').attr("data-id");
            inpObj = inpObj + "";
            if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                window.webkit.messageHandlers["Native"].postMessage(inpObj);
            } else {
                // 安卓传输不了js json对象
                console.log(inpObj)
                window.android.get(inpObj); //安卓方法
            }
        },
        myFunction_strategy() {
            var inpObj = $('.strategy_gl>p>input').attr("data-id");
            inpObj = inpObj + "";
            // window.android.get(inpObj);
            if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                window.webkit.messageHandlers["Native"].postMessage(inpObj);
            } else {
                //安卓传输不了js json对象
                console.log(inpObj)
                window.android.get(inpObj); //安卓方法
            }
        },
        myFunction_lesson() {
            var inpObj = $('.lesson_gl>p>input').attr("data-id");
            inpObj = inpObj + "";
            // window.android.get(inpObj);
            if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                window.webkit.messageHandlers["Native"].postMessage(inpObj);
            } else {
                //安卓传输不了js json对象
                console.log(inpObj)
                window.android.get(inpObj); //安卓方法
            }
        },
        myFunction_stroll() {
            var inpObj = $('.stroll_gl>p>input').attr("data-id");
            inpObj = inpObj + "";
            // window.android.get(inpObj);
            if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                window.webkit.messageHandlers["Native"].postMessage(inpObj);
            } else {
                //安卓传输不了js json对象
                console.log(inpObj)
                window.android.get(inpObj); //安卓方法
            }
        }
    }
})