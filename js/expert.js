new Vue({
    el:'#app',
    data:{
        msg:{},
        info:'申请达人',
        is:true,
        isColro:false
    },
    created () {
        this.getId();
    },
    methods: {
        getId:function(){
            var _this = this;
            $.ajax({
                type:'get',
                url:baseUrl + '/v1/member/info?time=123&sign=ABC&target_member_id=1000',
                success:function(res){
                    console.log(res.data);
                    _this.msg = res.data;
                },
                error:function(err){
                    console.log(err);
                    console.log('失败')
                }
            })
        },
        clickApply(){
            var _this = this;
            _this.info = '审核中';
            // 动态添加一个类,添加颜色;
            _this.isColro = true;
        }
    }
})