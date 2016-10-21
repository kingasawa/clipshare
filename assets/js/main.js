$(function() {
  var socket = io.sails.connect();
  socket.get('/socket');

  //USER MANAGEMENT
  // Khi submit script này sẽ chuyển data sang dạng socket và gửi đến server
  // UserController sẽ xử lý phần tiếp theo
  $('#login').submit(function (e) {
    console.log('gọi hàm submit');
    e.preventDefault();
    var data = $('#login').serialize();
    socket.get('/user/login?' + data);
  });
  // Khi client nhận thông báo login-success từ server sẽ chuyển user sang trang home
  socket.on('user/login-success', function() {
    window.location = '/trangchu';
  });

  $('#register').submit(function (r) {
    console.log('gọi hàm submit');
    r.preventDefault();
    var data = $('#register').serialize();
    socket.get('/user/register?' + data);
  });
  socket.on('user/registered', function() {
    $('#regModal p').text("Đăng ký thành công, hãy đăng nhập");
    $('#regModal').modal();
  });
  socket.on('user/exists', function() {
    $('#regModal p').text("Đã có người đăng ký tài khoản này");
    $('#regModal').modal();
  });

  // x-editable
  $.fn.editable.defaults.mode = 'inline';
  user_id = $(".user-info [static-userdata=id]").text();
  $('.user-info [userdata]').each(function(i,element){
    var keyToUpdate = $(element).attr('userdata');
    var title = ($(element).attr('title')) ? $(element).attr('title') : 'Vui lòng nhập để sửa thông tin';

    $(element).editable({
      type: 'text',
      url: '/user/' + user_id,
      pk: '',
      params: function(params) {
        var updateText = params['value'];
        delete params['pk'];
        delete params['name'];
        delete params['value'];

        params[keyToUpdate] = updateText;

        return params;
      }, title: title, ajaxOptions: {
        type: 'put'
      }
    });

  });

  // Xóa multi ID
  $("#removeid").click(function(event){
    event.preventDefault();
    var searchIDs = $("table input[type=checkbox]:checked").map(function() {
      return this.value;
    }).get().join();
    console.log("admin/userdel?id="+searchIDs);
    socket.get("/admin/userdel?id="+searchIDs)
  });
  //END USER MANAGEMENT

  // Item Manager Modal
  $('#manage_category tbody tr').each(function() {
    $(this).click(function(){
      var cat_name = $(this).find('td.cat_name').text();
      var cat_id = $(this).find('td.cat_id').text();
      var cat_description = $(this).find('td.cat_description').text();
      var cat_column = $(this).find('td.cat_column').text();
      var cat_status = $(this).find('td.cat_status').text();
      $('#edit-category-form input[name=name]').val(cat_name);
      $('#edit-category-form input[name=id]').val(cat_id);
      $('#edit-category-form input[name=description]').val(cat_description);
      $('#edit-category-form input[name=column]').val(cat_column);
      $('#edit-category-form input[name=status]').val(cat_status);
      $('#del-category-form input[name=id]').val(cat_id);
      $('#delCategoryModal span.cat_name').html('<strong>'+cat_name+'</strong>')
    });
    $('#manage_category tbody tr a.edit_category').click(function(){
      $('#editCategoryModal').modal();
    });
    $('#manage_category tbody tr a.del_category').click(function(){
      $('#delCategoryModal').modal();
    })
  });

});

// Image Upload with preview
function showMyImage(fileInput) {
  var files = fileInput.files;
  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    var imageType = /image.*/;
    if (!file.type.match(imageType)) {
      continue;
    }
    var img=document.getElementById("thumb");
    img.file = file;
    var reader = new FileReader();
    reader.onload = (function(aImg) {
      return function(e) {
        aImg.src = e.target.result;
      };
    })(img);
    reader.readAsDataURL(file);
  }
}
