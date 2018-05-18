new Vue({
    el:'#app',
    data:{
        msg:{}
    },
    created () {
        this.getExpert();
    },
    methods: {
        getExpert:function(){
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
                    console.log('失败');
                }
            })
        }
    }
})