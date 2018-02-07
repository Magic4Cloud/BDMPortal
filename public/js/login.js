$('.form_safe_num').click(function () {
    $.ajax({
        type: "POST",
        url: 'http://api.bdm.qa.cloud4magic.com/mobile/user/sms',
        data: {"mobile":$('.form_phone').val()},
        dataType: "json",
        headers : {"Bdm-Timestamp":(new Date()).valueOf()},
        success: function(data){
            console.log(data);
        }
    });
});
$('.login').click(function () {
    $.ajax({
        type: "POST",
        url: 'http://api.bdm.qa.cloud4magic.com/mobile/user/login',
        data: {"mobile":$('.form_phone').val(),'message':$('.form_safe').val()},
        dataType: "json",
        headers : {"Bdm-Timestamp":(new Date()).valueOf()},
        success: function(data){
            if(data.code == 400)
            {
                alert(data.msg);
            }
            console.log(data.data.token);
            //token存入cookie
            writeCookie('token',data.data.token,24);
            $('.logindiv').hide();
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