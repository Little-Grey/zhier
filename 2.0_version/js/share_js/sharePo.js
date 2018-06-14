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
                url = baseUrl + '/v1/article/po?article_id=' + article_id;
            } else {
                // console.log('是字符串');
                url = baseUrl + '/v3/article_po?article_id=' + article_id;
            };
            $.ajax({
                type: 'get',
                // url: baseUrl + '/v1/article/po?article_id=' + article_id,
                url:url,
                // url: baseUrl + '/v1/article/po?article_id=1641',
                success: function (res) {
                    if(isNumber(article_id)){
                        console.log('v1接口')
                        _this.msg = res.data;
                    }else{
                        console.log('v3接口')
                        var obj01 = {
                            data : {
                                member : {
                                    'member_avatar' : res.data.member.avatar,
                                    'member_nickname' : res.data.member.nickname,
                                    'image' : res.data.image,
                                    'content' : res.data.content,
                                    'collection_num' : res.data.comment_num,
                                    'view_num' : res.data.view_num,
                                    'like_num' : res.data.like_num
                                }
                            }
                        }
                        var obj02 = {
                            data : {
                                'member_avatar' : obj01.data.member.member_avatar,
                                'member_nickname' : obj01.data.member.member_nickname,
                                'image' : obj01.data.member.image,
                                'content' : obj01.data.member.content,
                                'collection_num' : obj01.data.member.collection_num,
                                'view_num' : obj01.data.member.view_num,
                                'like_num' : obj01.data.member.like_num
                            }
                        }
                        console.log(obj01)
                        console.log(obj02)
                        _this.msg = obj02.data;
                    }
                },
                error: function (err) {
                    console.log(err);
                }
            })
        }
    }
})