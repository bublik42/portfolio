var history = Josh.History({ key: 'JOSH.history' });
var readline = Josh.ReadLine({ history: history });
var shell = Josh.Shell({
  history: history,
  readline: readline,
  prompt: '$'
});

shell.setCommandHandler('hello', {
  exec: function(cmd, args, callback) {
    response = [
      'Hello, this is Genki Sugimoto.',
      'Thank you for your visit.',
      'Try <a class="command">help</a> to find out what you can do here.',
      'Enjoy :)',
      '',
      'Tip: you can click commands if you don\'t like typing'
    ].join('<br>');
    callback(response);
  }
});

shell.activate();

// make commands clickable
$('#shell-panel').delegate('a.command', 'click', function() {
  var cmd = $(this).text();
  readline.setLine({ text: cmd, cursor: cmd.length });
  readline.acceptLine();
});
