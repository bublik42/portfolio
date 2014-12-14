var history = Josh.History({ key: 'JOSH.history' });
var readline = Josh.ReadLine({ history: history });
var shell = Josh.Shell({
  history: history,
  readline: readline,
  prompt: '$'
});

shell.setCommandHandler('welcome', {
  description: 'show welcome message',
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

// override help command
shell.setCommandHandler('help', {
  exec: function(cmd, args, callback) {
    helpLines = [];
    shell.commands().forEach(function(cmd) {
      var helpLine = '<tr><td><a class="command">' + cmd + '</a></td>';
      var cmdHandler = shell.getCommandHandler(cmd);
      if (cmdHandler.description) {
        helpLine += '<td class="description">' + cmdHandler.description + '</td>';
      } else {
        helpLine += '<td></td>';
      }
      helpLines.push(helpLine + '</tr>');
    });
    helpLines.unshift('<strong>Commands:</strong>');
    helpLines.unshift('<table class="help">');
    helpLines.push('</table>');
    response = helpLines.join('');
    callback(response);
  }
});

shell.activate();

// make commands clickable
$('#shell-panel').delegate('a.command', 'click', function() {
  var cmd = $(this).text();
  executeCommand(cmd);
});

function executeCommand(cmd) {
  readline.setLine({ text: cmd, cursor: cmd.length });
  readline.acceptLine();
}

// welcome command
executeCommand('welcome');
