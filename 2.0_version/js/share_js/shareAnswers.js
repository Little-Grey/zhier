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
            $.ajax({
                type:'get',
                url:baseUrl + '/v1/article/question?article_id=1642',
                success:function(res){
                    console.log(res.data);
                    _this.msg = res.data;
                },
                error:function(err){
                    console.log(err)
                }
            })
        }
    }
})