"use strict";
new Vue({
    el: "#app",
    data: {
        msg: {},
        info: "申请达人",
        is: !0,
        isColro: !1
    },
    created: function () {
        this.getId()
    },
    methods: {
        getId: function () {
            var o = this;
            $.ajax({
                type: "get",
                url: baseUrl + "/v1/member/info?time=123&sign=ABC&target_member_id=1000",
                beforeSend: function () {
                    $("#loading").show()
                },
                complete: function () {
                    $("#loading").hide()
                },
                success: function (e) {
                    console.log(e.data), "NONE" == e.data.master ? console.log(1) : (window.location.href = "becomeExpert.html", console.log(2)), o.msg = e.data
                },
                error: function (o) {
                    console.log(o), console.log("失败")
                }
            })
        },
        getExpert: function () {
            var o = this;
            $.ajax({
                type: "post",
                url: baseUrl + "/v2/member_master",
                success: function (e) {
                    o.info = "审核中", o.isColro = !0, console.log(e), 11003 == e.code ? (console.log(1), window.sessionStorage.setItem("status", 123), window.location.href = "becomeExpert.html") : console.log(e.msg)
                },
                error: function (o) {
                    console.log(o)
                }
            })
        },
        myFunction: function () {
            var o = $(".info_gl>p>a").attr("data-id");
            o += "", console.log(o), window.android.get(o)
        }
    }
});