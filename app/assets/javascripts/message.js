$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html = `<div class="main-chat__contents-body" data-message-id=${message.id}>
                    <div class="main-chat__contents-body-title">
                      <div class="main-chat__contents-body-title-name">
                        ${message.user_name}
                      </div>
                      <div class="main-chat__contents-body-title-time">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="main-chat__contents-body-message">
                      <p class="main-chat__contents-body-message--content">
                        ${message.content}
                      </p>
                    </div>
                  </div>
                  <div class="main-chat__contents-body-message">
                    <img class="main-chat__contents-body-message--image" src="${message.image}">
                 </div>`
      return html;
    } else {
      var html = `<div class="main-chat__contents-body" data-message-id=${message.id}>
                    <div class="main-chat__contents-body-title">
                      <div class="main-chat__contents-body-title-name">
                        ${message.user_name}
                      </div>
                      <div class="main-chat__contents-body-title-time">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="main-chat__contents-body-message">
                      <p class="main-chat__contents-body-message--content">
                        ${message.content}
                      </p>
                    </div>
                  </div>`
      return html;
    };
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main-chat__contents').append(html);
      $('.main-chat__contents').animate({scrollTop: $('.main-chat__contents')[0].scrollHeight});
      $('form')[0].reset();
      $('.main-chat--form--btn').prop('disabled', false);
    })
    .fail(function(){
      alert('メッセージ送信に失敗しました');
    });
  });
});