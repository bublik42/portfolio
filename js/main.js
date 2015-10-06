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
      'Hello, this is Vsevolod Stefkin.',
      'Thank you for visiting my site.',
      'Try <a class="command">help</a> to find out what you can do here.',
      'Enjoy :)',
      '',
      'Tip: you can click commands if you don\'t like typing',
      '',
      '<span class="hiring">Are you hiring? Please try: <a class="command">hire</a></span>'
    ].join('<br>');
    callback(response);
  }
});

shell.setCommandHandler('who', {
  description: 'tell you who I am',
  exec: function(cmd, args, callback) {
    response = [
      'Name: Vsevolod Stefkin',
      'Job: Software Engineer & DevOps at "The Hamon"'
    ].join('<br>');
    callback(response);
  }
});

shell.setCommandHandler('contact', {
  description: 'show contact information',
  exec: function(cmd, args, callback) {
    response = [
      'Email: <a href="mailto:stefkin.v@gmail.com">stefkin.v@gmail.com</a>',
      'GitHub: <a href="https://github.com/bublik42">bublik42</a>'
    ].join('<br>');
    callback(response);
  }
});

shell.setCommandHandler('works', {
  description: 'my humble contributions',
  exec: function(cmd, args, callback) {
    works = [
      {
        title: '<a href="https://gitlab.com/bublik42/dotfiles">dotfiles</a>',
        description: 'My settings for nixos, emacs, zsh and more'
      },
      {
        title: '<a href="https://github.com/gogotanaka/Rubype">Rubype</a>',
        description: 'Ruby contarcts made simple (and mostly useless tbh)'
      }
    ];

    var lines = [];
    lines.push('<table>');
    works.forEach(function(work) {
      lines.push('<tr><td>' + work.title + '</td><td class="description">' + work.description + '</td></tr>');
    });
    lines.push('</table>');
    callback(lines.join(''));
  }
});

shell.setCommandHandler('hire', {
  description: 'Hire me!',
  exec: function(cmd, args, callback) {
    var response = '';
    response = [
      'Thank you for being interested in me.',
      'Let me visit you because I want to know what you do, how you do, and why you do.',
      'Please don\'t hesitate to contact me, any method is OK.',
      'Try: <a class="command">contact</a>'
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

// for smartphones
$('#button-help').click(function() {
  executeCommand('help');
});
