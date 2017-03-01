var app = {

  server: 'http://127.0.0.1:3000/classes/messages',

  init: function() {
    // fetch data on a certain setInterval
    app.fetch();
  },

  send: function(message) {
    $.ajax( {
      url: this.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        return data;
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },

  fetch: function() {
    $.ajax( {
      url: this.server + '?order=-createdAt',
      type: 'GET',
      data: JSON.stringify(),
      contentType: 'application/json',
      success: function (data) {
        app.clearMessages();
        for (var i = 0; i < data.results.length; i++) {
          app.renderMessage(data.results[i]);
        }
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },

  clearMessages: function() {
    $('#chats').html('');
  },

  renderMessage: function(message) {
    var cleanMsg = app.filter(message.text);
    var cleanUsername = app.filter(message.username);

    var messageTemplate = '<p class="username" data-username=' + cleanUsername + '>' + cleanUsername + ':' + '<span class=messages>' + cleanMsg + '</span></p>';

    $('#chats').prepend(messageTemplate);
  },

  renderRoom: function(room) {
    var temp = '<option class=loaded-rooms>' + room + '</option>';
    $('#roomSelect').append(temp);
  },

  handleUsernameClick: function() {
    $('.username').on('click', function() {
    });
  },

  handleSubmit: function (message) {
    app.send(message);
  },

  filter: function(input) {
    //input will be a string, need to parse through string
    //filter out symbols <,>,(,)

    var openParen = /\(/gi;
    var closeParen = /\)/gi;
    var openAngleBracket = /\</gi;
    var closedAngleBracket = /\>/gi;
    var openSquareBracket = /\[/gi;
    var closedSquareBracket = /\]/gi;

    if (input !== undefined) {

      input = input.replace(openParen, '&#10088');
      input = input.replace(closeParen, '&#10089');
      input = input.replace(openAngleBracket, '&lt');
      input = input.replace(closedAngleBracket, '&gt');
      input = input.replace(openSquareBracket, '&#10098');
      input = input.replace(closedSquareBracket, '&#10099');
      return input;
    }

  }


};
// YOUR CODE HERE:


$(document).ready(function() {
  // takes username input from prompt
  var userName = window.location.search.slice(10);
  //text area val(), roomname and username should be stored as a message
  var message = {
    username: userName,
    text: $('textarea').val(),
    roomname: $('.loaded-rooms').val()
  };


  $('#chats').scrollTop($(document).height());

  $('textarea').keypress(function(event) {

    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === '13') {
      app.handleSubmit(message);
      $('textarea').val('');
    }
  });

  $('button#enter').on('click', function() {

    console.log('works!');
    app.handleSubmit(message);
    $('textarea').val('');
  });


  setInterval(function() {
    app.init();
  }, 1000);

});


// https://myAppID:javascript-key=myJavaScriptKey@api.parse.com/1/classes/GameScore/Ed1nuqPvcm


