//下拉框
$(function(){
    var oChangeA = $('.listA');
    var oInput = $('.selectVal');
    oInput.focus(function () {
      $(this).siblings('.selectList').show().siblings('.xl-icon').addClass('sq-icon');
    })
    oInput.blur(function(e){
        var el = $(e.relatedTarget)
        $(this).val(el.text()).text(el.data('value'))
        $(this).siblings('.selectList').hide().siblings('.xl-icon').removeClass('sq-icon');
    });
});