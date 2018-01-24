/**
 * Created by minghuizhang on 2018/1/17.
 */

function openLogin() {
  $('.dialogLogin').show()
}
function closeLogin(obj) {
  if (event.target === obj) {
    $('.dialogLogin').hide()
  }
}
function openAvatar() {
  $('.dialogUpload').show()
}
function closeAvatar(obj) {
  if(obj){
    if (event.target === obj) {
      $('.dialogUpload').hide()
    }
  }else{
    $('.dialogUpload').hide()
  }
}
