new Vue({
    el: '#app',
    data: {
        msg: {},
        name:{},//品牌的名称
        time: true, //计时
        count: false, //数量
        over: false, //结束
        // time_s: '', //时间
        sumCurrency: '', //兑换的总知币数量
        remaining: '', //剩余数量,把接口数据拿过来
        // ------------假数据
        ssssss: 0, //剩余数量
        counts: 0,
        currency: 900, //所需要的知币
        xianyou: 901, //现有的知币
        qwe: {
            0: '../../images/222.jpeg',
            1: '../../images/333.jpeg',
            2: '../../images/444.jpeg',
            3: '../../images/555.jpeg',
            4: '../../images/666.jpeg',
            5: '../../images/timg (1).jpeg',
            6: '../../images/timg.jpeg'
        }

    },
    mounted() {
        this.getExchange();
        // this.countee()  
    },
    methods: {
        // 倒计时插件
        myTime: function (times) {
            var _this = this;

            var timer = null;
            timer = setInterval(function () {
                var day = 0,
                    hour = 0,
                    minute = 0,
                    second = 0; //时间默认值
                if (times > 0) {
                    // day = Math.floor(times / (60 * 60 * 24));
                    // hour = Math.floor(times / (60 * 60)) - (day * 24);
                    // minute = Math.floor(times / 60) - (day * 24 * 60) - (hour * 60);
                    // second = Math.floor(times) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
                    var day = parseInt(times / 60 / 60 / 24, 10); //计算剩余的天数 
                    var hour = parseInt(times / 60 / 60 % 24, 10); //计算剩余的小时 
                    var minute = parseInt(times / 60 % 60, 10); //计算剩余的分钟 
                    var second = parseInt(times % 60, 10); //计算剩余的秒数
                }
                if (day <= 9) day = '0' + day;
                if (hour <= 9) hour = '0' + hour;
                if (minute <= 9) minute = '0' + minute;
                if (second <= 9) second = '0' + second;

                // console.log(day + ":" + hour + "：" + minute + "：" + second);
                $('.time_p').html(day + ":" + hour + ":" + minute + ":" + second);
                times--;
                // console.log(times)
                if (times <= -1) {
                    clearInterval(timer);
                    console.log('清除定时器');
                    _this.time = false;
                    // 判断,如果当库存小于或等于0,显示数量就隐藏,然后结束样式出来,否则:数量样式出来.
                    if (_this.remaining <= 0) {
                        _this.count = false;//数量隐藏
                        _this.over = true; //结束样式出来
                    } else {
                        _this.count = true; //数量样式出来
                    }
                    console.log(_this.remaining)
                }
            }, 1000);
            // if (times <= -1) {
            //     console.log(1);
            //     clearInterval(timer);
            // }

        },
        // 页面渲染的数据
        getExchange: function () {
            let _this = this;
            $.ajax({
                type: 'get',
                url: baseUrl + '/v3/trial?trial_id=MzThAiO0O0Oe',
                success: function (res) {
                    //  把结束时间减去当前时间
                    var ss = res.data.end_time - res.data.start_time;
                    // console.log(res.data.end_time - res.data.start_time)
                    // var a= 4;
                    // if (a <= 0) {
                    if (ss <= 0) {
                        console.log('倒计时为0');
                        _this.time = false;
                    }
                    // 调用倒计时插件
                    _this.myTime(ss);

                    // 把总知币赋值给sumCurrency这个data里变量
                    // _this.sumCurrency = res.data.currency;
                    //把当前库存stock给这个remaining变量
                    _this.remaining = res.data.stock - res.data.member_num;
                    // 产品名称
                    _this.name = res.data.brand.name;

                    _this.msg = res.data;
                    // 判断当前状态,如果none就return出去,如果wait,就系申请成功
                    if (res.data.enroll.status == 'NONE') {
                        return;
                    }
                    if (res.data.enroll.status == 'WAIT') {
                        _this.click = false; //立即申请
                        _this.succeed = true; //兑换成功
                    }
                },
                error: function (err) {
                    console.log(err + '失败')
                }
            })
        },
        // 初始轮播图
        swiper1() {
            var mySwiper = new Swiper('.swiper-container', {
                direction: 'horizontal', //横向切换
                loop: true,
                pagination: {
                    el: '.swiper-pagination',
                    type: 'fraction' //小圆点的类型
                },
                observer: true, //修改swiper自己或子元素时，自动初始化swiper
                observeParents: true, //修改swiper的父元素时，自动初始化swiper
            })
        },
        // 点击立即申请(不需要,点击只需要跳转下载页面)
        // succeedClick() {
        //     let _this = this;
        //     // 假数据
        //     // if(_this.xianyou >= _this.currency){
        //     //     console.log(1)
        //     //     _this.click = false;
        //     //     _this.succeed = true;
        //     // }else{
        //     //     console.log('当前知币不够900')
        //     // }
        //     // console.log(_this.sumCurrency)
        //     $.ajax({
        //         type: 'get',
        //         url: baseUrl + '/v3//member/info?member_id=MzThUizeNrg2O0O0O0O0O0O1',
        //         success: function (res) {
        //             // console.log(res.data);
        //             // console.log(res.data.currency + '当前的知币');
        //             // console.log(_this.sumCurrency + '总知币');
        //             if (res.data.currency >= _this.sumCurrency) {
        //                 // console.log(1)
        //                 _this.click = false; //立即申请
        //                 _this.succeed = true; //兑换成功
        //             } else {
        //                 console.log('当前知币不够900')
        //             }
        //         },
        //         error: function (err) {
        //             console.log(err + '失败')
        //         }
        //     })
        // }
    },
    // updated,当重新渲染之后,这个函数就会执行
    updated() {
        this.swiper1();
    },
})