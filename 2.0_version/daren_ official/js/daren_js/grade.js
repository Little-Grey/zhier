"use strict";new Vue({el:"#app",data:{msg:{},levelLeft:0,levelRight:0,show:!0},created:function(){this.getExpert()},mounted:function(){},methods:{getExpert:function(){function e(e){var t=/^\d+(\.\d+)?$/,l=/^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/;return!(!t.test(e)&&!l.test(e))}function t(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)","i"),l=window.location.search.substr(1).match(t);return null!=l?unescape(l[2]):null}var l=this,o=t("member_id"),n="";e(o)?(console.log("是纯数字"),n=baseUrl+"/v1/member/info?target_member_id="+o):(console.log("是字符串"),n=baseUrl+"/v3/member/info?member_id"+o),$.ajax({type:"get",url:n,beforeSend:function(){$("#loading").show()},complete:function(){$("#loading").hide()},success:function(e){l.level=e.data.level,1==l.level&&(l.show=!1),l.level&&(l.levelLeft=e.data.level-1,l.levelRight=e.data.level+1),l.exp=e.data.exp,l.exp_up=e.data.exp_up,0==l.exp?l.$refs.state_propress_div.style.width="0%":l.$refs.state_propress_div.style.width=l.exp/(l.exp+l.exp_up)*100+"%",l.msg=e.data},error:function(e){console.log(e),console.log("失败")}})}}});