new Vue({
    el: '#app',
    data: {
        msg: {}
    },
    created() {
        this.getAnswers();
    },
    methods: {
        getAnswers: function () {
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
            var article_id = getQueryString("article_id");
            var url = '';
            // 判断传过来的id,是不是存数字,是纯数字,就执行第一个v1接口,不是纯数字,就是执行v3接口.
            if (isNumber(article_id)) {
                // console.log('是纯数字');
                url = baseUrl + '/v1/article/question?article_id=' + article_id;
            } else {
                // console.log('是字符串');
                url = baseUrl + '/v3/article_question?article_id=' + article_id;
                // url = 'https://dev.api.zhiervip.com/app/v3/article_question?article_id=MzThki1eMrQ2O0O0O0O0O0O1'
            };
            $.ajax({
                type: 'get',
                // url:baseUrl + '/v1/article/question?article_id=1642',
                url: url,
                success: function (res) {
                    // console.log(res.data);
                    if (isNumber(article_id)) {
                        // console.log('V1接口')
                        // console.log(res.data);
                        _this.msg = res.data;
                    } else {
                        // console.log('v3接口')
                        // console.log(res.data);
                        var obj01 = {
                            data: {
                                member: {
                                    'title': res.data.title,
                                    'member_nickname': res.data.member.nickname,
                                    'member_avatar': res.data.member.avatar,
                                    'content': res.data.content,
                                    'comment_num': res.data.comment_num,
                                    'view_num': res.data.view_num,
                                    'like_num': res.data.like_num,
                                }
                            }
                        }
                        var obj02 = {
                            data: {
                                'title': obj01.data.member.title,
                                'member_nickname': obj01.data.member.member_nickname,
                                'member_avatar': obj01.data.member.member_avatar,
                                'content': obj01.data.member.content,
                                'comment_num': obj01.data.member.comment_num,
                                'view_num': obj01.data.member.view_num,
                                'like_num': obj01.data.member.like_num,
                            }
                        }
                        // console.log(obj01)
                        // console.log(obj02)
                        _this.msg = obj02.data;
                    }
                },
                error: function (err) {
                    console.log(err)
                }
            })
        }
    }
})