var history = Josh.History({ key: 'JOSH.history' });
var readline = Josh.ReadLine({ history: history });
var shell = Josh.Shell({
  history: history,
  readline: readline,
  prompt: '<br>$'
});

shell.setCommandHandler('welcome', {
  description: 'show welcome message',
  exec: function(cmd, args, callback) {
    response = [
      'Hello, this is Genki Sugimoto.',
      'Thank you for visiting my site.',
      'Try <a class="command">help</a> to find out what you can do here.',
      'Enjoy :)',
      '',
      'Tip: you can click commands if you don\'t like typing',
      '',
      'Are you hiring? Please try: <a class="command">hire jp</a> or <a class="command">hire us</a>'
    ].join('<br>');
    callback(response);
  }
});

shell.setCommandHandler('who', {
  description: 'tell you who I am',
  exec: function(cmd, args, callback) {
    response = [
      'Name: Genki Sugimoto',
      'Job: Graduate Student',
      'Motto: I code, therfore I am.',
    ].join('<br>');
    callback(response);
  }
});

shell.setCommandHandler('contact', {
  description: 'show contact information',
  exec: function(cmd, args, callback) {
    response = [
      'Email: <a href="mailto:genki.sugimoto.jp@gmail.com">genki.sugimoto.jp@gmail.com</a>',
      'GitHub: <a href="https://github.com/Genki-S">Genki-S</a>',
      'Twitter: <a href="https://twitter.com/GenkiSugimoto">GenkiSugimoto</a>, <a href="https://twitter.com/GenkiSugimotoJP">GenkiSugimotoJP</a>',
    ].join('<br>');
    callback(response);
  }
});

shell.setCommandHandler('hire', {
  description: 'Hire me!',
  exec: function(cmd, args, callback) {
    var arg = args[0];
    var response = '';
    if (arg === 'jp') {
      response = [
        'Thank you for being interested in me.',
        'Let me visit you because I want to know what you do, how you do, and why you do.',
        'Please don\'t hesitate to contact me, any method is OK.',
        'Try: <a class="command">contact</a>'
      ].join('<br>');
    } else if (arg === 'us') {
      response = [
        'Wow, really? I\'m interested in working in the U.S., thank you!',
        'If you could support me getting VISA, I will really appreciate it.',
        'Please don\'t hesitate to contact me, any method is OK.',
        'Try: <a class="command">contact</a>'
      ].join('<br>');
    } else {
      response = 'Please try: <a class="command">hire jp</a> or <a class="command">hire us</a>';
    }
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
