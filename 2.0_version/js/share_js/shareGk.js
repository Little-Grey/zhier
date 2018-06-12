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
                    // 第一个接口
                    var obj01 = {
                        data: {

                        }
                    }

                    // 判断id的类型,然后把数据结构转换
                    if (isNumber(article_id)) {
                        // console.log(V1接口);
                        // V1接口
                        _this.msg = res.data;
                        _this.products = res.data.product[0];
                    } else { 
                        // 第二个接口
                        var obj02 = {
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
                                    'title' : res.data.title
                                }
                            }
                        }
                        // 自己自定义的对象
                        var obj03 = {
                            data: {
                                'member_nickname': obj02.data.member.member_nickname,
                                'member_avatar': obj02.data.member.member_avatar,
                                'age': obj02.data.member.age,
                                'skin_color': obj02.data.member.skin_color,
                                'skin_type': obj02.data.member.skin_type,
                                'city_area_name': obj02.data.member.city_area_name,
                                'title' : obj02.data.member.title
                            }
                        }
                        // console.log(V3接口);    
                        // console.log(res.data);
                        // _this.msg = res.data;
                        // _this.products = res.data.product[0];
                        _this.msg = obj03.data;
                        _this.products = res.data.product[0];
                        // console.log(obj03.data)
                    }


                },
                error: function (err) {
                    console.log(err)
                }
            })
        }
    }
})