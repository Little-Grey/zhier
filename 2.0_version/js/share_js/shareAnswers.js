new Vue({
    el:'#app',
    data:{
        msg:{}
    },
    created () {
      this.getAnswers();  
    },
    methods:{
        getAnswers:function(){
            var _this=this;
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
                url = baseUrl + '/v1/article/question?article_id='+article_id;
            } else {
                // console.log('是字符串');
                url = baseUrl + '/v3/article/article_question='+article_id;
            };
            $.ajax({
                type:'get',
                // url:baseUrl + '/v1/article/question?article_id='+article_id,
                // url:baseUrl + '/v1/article/question?article_id=1642',
                url:url,
                success:function(res){
                    // console.log(res.data);
                    _this.msg = res.data;
                },
                error:function(err){
                    console.log(err)
                }
            })
        }
    }
})