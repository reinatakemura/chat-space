$(function(){
  function buildHTML(message){
    var message_messages = `
    <div class="main-chat__contents-body-message">
    <p class="main-chat__contents-body-message--content">
    ${message.content}
    </p>
    </div>
    `
    var message_image = `
    <div class="main-chat__contents-body-message">
    <img class="main-chat__contents-body-message--image" src="${message.image}">
    </div>
    `
    if (message.content && message.image) {
      var html = `
      <div class="main-chat__contents-body" data-message-id=${message.id}>
        <div class="main-chat__contents-body-title">
        <div class="main-chat__contents-body-title-name">
        ${message.user_name}
        </div>
        <div class="main-chat__contents-body-title-time">
        ${message.created_at}
        </div>
        </div>
        ${message_messages}
      </div>
      ${message_image}
      `
    } else if (message.content) {
      var html = `
      <div class="main-chat__contents-body" data-message-id=${message.id}>
        <div class="main-chat__contents-body-title">
        <div class="main-chat__contents-body-title-name">
        ${message.user_name}
        </div>
        <div class="main-chat__contents-body-title-time">
        ${message.created_at}
        </div>
        </div>
        ${message_messages}
      </div>
      `
    } else if (message.image) {
      var html = `
      <div class="main-chat__contents-body" data-message-id=${message.id}>
        <div class="main-chat__contents-body-title">
        <div class="main-chat__contents-body-title-name">
        ${message.user_name}
        </div>
        <div class="main-chat__contents-body-title-time">
        ${message.created_at}
        </div>
        </div>
      </div>
      ${message_image}
      `
    }
    return html;
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
    })
    .fail(function(){
      alert('メッセージ送信に失敗しました');
    })
    .always(function(){
      $('.main-chat--form--btn').prop('disabled', false);
    })
  });

  var reloadMessages = function() {
    var last_message_id = $('.main-chat__contents-body:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.main-chat__contents').append(insertHTML);
        $('.main-chat__contents').animate({ scrollTop: $('.main-chat__contents')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});