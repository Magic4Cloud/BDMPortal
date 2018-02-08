/**
 * Created by minghuizhang on 2018/1/29.
 */
$(function(){
  $(document).on('focus','.selectVal',function (e) {
    $(this).siblings('.selectList').show().siblings('.xl-icon').addClass('sq-icon');
  })
  $(document).on('blur','.selectVal',function (e) {
    $(this).siblings('.selectList').hide().siblings('.xl-icon').removeClass('sq-icon');
    var el = $(e.relatedTarget)
    if(e.relatedTarget && ($(e.relatedTarget).hasClass('listA'))) {
      $(this).val(el.text()).text(el.data('value'))
        if($(e.relatedTarget).hasClass('list-province')){
            var code = el.data('value');
            var that = $(this)
                $.ajax({
                    type: "POST",
                    url: 'http://portal.me/bdm/city',
                    data: {"code":code},
                    dataType: "json",
                    headers : {"Bdm-Timestamp":(new Date()).valueOf()},
                    success: function(data){
                      var data = data.data
                      $('#atCity').next().children('.listA-all').html('')
                        for (var i = 0 ; i< data.length ; i++){
                            $('#atCity').next().children('.listA-all').html($('#atCity').next().children('.listA-all').html()+
                                '<a href="javascript:;" class="listA" data-value="'+data[i].code+'">'+data[i].name+'</a>'
                            )
                        }
                        $('#atCity').val('').text('').removeClass('redError').removeClass('blueCorrect').parent().siblings('span.correct').hide().siblings('span.error').hide()
                        that.parent().parent().next().show()
                    }
            });

        }
    }
  })
});
var serviceHtml = $("form>.add_service_form_div:first-child").prop("outerHTML")
var workData = [],eduData=[],myInformation='',checkstatus = true,checkstatus2 = true,file_keys = [
    "2018/02/02/15175635385a742e92aba95.png","2018/02/06/15179002105a7951b23b51a.jpeg"
]
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
      'EXCompany': $('#workCompany').val(),
      'EXCareer': $('#workPosition').val(),
      'StartTime': $('#workStartDate').val(),
      'EndTime': $('#workOverDate').val(),
        'TimeDuration': $('#workStartDate').val()+'~'+$('#workStartDate').val(),
      'DescriptionWork': $('#workInfor').val()
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
      'School': $('#eduSchool').val(),
      'Profession': $('#eduSpeciality').val(),
      'EducationDegree': $('#eduAcademic').val(),
      'StartTime': $('#eduStartDate').val(),
      'EndTime': $('#eduOverDate').val(),
      'TimeDuration': $('#eduStartDate').val()+'~'+$('#eduOverDate').val(),
      'DescriptionEducation': $('#eduInfor').val()
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
    //console.log($('#id_select').selectpicker('val'));

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



var seviceContentArray = [],isQiuZhi = false,contentArray = [
  '','推荐工作','求职咨询','简历优化','简历翻译'
]
// 切换服务内容
function checkSeviceContent(obj) {
  if($(obj).parent('.sevice_content').children('span').index($(obj)) == 1){
    isQiuZhi = true
    $(obj).parent('div.sevice_content').siblings('div.sevice_select_div').show().siblings('div.sevice_count').hide()
  }else {
    isQiuZhi = false
    $(obj).parent('div.sevice_content').siblings('div.sevice_select_div').hide().siblings('div.sevice_count').show()
  }
  $(obj).parent('.sevice_content').children('span').removeClass('active')
  $(obj).addClass('active').siblings('span').removeClass('active')
}

//保存服务信息
function saveService(obj) {
  var parentDiv = $(obj).parent('div').parent('lable').parent('div')
  //当前信息的index()
  var currentIndex = $('#add_service_div>form>div.add_service_form_div').index(parentDiv)
  // 当前服务内容类型
  var currenttype = parentDiv.find('div.sevice_content').children('span').index(parentDiv.find('span.active'))
  var errorArray = [],num = '次'
  if(currenttype == 1){
    if (parentDiv.find('input.selectVal').val() == ''){
      errorArray.push('时间')
    }
    num = parentDiv.find('input.selectVal').val()
  }
  if(parentDiv.find('input.service_price').val() == ''){
    errorArray.push('服务价格')
  }
  if(parentDiv.find('input.service_date').val() == ''){
    errorArray.push('完成时间')
  }
  if(errorArray.length == 0){
    //操作保存
    seviceContentArray[currentIndex] = seviceContentArray[currentIndex] ? seviceContentArray[currentIndex] : {}
    seviceContentArray[currentIndex].type_id = parentDiv.find('span.active').data('value')
    seviceContentArray[currentIndex].count = num
    seviceContentArray[currentIndex].service_price = parentDiv.find('input.service_price').val()
    seviceContentArray[currentIndex].service_time = parentDiv.find('input.service_date').val()
    parentDiv.find('div.sevice_onon').html(
    '<div class="sevice_on">'+
    '<span>'+contentArray[parentDiv.find('span.active').data('value')]+'/'+num+'</span>'+
    '<span>'+parentDiv.find('input.service_price').val()+'</span>'+
    '<span>'+parentDiv.find('input.service_date').val()+'</span>'+
    '</div>')
    parentDiv.find('lable.content_on_lable').css('display','block').next().hide().next().hide().next().hide()
    parentDiv.find('lable.content_on_lable').children('span.add_span').show()
  }else {
    $('.dialogError').show().children('p').text(errorArray.join('、')+'未填写完整')
  }
}
// 取消服务
function cancleService(obj){
  var parentDiv = $(obj).parent('div').parent('lable').parent('div')
  $(obj).parent().parent().hide().prev().hide().prev().hide().prev().css('display','block')
  parentDiv.find('lable.content_on_lable').children('span.add_span').show()
}
// 添加服务内容
function editServiceContent(obj) {
  $(obj).parent().hide().next().show().next().show().next().show()
}



//服务内容描述
function myContentVerb(obj) {
  $(obj).siblings('span.limitStr').text($(obj).val().length+'/1000')
}
// 添加服务内容描述
function addContentVerb(obj) {
  $(obj).hide().siblings('div.addWork').show().children('textarea').val($(obj).siblings('div.add_content').children('p').text())
}
// 判断服务内容描述
function testContentVerb(obj) {
  if(ValueNull(obj) && $(obj).val().length>20) {
    return true
  }else {
    $('.dialogError').show().children('p').text('服务内容描述长度必须为20-1000字')
    return false
  }
}
// 保存服务内容描述
function saveContentVerb(obj) {
  var parentDiv = $(obj).parent().parent().parent().parent()
  var currentIndex = $('#add_service_div>form>div.add_service_form_div').index(parentDiv)
  var content = parentDiv.find('.contentTextarea').val()
  if(testContentVerb($(obj).parent().siblings('textarea')[0])){
    seviceContentArray[currentIndex] = seviceContentArray[currentIndex] ? seviceContentArray[currentIndex] : {}
    seviceContentArray[currentIndex].content = content
    $(obj).parent('div').parent('div.addWork').siblings('div.add_content').html('<p class="work_intro ml20 mt30">'+content+'</p>')
    $(obj).parent('div').parent('div.addWork').hide().siblings('span.add_span').show()
  }
}
// 取消服务内容描述
function cancleContentVerb(obj) {
  $(obj).parent('div').parent('div.addWork').hide().siblings('span.add_span').show()
}

//在招职位描述
function myRecruitPos(obj) {
  $(obj).siblings('span.limitStr').text($(obj).val().length+'/300')
}
// 添加在招职位
function addRecruitPos(obj) {
  $(obj).hide().siblings('div.addWork').show().children('textarea').val($(obj).siblings('div.add_content').children('p').text())
}
// 判断在招职位
function testRecruitPos(obj) {
  if(ValueNull(obj) && $(obj).val().length>20) {
    return true
  }else {
    $('.dialogError').show().children('p').text('在招职位长度必须为20-300字')
    return false
  }
}
// 保存在招职位
function saveRecruitPos(obj) {
  var parentDiv = $(obj).parent().parent().parent().parent()
  var currentIndex = $('#add_service_div>form>div.add_service_form_div').index(parentDiv)
  var content = parentDiv.find('.positionTextarea').val()
  if(testRecruitPos($(obj).parent().siblings('textarea')[0])){
    seviceContentArray[currentIndex] = seviceContentArray[currentIndex] ? seviceContentArray[currentIndex] : {}
    seviceContentArray[currentIndex].position = content
    $(obj).parent('div').parent('div.addWork').siblings('div.add_content').html('<p class="work_intro ml20 mt30">'+content+'</p>')
    $(obj).parent('div').parent('div.addWork').hide().siblings('span.add_span').show()
  }
}
// 取消在招职位
function cancleRecruitPos(obj) {
  $(obj).parent('div').parent('div.addWork').hide().siblings('span.add_span').show()
}

//为什么选我
function myWhyMe(obj) {
  $(obj).siblings('span.limitStr').text($(obj).val().length+'/500')
}
// 添加为什么选我
function addWhyMe(obj) {
  $(obj).hide().siblings('div.addWork').show().children('textarea').val($(obj).siblings('div.add_content').children('p').text())
}
// 判断为什么选我
function testWhyMe(obj) {
  if(ValueNull(obj) && $(obj).val().length>20) {
    return true
  }else {
    $('.dialogError').show().children('p').text('在招职位长度必须为20-300字')
    return false
  }
}
// 保存为什么选我
function saveWhyMe(obj) {
  var parentDiv = $(obj).parent().parent().parent().parent()
  var currentIndex = $('#add_service_div>form>div.add_service_form_div').index(parentDiv)
  var content = parentDiv.find('.whyMeTextarea').val()
  if(testWhyMe($(obj).parent().siblings('textarea')[0])){
    seviceContentArray[currentIndex] = seviceContentArray[currentIndex] ? seviceContentArray[currentIndex] : {}
    seviceContentArray[currentIndex].advantage	 = content
    $(obj).parent('div').parent('div.addWork').siblings('div.add_content').html('<p class="work_intro ml20 mt30">'+content+'</p>')
    $(obj).parent('div').parent('div.addWork').hide().siblings('span.add_span').show()
  }
}
// 取消为什么选我
function cancleWhyMe(obj) {
  $(obj).parent('div').parent('div.addWork').hide().siblings('span.add_span').show()
}


//补充说明
function myAddRemark(obj) {
  $(obj).siblings('span.limitStr').text($(obj).val().length+'/500')
}
// 添加补充说明
function addAddRemark(obj) {
  $(obj).hide().siblings('div.addWork').show().children('textarea').val($(obj).siblings('div.add_content').children('p').text())
}
// 保存补充说明
function saveAddRemark(obj) {
  var parentDiv = $(obj).parent().parent().parent().parent()
  var currentIndex = $('#add_service_div>form>div.add_service_form_div').index(parentDiv)
  var content = parentDiv.find('.addRemarkTextarea').val()
  seviceContentArray[currentIndex] = seviceContentArray[currentIndex] ? seviceContentArray[currentIndex] : {}
  seviceContentArray[currentIndex].supplement	 = content
  $(obj).parent('div').parent('div.addWork').siblings('div.add_content').html('<p class="work_intro ml20 mt30">'+content+'</p>')
  $(obj).parent('div').parent('div.addWork').hide().siblings('span.add_span').show()
}
// 取消补充说明
function cancleAddRemark(obj) {
  $(obj).parent('div').parent('div.addWork').hide().siblings('span.add_span').show()
}



// 添加服务
function addServiceDiv(obj) {
  $(obj).before(serviceHtml)
}

//勾选
function checkboxChange2() {
  checkstatus2 = ($('#checkbox2:checked').length == 1) ? true : false
}
// 返回上一步
function prevStep() {
  $('#service_span').removeClass('active')
  $('#material_div').show().siblings('#add_service_div').hide()
}

//提交认证
function submitVerify() {
  var errorArray = []
  if(seviceContentArray.length != 0){
      console.log(seviceContentArray)
    seviceContentArray.map(function (item) {
      if(item.content&&item.position&&item.type_id&&item.advantage&&checkstatus2){
        //提交操作,职业认证资料
          $.ajax({
              type: "POST",
              url: 'http://bdm.me/mobile/user/addProfessionInfo',
              headers : {"Bdm-Timestamp":(new Date()).valueOf(),"Bdm-Token":getCookie('token')},
              data: {
                  "avatar" : '2018/02/06/15178903985a792b5ed185f.jpeg',
                  "code":  $('#atCity').text(),
                  "excel": JSON.stringify($('#id_select').selectpicker('val')),
                  "company" : $('#atCompany').val(),
                  "position" : $('#atPosition').val(),
                  "work" :     JSON.stringify(workData),
                  "education" : JSON.stringify(eduData),
                  "intro" : myInformation,
                  "file_keys" : JSON.stringify(file_keys)
              },
              dataType: "json",
              success: function(data){
                //成功后,添加服务内容
                  $.ajax({
                      type: "POST",
                      url: 'http://bdm.me/mobile/service/create',
                      headers : {"Bdm-Timestamp":(new Date()).valueOf(),"Bdm-Token":getCookie('token')},
                      data: {
                          "he_id" : data.data.he_id,
                          "services":  JSON.stringify(seviceContentArray)
                      },
                      dataType: "json",
                      success: function(response){
                        console.log(response)

                      }
                  });

              }
          });


      }else {
        $('.dialogError').show().children('p').text('信息未填写完整')
      }
    })
  }else {
    $('.dialogError').show().children('p').text('信息未填写或保存')
  }
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