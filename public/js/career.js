/**
 * Created by minghuizhang on 2018/1/29.
 */

// 判断姓名
function testName(obj) {
  if($(obj).val()){
    $(obj).siblings('span.correct').show()
    $(obj).siblings('span.error').hide()
    return true
  }else {
    $(obj).siblings('span.correct').hide()
    $(obj).siblings('span.error').show()
    return false
  }
}

// 判断工作地区
// function testWorkLocal(obj) {
//   var value = $(obj).children('.selectVal').text()
//   if(value){
//     $(obj).siblings('span.correct').show()
//     $(obj).siblings('span.error').hide()
//     return true
//   }else {
//     $(obj).siblings('span.correct').hide()
//     $(obj).siblings('span.error').show()
//     return false
//   }
// }