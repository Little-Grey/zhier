new Vue({
    el: '#app',
    data: {
        msg: {},
        time: true, //计时
        count: false, //数量
        over: false, //结束
        // ------------假数据
        counts: 10,
    },
    created() {
        this.my(6);
        // this.countee()
    },
    methods: {
        // 倒计时插件
        my: function (times) {
            var _this = this;

            var timer = null;
            timer = setInterval(function () {
                var day = 0,
                    hour = 0,
                    minute = 0,
                    second = 0; //时间默认值
                if (times > 0) {
                    day = Math.floor(times / (60 * 60 * 24));
                    hour = Math.floor(times / (60 * 60)) - (day * 24);
                    minute = Math.floor(times / 60) - (day * 24 * 60) - (hour * 60);
                    second = Math.floor(times) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
                }
                if (day <= 9) day = '0' + day;
                if (hour <= 9) hour = '0' + hour;
                if (minute <= 9) minute = '0' + minute;
                if (second <= 9) second = '0' + second;

                // console.log(day + ":" + hour + "：" + minute + "：" + second);
                $('.time_p').html(day + ":" + hour + ":" + minute + ":" + second);
                times--;
                console.log(times)
                if (times <= -1) {
                    clearInterval(timer);
                    console.log('清除定时器');
                    _this.time = false;
                    if(_this.counts <= 0){
                        _this.count = false;
                        console.log(_this.count);
                        _this.over = true;//结束样式出来
                    }else{
                        _this.count = true;//数量样式出来
                    }
                }
            }, 1000);
            // if (times <= -1) {
            //     console.log(1);
            //     clearInterval(timer);
            // }
            
        },

        // 假数据,点击上面的数据减一
        // btn1(){
        //     var _this = this;
        //     _this.counts = _this.counts--;
        //     console.log(_this.counts--);
        // }
    }
})