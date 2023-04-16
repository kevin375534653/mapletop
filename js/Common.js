var _____WB$wombat$assign$function_____ = function(name) {
	return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name];
};
if (!self.__WB_pmw) {
	self.__WB_pmw = function(obj) {
		this.__WB_source = obj;
		return this;
	}
} {
	let window = _____WB$wombat$assign$function_____("window");
	let self = _____WB$wombat$assign$function_____("self");
	let document = _____WB$wombat$assign$function_____("document");
	let location = _____WB$wombat$assign$function_____("location");
	let top = _____WB$wombat$assign$function_____("top");
	let parent = _____WB$wombat$assign$function_____("parent");
	let frames = _____WB$wombat$assign$function_____("frames");
	let opener = _____WB$wombat$assign$function_____("opener");

	function login_point() {
		$(".login-point").css({
			left: $("header").offset().left,
			top: $(window).outerHeight()
		}).animate({
			top: $(window).outerHeight() - 281
		}, 500, "easeOutBack", function() {
			$(".login-point .inner").addClass("active");
			shuffle()
		})
	}

	function shuffle() {
		$(".login-point .total-point").each(function() {
			var n = $(this),
				t, i, r;
			n.wrapInner('<span class="shuffleWrap"><\/span>');
			t = n.find(".shuffleWrap");
			t.replaceWith(t.text().replace(/(\S)/g, '<span class="shuffleNum">$&<\/span>'));
			i = n.find(".shuffleNum");
			r = i.length;
			i.each(function(n) {
				function f() {
					i = setInterval(function() {
						var n = Math.floor(Math.random() * 9) + 1;
						t.text(n)
					}, 50)
				}
				var t = $(this),
					u = t.text(),
					i;
				f();
				n = -n + r;
				setTimeout(function() {
					clearInterval(i);
					t.text(u);
					n === r && setTimeout(function() {
						close()
					}, 2e3)
				}, 500 + n * 500)
			});
			n.css({
				visibility: "visible"
			})
		})
	}

	function close() {
		$(".login-point .inner").removeClass("active").addClass("passive");
		setTimeout(function() {
			$(".login-point").animate({
				top: $(window).outerHeight()
			}, 500, "easeInBack")
		}, 200)
	}

	function isMaintenaceLink(n, t, i) {
		if (i.toLowerCase() == "true") return alert("メンテナンス中のため、ご利用いただけません。"), !1;
		t == "" ? location.href = n : window.open(n, t)
	}
	$(function() {
		$("header nav > ul > li").on({
			mouseenter: function() {
				$(this).children("ul").stop().slideDown(300)
			},
			mouseleave: function() {
				$(this).children("ul").stop().slideUp(200)
			}
		})
	});
	window != parent && (parent.location.href = "/")
}

let layer;
let table;
let element;
let form;
let laydate;
$(function () {         //初始化layUI组件
    layui.use(['layer','table','element','form','laydate'],function () {
        layer=layui.layer;
        table=layui.table;
        element=layui.element;
        form=layui.form;
        laydate=layui.laydate;
    });
});

function parseTimeStampToString(timeStamp) {
    if(timeStamp!=null && timeStamp > 0){
        let date = new Date(timeStamp);
        let Y = date.getFullYear() + '-';
        let month=date.getMonth()+1;
        let M = (month < 10 ? '0'+(month) : month) + '-';
        let day=date.getDate();
        let D = (day < 10 ? '0'+day : day )+ ' ';
        let hour=date.getHours();
        let h = (hour < 10 ? '0'+hour :hour) + ':';
        let minute=date.getMinutes();
        let m = (minute < 10 ? '0'+minute :minute)+ ':';
        let second = date.getSeconds();
        let s=second < 10 ? '0'+second : second;
        return Y+M+D+h+m+s;
    }else{
        return "";
    }
}
function parseBooleanToString(bool) {
    if(bool!=null){
        if(bool==true){
            return "是";
        }else {
            return "否";
        }
    }else{
        return "";
    }
}

function isNull(value) {
    if(value==null){
        return "";
    }
    return value;
}

function responseBody(res){
    console.log(res);
    if(res.statusCode==0){
        return {
            "code": res.statusCode,
            "data": res.data.content,
            "count": res.data.totalElements
        };
    }
    return {"msg":res.message};
}

function checkPhone(phone){
    if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone))){
        return false;
    }
    return true;
}




