$('.form_safe_num').click(function () {
    $.ajax({
        type: "POST",
        url: 'http://api.bdm.qa.cloud4magic.com/mobile/user/sms',
        data: {"mobile":$('.form_phone').val()},
        dataType: "json",
        headers : {"Bdm-Timestamp":(new Date()).valueOf()},
        success: function(data){
					if(data.code == 200){
						//发送成功
						alert('发送成功');
					}else {
						alert(data.msg);
					}
        },
			error: function (err) {
				alert(err)
			}
    });
});
$('.login').click(function () {
    var mobile = $('.form_phone').val();
    $.ajax({
        type: "POST",
        url: 'http://bdm.me/mobile/user/login',
        data: {"mobile":$('.form_phone').val(),'message':$('.form_safe').val()},
        dataType: "json",
        headers : {"Bdm-Timestamp":(new Date()).valueOf()},
        success: function(data){
        	if(data.code == 200){
						//token存入cookie
						writeCookie('token',data.data.token,24);
						writeCookie('nickname',mobile,24);
						$('.dialogLogin').hide();
						//隐藏登录按钮,显示用户昵称
                        $('.loginbtn').hide();
                        $('.nav_list').append('<li><a href="JavaScript:;">'+BDM+mobile.slice(7)+'</a></li>')
					}else {
						alert(data.msg);
					}
        },
				error: function (err) {
        	alert(err)
				}
    });
});

//Cookie设置值
function writeCookie (name, value, hours)
{
    var expire = "";
    if (hours != null)
    {
        expire = new Date ((new Date ()).getTime () + hours * 3600000);
        expire = "; expires=" + expire.toGMTString ();
    }
    document.cookie = name + "=" + escape (value) + expire;
}
//获取cookie
function getCookie(name)
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}
var token = getCookie('token');
if(token)
{
    var nickname = getCookie('nickname');
    //隐藏登录按钮,显示用户昵称
    $('.loginbtn').hide();
    $('.nav_list').append('<li>BDM'+nickname.slice(7)+'您好</li>')
}
