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
                url = baseUrl + '/v1/article/video?article_id=' + article_id;
            } else {
                // console.log('是字符串');
                url = baseUrl + '/v3/article_video?article_id=' + article_id;
            };

            $.ajax({
                type: 'get',
                // url: baseUrl + '/v1/article/video?article_id='+article_id,
                url: url,
                // url: baseUrl + '/v1/article/video?article_id=1742',
                success: function (res) {
                    // console.log(res);
                    // MzThki1eMrg2O0O0O0O0O0O1
                    if (isNumber(article_id)) {
                        // console.log('V1接口')
                        _this.msg = res.data;
                        // console.log(res.data);
                    } else {
                        // console.log('v3接口');
                        // console.log(res.data);
                        var obj01 = {
                            data: {
                                member: {
                                    'member_nickname': res.data.member.nickname,
                                    'title': res.data.title,
                                    'duration': res.data.duration,
                                    'content': res.data.content,
                                    'view_num': res.data.view_num,
                                    'comment_num': res.data.comment_num,
                                    'like_num': res.data.like_num,
                                    'member_avatar': res.data.member.avatar,
                                    'cover': res.data.cover,
                                }
                            }
                        }
                        var obj02 = {
                            data: {
                                'member_nickname': obj01.data.member.nickname,
                                'title': obj01.data.member.title,
                                'duration': obj01.data.member.duration,
                                'content': obj01.data.member.content,
                                'view_num': obj01.data.member.view_num,
                                'comment_num': obj01.data.member.comment_num,
                                'like_num': obj01.data.member.like_num,
                                'member_avatar': obj01.data.member.member_avatar,
                                'cover': obj01.data.member.cover
                            }
                        }
                        // console.log(obj01)
                        // console.log(obj02)
                        _this.msg = obj02.data;
                        // _this.msg = res.data;
                    }
                },
                error: function (err) {
                    console.log(err)
                }
            })
        }
    }
})