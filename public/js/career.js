/**
 * Created by minghuizhang on 2018/1/29.
 */
$(function(){
  var oInput = $('.selectVal');
  oInput.focus(function () {
    $(this).siblings('.selectList').show().siblings('.xl-icon').addClass('sq-icon');
  })
  oInput.blur(function(e){
    $(this).siblings('.selectList').hide().siblings('.xl-icon').removeClass('sq-icon');
    var el = $(e.relatedTarget)
    if(e.relatedTarget && (e.relatedTarget.className == 'listA')) {
      $(this).val(el.text()).text(el.data('value'))
    }
  });
});
var workData = [],eduData=[],myInformation='',checkstatus = true
// 判断姓名
function testName(obj) {
  var el = obj ? obj : event.target
  if($(el).val()){
    $(el).removeClass('redError').addClass('blueCorrect').siblings('span.correct').show().siblings('span.error').hide()
    return true
  }else {
    $(el).addClass('redError').removeClass('blueCorrect').siblings('span.correct').hide().siblings('span.error').show()
    return false
  }
}
$(window).on('load', function () {
  $('.selectpicker').selectpicker({
    'selectedText': 'cat'
  });
});
// 判断省市
function testWorkLocal(obj, e) {
  if(e) {
    if((event.relatedTarget && (event.relatedTarget.className == 'listA')) || $(obj).val()){
      $(obj).removeClass('redError').addClass('blueCorrect').parent('div').siblings('span.correct').show().siblings('span.error').hide()
      return true
    }else {
      $(obj).addClass('redError').removeClass('blueCorrect').parent('div').siblings('span.correct').hide().siblings('span.error').show()
      return false
    }
  } else {
    if($(obj).val()){
      $(obj).removeClass('redError').addClass('blueCorrect').parent('div').siblings('span.correct').show().siblings('span.error').hide()
      return true
    }else {
      $(obj).addClass('redError').removeClass('blueCorrect').parent('div').siblings('span.correct').hide().siblings('span.error').show()
      return false
    }
  }
}

// 添加工作经历
function addWorkExperience(obj) {
  $(obj).hide().siblings('div.addWork').show()
  $('#workCompany').val(''),
  $('#workPosition').val(''),
  $('#workStartDate').val(''),
  $('#workOverDate').val(''),
  $('#workInfor').val('')
}
// 判断是不是时间格式：xxxx-xx
function IsDate(num){
  var value = $(num).val()
  var regexp = /^([1][7-9][0-9][0-9]|[2][0][0-9][0-9])(\-)([0][1-9]|[1][0-2])$/g;
  return regexp.test(value)
}
//判断是否为空
function ValueNull(obj) {
  return ($(obj).val() ? true : false)
}
// 保存工作经历
function workComplete(obj) {
  if(ValueNull('#workCompany')&&ValueNull('#workPosition')&&IsDate('#workStartDate')&&IsDate('#workOverDate')&&ValueNull('#workInfor')){
    workData.push({
      'workCompany': $('#workCompany').val(),
      'workPosition': $('#workPosition').val(),
      'workStartDate': $('#workStartDate').val(),
      'workOverDate': $('#workOverDate').val(),
      'workInfor': $('#workInfor').val()
    })
    $('#workExperience').children('div.add_content').html(
      $('#workExperience').children('div.add_content').html()+
    '<div class="work_div">'+
    '<span class="work_company">'+$('#workCompany').val()+'</span>'+
    '<span class="work_date">'+$('#workStartDate').val().replace('-','.')+'-'+$('#workOverDate').val().replace('-','.')+'</span>'+
    '<div class="work_position">'+$('#workPosition').val()+'</div>'+
    '<p class="work_intro">'+$('#workInfor').val()+'</p>'+
    '</div>')
    $(obj).parent('div').parent('div.addWork').hide().siblings('span.add_span').show()
  }else{
    $('.dialogError').show().children('p').text('工作经历填写有误')
  }
}
// 取消工作经历
function cancleWork(obj) {
  $(obj).parent('div').parent('div.addWork').hide().siblings('span.add_span').show()
}



// 添加教育经历
function addEduExperience(obj) {
  $(obj).hide().siblings('div.addWork').show()
  $('#eduSchool').val(''),
  $('#eduSpeciality').val(''),
  $('#eduAcademic').val(''),
  $('#eduStartDate').val(''),
  $('#eduOverDate').val(''),
  $('#eduInfor').val('')
}
// 保存教育
function eduComplete(obj) {
  $('#eduExperience').children('span.error').hide()
  if(ValueNull('#eduSchool')&&ValueNull('#eduSpeciality')&&ValueNull('#eduAcademic')&&IsDate('#eduStartDate')&&IsDate('#eduOverDate')&&ValueNull('#eduInfor')){
    eduData.push({
      'eduSchool': $('#eduSchool').val(),
      'eduSpeciality': $('#eduSpeciality').val(),
      'eduAcademic': $('#eduAcademic').val(),
      'eduStartDate': $('#eduStartDate').val(),
      'eduOverDate': $('#eduOverDate').val(),
      'eduInfor': $('#eduInfor').val()
    })
    $('#eduExperience').children('div.add_content').html(
      $('#eduExperience').children('div.add_content').html()+
      '<div class="work_div">'+
      '<span class="work_company">'+$('#eduSchool').val()+'</span>'+
      '<span class="work_date">'+$('#eduAcademic').val().replace('-','.')+'-'+$('#eduStartDate').val().replace('-','.')+'</span>'+
      '<div class="work_position">'+$('#eduAcademic').val()+'   '+$('#eduSpeciality').val()+'</div>'+
      '<p class="work_intro">'+$('#eduInfor').val()+'</p>'+
      '</div>')
    $(obj).parent('div').parent('div.addWork').hide().siblings('span.add_span').show()
  }else{
    $('.dialogError').show().children('p').text('教育经历填写有误')
  }
}

//自我介绍
function myInfor(obj) {
  $(obj).siblings('span.limitStr').text($(obj).val().length+'/200')
}
// 添加自我介绍
function addMyInfor(obj) {
  $(obj).hide().siblings('div.addWork').show()
  $('#myInforInfor').val(myInformation)
}
// 判断自我介绍
function testMyInfor(obj) {
  if(ValueNull(obj)) {
    return true
  }else {
    $('.dialogError').show().children('p').text('自我介绍未填写')
    return false
  }
}
// 保存自我介绍
function savemyInfor(obj) {
  if(testMyInfor('#myInforInfor')){
    myInformation = $('#myInforInfor').val()
    $(obj).parent('div').parent('div.addWork').siblings('div.add_content').html('<p class="work_intro ml20 mt30">'+myInformation+'</p>')
    $(obj).parent('div').parent('div.addWork').hide()
    $(obj).parent('div').parent('div.addWork').siblings('span.add_span').show()
    $(obj).parent('div').parent('div.addWork').siblings('span.correct').hide()
  }
}

// 取消自我介绍
function canclemyInfor(obj) {
  $(obj).parent('div').parent('div.addWork').siblings('span.correct').hide().siblings('span.error').hide()
  $(obj).parent('div').parent('div.addWork').hide().siblings('span.add_span').show()
}


//勾选
function checkboxChange() {
  checkstatus = ($('#checkbox1:checked').length == 1) ? true : false
}
// 下一步
function nextStep() {
  var nullArray = []
  testName('#realName')
  testWorkLocal('#atProvince')
  testWorkLocal('#atCity')
  testMultiple('#id_select')
  testName('#atCompany')
  testName('#atPosition')
  //头像和资料未判断
  if(workData.length == 0){nullArray.push('工作经历')}
  if(eduData.length == 0){nullArray.push('教育经历')}
  if(myInformation == ''){nullArray.push('自我介绍')}
  if(nullArray.length != 0){
    $('.dialogError').show().children('p').text(nullArray.join('、')+'未填写')
  }else {
    if(testName('#realName')
      && testWorkLocal('#atProvince')
      && testWorkLocal('#atCity')
      && testMultiple('#id_select')
      && testName('#atCompany')
      && testName('#atPosition')
      && checkstatus
    ){
      //在此执行下一步操作
      $('#service_span').addClass('active')
      $('#material_div').hide().siblings('#add_service_div').show()
    }else {
      $('.dialogError').show().children('p').text('请将信息填写完整')
    }
  }
}






function closeError(obj) {
  $(obj).parent('div.dialogError').hide()
}


//


var seviceContent = {
  name : 1
},seviceContentArray = [],isQiuZhi = false
// 切换服务内容
function checkSeviceContent(obj, num) {
  seviceContent.name = num
  if($('.sevice_content>span').index($(obj)) == 1){
    isQiuZhi = true
    $(obj).parent('div.sevice_content').siblings('div.sevice_select_div').show().siblings('div.sevice_count').hide()
  }else {
    isQiuZhi = false
    $(obj).parent('div.sevice_content').siblings('div.sevice_select_div').hide().siblings('div.sevice_count').show()
  }
  $('.sevice_content>span').removeClass('active')
  $(obj).addClass('active').siblings('span').removeClass('active')
}
