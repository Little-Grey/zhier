new Vue({
    el: '#app',
    data: {
        msg: {},
        products: {},
        isShow: true,
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
        // 判断是不是再微信里面
        // if (navigator.userAgent.match(/MicroMessenger/i)) {
            // this.share();
        // }
    },
    methods: {
        getGk: function () {
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
                url = baseUrl + '/v1/article/diary?article_id=' + article_id;
            } else {
                // console.log('是字符串');
                url = baseUrl + '/v3/article_diary?article_id=' + article_id;
            };
            $.ajax({
                type: 'get',
                // url: baseUrl + '/v1/article/diary?article_id='+article_id,
                url: url,
                // url: baseUrl + '/v1/article/diary?article_id=1677',
                success: function (res) {
                    // // console.log(res.data);
                    // _this.msg = res.data;
                    // _this.products = res.data.product[0];

                    // 判断id的类型,然后把数据结构转换
                    if (isNumber(article_id)) {
                        // console.log(V1接口);
                        // V1接口
                        _this.msg = res.data;
                        _this.products = res.data.product[0];

                        console.log(res.data);
                        _this.share(); 
                        // console.log(res.data.share.desc);
                        // console.log(res.data.share.image);
                        // console.log(res.data.share.link);
                        // console.log(res.data.share.title);

                    } else {
                        // 第二个接口
                        var obj01 = {
                            data: {
                                'member': {
                                    // 名称
                                    'member_nickname': res.data.member.nickname,
                                    // 头像
                                    'member_avatar': res.data.member.avatar,
                                    // 年龄
                                    'age': res.data.age,
                                    // 皮肤
                                    'skin_color': res.data.skin_color,
                                    // 皮肤
                                    'skin_type': res.data.skin_type,
                                    // 皮肤
                                    'city_area_name': res.data.city_area_name,
                                    // 标题
                                    'title': res.data.title,
                                    'category_name': res.data.product[0],
                                    'comment_num': res.data.comment_num,
                                    'view_num': res.data.view_num,
                                    'like_num': res.data.like_num
                                }
                            }
                        }
                        // 自己自定义的对象
                        var obj02 = {
                            data: {
                                'member_nickname': obj01.data.member.member_nickname,
                                'member_avatar': obj01.data.member.member_avatar,
                                'age': obj01.data.member.age,
                                'skin_color': obj01.data.member.skin_color,
                                'skin_type': obj01.data.member.skin_type,
                                'city_area_name': obj01.data.member.city_area_name,
                                'title': obj01.data.member.title,
                                'category_name': obj01.data.member.category_name, //这里面有数组
                                'comment_num': obj01.data.member.comment_num,
                                'view_num': obj01.data.member.view_num,
                                'like_num': obj01.data.member.like_num
                            }
                        }
                        // console.log(obj01)
                        // console.log(obj02)
                        // console.log(V3接口);    
                        _this.msg = obj02.data;
                        _this.products = obj02.data.category_name;

                        // _this.share(); 
                    }


                },
                error: function (err) {
                    console.log(err)
                }
            })
        },
        // 在微信里面二次分享
        share: function () {
            $.ajax({
                type: 'get',
                url: weiXinUrl + '/wechat/v1/config?url=' + window.location.href,
                success: function (res) {
                    console.log(res.data)
                    console.log(111);
                    setShareInfo({
                        title: res.data.share.title,
                        summary: res.data.share.desc,
                        pic: res.data.share.image,//分享图片
                        url: res.data.share.link, // 分享链接'
                        WXconfig: {
                            swapTitleInWX: true,
                            appId: res.data.appid,
                            timestamp: res.data.timestamp,
                            nonceStr: res.data.noncestr,
                            signature: res.data.signature
                        }
                    });
                },
                error: function (err) {
                    console.log(err);
                }
            })
        }
    }
})