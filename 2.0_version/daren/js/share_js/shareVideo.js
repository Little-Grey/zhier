"use strict";new Vue({el:"#app",data:{msg:{}},created:function(){this.getVideo()},methods:{getVideo:function(){function e(e){var a=/^\d+(\.\d+)?$/,t=/^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/;return!(!a.test(e)&&!t.test(e))}function a(e){var a=new RegExp("(^|&)"+e+"=([^&]*)(&|$)","i"),t=window.location.search.substr(1).match(a);return null!=t?unescape(t[2]):null}var t=this,n=a("article_id"),i="";i=e(n)?baseUrl+"/v1/article/video?article_id="+n:baseUrl+"/v3/article_video?article_id="+n,$.ajax({type:"get",url:i,success:function(a){if(e(n)){t.msg=a.data,$("title").text(a.data.title);var i=a.data.share.desc,m=a.data.share.image,r=a.data.share.link,s=a.data.share.title;navigator.userAgent.match(/MicroMessenger/i)&&$.ajax({type:"get",url:weiXinUrl+"/wechat/v1/config?url="+window.location.href,success:function(e){setShareInfo({title:s,summary:i,pic:m,url:r,WXconfig:{swapTitleInWX:!0,appId:e.data.appid,timestamp:e.data.timestamp,nonceStr:e.data.noncestr,signature:e.data.signature}}),wx.ready(function(){wx.hideMenuItems({menuList:["menuItem:share:qq","menuItem:share:weiboApp","menuItem:favorite","menuItem:share:facebook","/menuItem:share:QZone"],success:function(e){}})})},error:function(e){console.log(e)}})}else{$("title").text(a.data.title);var d={data:{member:{member_nickname:a.data.member.nickname,title:a.data.title,duration:a.data.duration,content:a.data.content,view_num:a.data.view_num,comment_num:a.data.comment_num,like_num:a.data.like_num,member_avatar:a.data.member.avatar,cover:a.data.cover,desc:a.data.share.desc,image:a.data.share.image,link:a.data.share.link,title01:a.data.share.title}}},c={data:{member_nickname:d.data.member.nickname,title:d.data.member.title,duration:d.data.member.duration,content:d.data.member.content,view_num:d.data.member.view_num,comment_num:d.data.member.comment_num,like_num:d.data.member.like_num,member_avatar:d.data.member.member_avatar,cover:d.data.member.cover,desc:d.data.member.desc,image:d.data.member.image,link:d.data.member.link,title01:d.data.member.title01}};t.msg=c.data;var i=c.data.desc,m=c.data.image,r=c.data.link;c.data.title01;navigator.userAgent.match(/MicroMessenger/i)&&$.ajax({type:"get",url:weiXinUrl+"/wechat/v1/config?url="+window.location.href,success:function(e){setShareInfo({title:s,summary:i,pic:m,url:r,WXconfig:{swapTitleInWX:!0,appId:e.data.appid,timestamp:e.data.timestamp,nonceStr:e.data.noncestr,signature:e.data.signature}}),wx.ready(function(){wx.hideMenuItems({menuList:["menuItem:share:qq","menuItem:share:weiboApp","menuItem:favorite","menuItem:share:facebook","/menuItem:share:QZone"],success:function(e){}})})},error:function(e){console.log(e+"错误")}})}},error:function(e){console.log(e)}})}}});