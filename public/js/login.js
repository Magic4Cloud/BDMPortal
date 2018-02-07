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
            $('.logindiv').hide();
        }
    });
});