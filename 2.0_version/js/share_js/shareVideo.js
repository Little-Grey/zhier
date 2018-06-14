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
                // 1742
                type: 'get',
                url: url,
                success: function (res) {
                    // MzThki1eMrg2O0O0O0O0O0O1
                    if (isNumber(article_id)) {
                        // console.log('V1接口')
                        _this.msg = res.data;
                        // 渲染标题
                        $('title').text(res.data.title);

                        var desc = res.data.share.desc;
                        var image = res.data.share.image;
                        var link = res.data.share.link;
                        var title = res.data.share.title;
                        // 判断是不是在微信里面
                        if (navigator.userAgent.match(/MicroMessenger/i)) {
                            // 调用ajax,调取微信的接口
                            $.ajax({
                                type: 'get',
                                url: weiXinUrl + '/wechat/v1/config?url=' + window.location.href,
                                success: function (res) {
                                    setShareInfo({
                                        title: title,
                                        summary: desc,
                                        pic: image,
                                        url: link, // 分享链接'
                                        WXconfig: {
                                            swapTitleInWX: true,
                                            appId: res.data.appid,
                                            timestamp: res.data.timestamp,
                                            nonceStr: res.data.noncestr,
                                            signature: res.data.signature
                                        }
                                    });
                                     // 隐藏按钮
                                     wx.ready(function () {
                                        wx.hideMenuItems({
                                            menuList: ['menuItem:share:qq',
                                                'menuItem:share:weiboApp',
                                                'menuItem:favorite',
                                                'menuItem:share:facebook',
                                                '/menuItem:share:QZone'
                                            ], // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
                                            success: function (res) {
                                                //alert("隐藏");
                                            }
                                        });
                                    });
                                },
                                error: function (err) {
                                    console.log(err);
                                }
                            })
                        }
                    } else {
                        // 渲染标题
                        $('title').text(res.data.title);
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
                                    'desc': res.data.share.desc,
                                    'image': res.data.share.image,
                                    'link': res.data.share.link,
                                    'title01': res.data.share.title
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
                                'cover': obj01.data.member.cover,
                                'desc': obj01.data.member.desc,
                                'image': obj01.data.member.image,
                                'link': obj01.data.member.link,
                                'title01': obj01.data.member.title01
                            }
                        }
                        // console.log(obj01)
                        // console.log(obj02)
                        _this.msg = obj02.data;

                        var desc = obj02.data.desc;
                        var image = obj02.data.image;
                        var link = obj02.data.link;
                        var title02 = obj02.data.title01;

                        // 判断是不是在微信里面
                        if (navigator.userAgent.match(/MicroMessenger/i)) {
                            // 调用ajax,调取微信的接口
                            $.ajax({
                                type: 'get',
                                url: weiXinUrl + '/wechat/v1/config?url=' + window.location.href,
                                success: function (res) {
                                    setShareInfo({
                                        title: title,
                                        summary: desc,
                                        pic: image,
                                        url: link, // 分享链接'
                                        WXconfig: {
                                            swapTitleInWX: true,
                                            appId: res.data.appid,
                                            timestamp: res.data.timestamp,
                                            nonceStr: res.data.noncestr,
                                            signature: res.data.signature
                                        }
                                    });
                                     // 隐藏按钮
                                     wx.ready(function () {
                                        wx.hideMenuItems({
                                            menuList: ['menuItem:share:qq',
                                                'menuItem:share:weiboApp',
                                                'menuItem:favorite',
                                                'menuItem:share:facebook',
                                                '/menuItem:share:QZone'
                                            ], // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
                                            success: function (res) {
                                                //alert("隐藏");
                                            }
                                        });
                                    });
                                },
                                error: function (err) {
                                    console.log(err + '错误');
                                }
                            })
                        }
                    }
                },
                error: function (err) {
                    console.log(err)
                }
            })

        }
    }
})
// ¥.ajax({