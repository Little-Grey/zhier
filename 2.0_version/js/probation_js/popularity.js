new Vue({
    el: '#app',
    data: {
        msg: {},
        name: {},
        time: true, //计时
        count: false, //数量
        over: false, //结束
        // time_s: '', //时间
        sumCurrency: '', //兑换的总知币数量
        remaining: '', //剩余数量,把接口数据拿过来
        // ------------假数据
        counts: 10,
        ssssss: 1, //剩余数量
    },
    mounted() {
        // this.myTime(6);
        // this.countee()
        this.getPopularity();
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
                        _this.count = false; //数量隐藏
                        _this.over = true; //结束样式出来
                    } else {
                        _this.count = true; //数量样式出来
                    }
                }
            }, 1000);
        },
        // 页面渲染
        getPopularity: function () {
            let _this = this;
            $.ajax({
                type: 'get',
                url: baseUrl + '/v3/trial?trial_id=MzThAiO0O0Oe',
                success: function (res) {
                    //  把结束时间减去当前时间
                    var ss = res.data.end_time - res.data.start_time;
                    // var a = 4;
                    // if (a <= 0) {
                    if (ss <= 0) {
                        console.log('倒计时为0');
                        _this.time = false;
                    }
                    // 调用倒计时插件
                    _this.myTime(ss);

                    // 产品的名称
                    _this.name = res.data.brand.name;
                    //把当前库存stock给这个remaining变量
                    _this.remaining = res.data.stock - res.data.member_num;

                    _this.msg = res.data;
                    console.log(_this.msg)
                },
                error: function (err) {

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
        // 假数据,点击上面的数据减一
        // btn1(){
        //     var _this = this;
        //     _this.counts = _this.counts--;
        //     console.log(_this.counts--);
        // }
    },
    updated() {
        this.swiper1();
    }
})