"use strict";new Vue({el:"#app",data:{msg:{},products:{},isShow:!0},created:function(){this.getGk()},methods:{getGk:function(){function e(e){var a=/^\d+(\.\d+)?$/,t=/^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/;return!(!a.test(e)&&!t.test(e))}function a(e){var a=new RegExp("(^|&)"+e+"=([^&]*)(&|$)","i"),t=window.location.search.substr(1).match(a);return null!=t?unescape(t[2]):null}var t=this,n=a("article_id"),m="";m=e(n)?baseUrl+"/v1/article/diary?article_id="+n:baseUrl+"/v3/article_diary?article_id="+n,$.ajax({type:"get",url:m,success:function(a){if(e(n)){t.msg=a.data,t.products=a.data.product[0],$("title").text(a.data.title);var m=a.data.share.desc,r=a.data.share.image,i=a.data.share.link,s=a.data.share.title;navigator.userAgent.match(/MicroMessenger/i)&&$.ajax({type:"get",url:weiXinUrl+"/wechat/v1/config?url="+window.location.href,success:function(e){setShareInfo({title:s,summary:m,pic:r,url:i,WXconfig:{swapTitleInWX:!0,appId:e.data.appid,timestamp:e.data.timestamp,nonceStr:e.data.noncestr,signature:e.data.signature}}),wx.ready(function(){wx.hideMenuItems({menuList:["menuItem:share:qq","menuItem:share:weiboApp","menuItem:favorite","menuItem:share:facebook","/menuItem:share:QZone"],success:function(e){}})})},error:function(e){console.log(e)}})}else{$("title").text(a.data.title);var c={data:{member:{member_nickname:a.data.member.nickname,member_avatar:a.data.member.avatar,age:a.data.age,skin_color:a.data.skin_color,skin_type:a.data.skin_type,city_area_name:a.data.city_area_name,title:a.data.title,category_name:a.data.product[0],comment_num:a.data.comment_num,view_num:a.data.view_num,like_num:a.data.like_num,desc:a.data.share.desc,image:a.data.share.image,link:a.data.share.link,title01:a.data.share.title}}},d={data:{member_nickname:c.data.member.member_nickname,member_avatar:c.data.member.member_avatar,age:c.data.member.age,skin_color:c.data.member.skin_color,skin_type:c.data.member.skin_type,city_area_name:c.data.member.city_area_name,title:c.data.member.title,category_name:c.data.member.category_name,comment_num:c.data.member.comment_num,view_num:c.data.member.view_num,like_num:c.data.member.like_num,desc:c.data.member.desc,image:c.data.member.image,link:c.data.member.link,title01:c.data.member.title01}};t.msg=d.data,t.products=d.data.category_name;var m=d.data.desc,r=d.data.image,i=d.data.link;d.data.title01;navigator.userAgent.match(/MicroMessenger/i)&&$.ajax({type:"get",url:weiXinUrl+"/wechat/v1/config?url="+window.location.href,success:function(e){setShareInfo({title:s,summary:m,pic:r,url:i,WXconfig:{swapTitleInWX:!0,appId:e.data.appid,timestamp:e.data.timestamp,nonceStr:e.data.noncestr,signature:e.data.signature}}),wx.ready(function(){wx.hideMenuItems({menuList:["menuItem:share:qq","menuItem:share:weiboApp","menuItem:favorite","menuItem:share:facebook","/menuItem:share:QZone"],success:function(e){}})})},error:function(e){console.log(e+"错误")}})}},error:function(e){console.log(e)}})}}});