var history = Josh.History({ key: 'JOSH.history' });
var readline = Josh.ReadLine({ history: history });
var shell = Josh.Shell({
  history: history,
  readline: readline,
  prompt: '<br>$'
});

shell.setCommandHandler('welcome', {
  description: 'Welcome message that you see at the beggining of your session',
  exec: function(cmd, args, callback) {
    var response = [
      'Hello, this is Vsevolod Stefkin.',
      'Thank you for visiting my site.',
      'Try <a class="command">ls</a> to find out what you can do here.',
      'Enjoy ( ͡° ͜ʖ ͡°)',
      '',
      'Tip: you can click commands if you don\'t like typing'
    ].join('<br>');
    callback(response);
  }
});

shell.setCommandHandler('who', {
  description: 'Short summary about me',
  exec: function(cmd, args, callback) {
    var response = [
      'Name: Vsevolod Stefkin',
      'Job: Software Engineer at "The Hamon", Minsk',
      'Education: undergraduate at BNTU FITR (4th year)'
    ].join('<br>');
    callback(response);
  }
});

shell.setCommandHandler('skills', {
    description: 'Info about my skills and experience',
    exec: function(cmd, args, callback) {
        var response = [
            'Programming Languages: Ruby, Clojure, Haskell, C/C++, Javascript',
            'Databases: MySql, T-SQL, Redis, Elasticsearch'
        ].join('<br>');
        callback(response);
    }
})

shell.setCommandHandler('contact', {
  description: 'Contact information',
  exec: function(cmd, args, callback) {
    var response = [
      'Email: <a href="mailto:stefkin.v@gmail.com">stefkin.v@gmail.com</a>',
      'GitHub: <a href="https://github.com/stefkin">stefkin</a>',
      'Gitlab: <a href="https://gitlab.com/bublik42">bublik42</a>'
    ].join('<br>');
    callback(response);
  }
});

shell.setCommandHandler('works', {
  description: 'Lists my humble contributions and public repos',
  exec: function(cmd, args, callback) {
    var lines = [],
        works = [
          {
            title: '<a href="https://gitlab.com/bublik42/dotfiles">dotfiles</a>',
            description: 'My settings for nixos, emacs, zsh and more.'
          },
          {
            title: '<a href="https://github.com/gogotanaka/Rubype">Rubype</a>',
            description: 'Ruby contarcts made simple.'
          }
        ];

    lines.push('<table>');
    works.forEach(function(work) {
      lines.push('<tr><td>' + work.title + '</td><td class="description">' + work.description + '</td></tr>');
    });
    lines.push('</table>');
    callback(lines.join(''));
  }
});

shell.setCommandHandler('hireme', {
  description: 'Hire me!',
  exec: function(cmd, args, callback) {
    var response = [
      'Thank you for being interested in me.',
      'Please don\'t hesitate to contact, any method is fine.',
      'Try: <a class="command">contact</a>'
    ].join('<br>');
    callback(response);
  }
});

var helpLineFor = function(cmd) {
    var description = shell.getCommandHandler(cmd).description;
    if (description){
        return '<td class="description">' + description + '</td>';
    } else {
        return '<td></td>';
    }
};

shell.setCommandHandler('ls', {
  description: 'Shows this message',
  exec: function(cmd, args, callback) {
    var helpLines = shell.commands().reduce(function(memo, cmd) {
      memo.push(helpLineFor(cmd));
    }, '');
    helpLines.unshift('<strong>Commands:</strong>');
    helpLines.unshift('<table class="help">');
    helpLines.push('</table>');
    callback(helpLines.join(''));
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
