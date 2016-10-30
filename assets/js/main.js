
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
    window.location = '/home';
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

  // Category Manager Modal
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
      $('#del-category-form input[name=id]').val(cat_id);
      $('#delCategoryModal span.cat_name').html('<strong>'+cat_name+'</strong>');
      if(cat_status==1) {
        $('#edit-category-form .val1').attr('selected','selected')
      } else {
        $('#edit-category-form .val0').attr('selected','selected')
      }
    });

    $('#manage_category tbody tr a.edit_category').click(function(){
      $('#editCategoryModal').modal();
    });
    $('#manage_category tbody tr a.del_category').click(function(){
      $('#delCategoryModal').modal();
    })
  });

  $('#edit-category-form').submit(function(e) {
    $('#editCategoryModal').modal('hide');
    e.preventDefault();
    var data = $('#edit-category-form').serialize();
    socket.get('/admin/catid?' + data);
    location.reload();
  });

  $('#add-category-form').submit(function(a) {
    $('#addCategoryModal').modal('hide');
    a.preventDefault();
    var data = $('#add-category-form').serialize();
    socket.get('/admin/catadd?' + data);
    location.reload();
  });

  $('#del-category-form').submit(function() {
    $('#delCategoryModal').modal('hide');
    var id = $('#del-category-form input[name=id]').val();
    socket.get('/admin/catdel?id='+id);
    // $('#manage_category tr.tr-'+id).fadeOut('slow');
  });

  // POST Manager Modal
  $('#manage_post tbody tr').each(function() {

    $(this).click(function(){
      var post_name = $(this).find('td.post_name').text();
      var post_id = $(this).find('td.post_id').text();
      var post_description = $(this).find('td.post_description').text();
      var post_status = $(this).find('td.post_status').text();
      var post_source = $(this).find('td.post_source').text();
      var post_content = $(this).find('td.post_content').text();
      $('#edit-post-form input[name=name]').val(post_name);
      $('#edit-post-form input[name=id]').val(post_id);
      $('#edit-post-form input[name=description]').val(post_description);
      $('#edit-post-form textarea[name=content]').html(post_content);
      $('#edit-post-form input[name=source]').val(post_source);
      $('#del-post-form input[name=id]').val(post_id);
      $('#delPostModal span.post_name').html('<strong>'+post_name+'</strong>');
      if(post_status==1) {
        $('#edit-post-form .val1').attr('selected','selected')
      } else {
        $('#edit-post-form .val0').attr('selected','selected')
      }
    });

    $('#manage_post tbody tr a.edit_post').click(function(){
      $('#editPostModal').modal();
    });
    $('#manage_post tbody tr a.del_post').click(function(){
      $('#delPostModal').modal();
    })
  });

  $('#edit-post-form').submit(function(e) {
    e.preventDefault();
    var data = $('#edit-post-form').serialize();
    socket.get('/admin/postedit?' + data);
    location.reload();
  });

  $('#uploadForm').submit(function(u){
    $('#thumbnailModal').modal('hide');
    $('button#uploadDone').text('  Uploaded Successful');
    $('button#uploadDone').removeClass('btn-warning').addClass('btn-success')
  });
  socket.on('upload/thumbnail',function(data){
    $('#add-post-form input[name=thumbnail]').val(data.img);
  });

  $('#add-post-form').submit(function(a) {
    a.preventDefault();
    var data = $('#add-post-form').serialize();
    socket.get('/admin/postadd?' + data);
    location.reload();
  });

  $('#del-post-form').submit(function() {
    $('#delPostModal').modal('hide');
    var id = $('#del-post-form input[name=id]').val();
    socket.get('/admin/postdel?id='+id);
    // $('#manage_category tr.tr-'+id).fadeOut('slow');
  });

  var getLink = window.location.href.substr().split("/");
  if ( getLink[3]+'/'+getLink[4] =="admin/newpost") {
    CKEDITOR.replace('add-content');
  } else if ( getLink[3]+'/'+getLink[4] =="admin/postid") {
    CKEDITOR.replace('edit-content');
  }

  if ( getLink[3]+'/'+getLink[4] =="category/view") {

  }


// Script to add active class on menu
  $(".navbar-left li a").each(function() {
    var path = $(location).attr('pathname');
    var param = $(location).attr('search');
    var currentUrl = path+''+param;
    var href = $(this).attr('href').trim();
    // var currentURI = path.substring((path.lastIndexOf('/') + 1), path.length);
    // currentURI = currentURI.replace(/^\//, "");
    // href = href.replace(/^\//, "");
    if (currentUrl === href) {
      $(this).closest('li').addClass('active');
    } else {
      $(this).closest('li').removeClass();
    }
  });


  // page onload
  $(document).ready(function() {
    $(window).keydown(function(event){
      if(event.keyCode == 13) {
        event.preventDefault();
        return false;
      }
    });

  });

  $('#imdb').ready(function() {
    $('button[name=add-new]').addClass('disabled');
    $('label[name=imdb-title]').css('color','#a94442');
    $('input#imdb').css({'color':'#a94442'});
    $('#icon_search').show();
    $('#icon_done').hide();
    $('#icon_load').hide();
  });

  $('#imdb').keyup(function () {
    $('#icon_search').hide();
    $('#icon_done').hide();
    $('#icon_load').show();
    if ($('#imdb').val().length == 9) {
      $('button[name=add-new]').removeClass('disabled');
      var imdbTitle = $('#imdb').val();
      socket.get('/imdb/search?imdb=' + imdbTitle);
    }
  });

  $('#search-form').submit(function(a) {
    a.preventDefault();
    var keySearch = $('#search-key').serialize();
    console.log(keySearch);
    socket.get('/post/search?' + keySearch);
    window.location.href = '/post/search?'+keySearch
  });

  socket.on('search/imdb',function(recieve) {
    $('#icon_search').hide();
    $('#icon_done').show();
    $('#icon_load').hide();
    $('label[name=imdb-title]').css('color','#3f8040');
    $('input#imdb').css({'color':'#3f8040'});
    $('#description').val(recieve.data.title);
    $('#time').val(recieve.data.runtime);
    $('#year').val(recieve.data.year);
    $('#director').val(recieve.data.director);
    $('#cast').val(recieve.data.actors);
    $('#thumbInput').val(recieve.data.poster);
    $('#rate').val(recieve.data.rating);
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
    var img=document.getElementById("thumbnail");
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

$(document).ready(function() {
  $('#manage_post').DataTable();
  $('#manage_category').DataTable();
} );

function chooseImg(e) {
  var thumbLink = $(e).find('img').attr('src');
  $('#add-post-form input[name=thumbnail]').val(thumbLink);
  $('#galleryModal').modal('hide')
}

function goBack() {
  window.history.back();
}

$('#post-content .panel-body').each(function(){
  var $this = $(this);
  var t = $this.text();
  $this.html(t.replace('&lt','<').replace('&gt', '>').replace(/\\r\\n/g, '<br />').replace(new RegExp("\\\\", "g"), ""));
});

$('#name').keyup(function () {


    //Lấy text từ thẻ input title
    var movieName = $('input[name=name]').val();
    //Đổi chữ hoa thành chữ thường
    var slug = movieName.toLowerCase();
    //Đổi ký tự có dấu thành không dấu
    slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
    slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
    slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
    slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
    slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
    slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
    slug = slug.replace(/đ/gi, 'd');
    //Xóa các ký tự đặt biệt
    slug =
      slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi,
        '');
    //Đổi khoảng trắng thành ký tự gạch ngang
    slug = slug.replace(/ /gi, "-");
    //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
    //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
    slug = slug.replace(/\-\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-/gi, '-');
    slug = slug.replace(/\-\-/gi, '-');
    //Xóa các ký tự gạch ngang ở đầu và cuối
    slug = '@' + slug + '@';
    slug = slug.replace(/\@\-|\-\@|\@/gi, '');
    //In slug ra textbox có id “slug”
    $('input[name=slug]').val(slug);

})
