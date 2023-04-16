var token = $.cookie('token');
if (null == token || token.length <= 0){
    location.href = "{/}./index.html";
}